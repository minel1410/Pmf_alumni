from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List
from models import Message, ConnectionManager
from schemas import MessageCreate, MessageResponse
from database import get_db
import json

router = APIRouter()
manager = ConnectionManager()


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client {client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.get("/messages", response_model=List[MessageResponse])
async def get_messages(id1: int, id2: int, db: Session = Depends(get_db)):
    messages_query = (
        select(
            Message.tekst_poruke,
            Message.posiljalac_id,
            Message.primalac_id,
            Message.datum_slanja,
            Message.poruka_id,
        )
        .where(Message.posiljalac_id.in_([id1, id2]))
        .where(Message.primalac_id.in_([id1, id2]))
        .order_by(Message.datum_slanja)
    )
    messages_result = db.execute(messages_query).all()

    messages = [
        {
            "tekst_poruke": msg.tekst_poruke,
            "posiljalac_id": msg.posiljalac_id,
            "primalac_id": msg.primalac_id,
            "datum_slanja": msg.datum_slanja,
            "poruka_id": msg.poruka_id,
        }
        for msg in messages_result
    ]

    return messages


@router.post("/messages")
async def post_message(message: MessageCreate, db: Session = Depends(get_db)):
    new_message = Message(
        tekst_poruke=message.tekst_poruke,
        posiljalac_id=message.posiljalac_id,
        primalac_id=message.primalac_id,
        datum_slanja=datetime.utcnow(),
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    message_data = {
        "type": "new_message",
        "message": message.tekst_poruke,
        "sender_id": message.posiljalac_id,
        "receiver_id": message.primalac_id,
        "sent_at": new_message.datum_slanja.isoformat(),  # Add the sent at timestamp in ISO format
    }

    # Emit WebSocket message with the message data
    await manager.broadcast(json.dumps(message_data))
