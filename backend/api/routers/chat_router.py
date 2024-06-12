from fastapi import (
    APIRouter,
    Depends,
    WebSocket,
    WebSocketDisconnect,
    HTTPException,
    Query,
)
from sqlalchemy.orm import Session
from sqlalchemy import select, text
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


from typing import List, Dict


@router.get("/latest_chat", response_model=List[Dict])
async def get_latest_chats(user_id: int = Query(...), db: Session = Depends(get_db)):
    query = text(
        """
    SELECT 
        p1.tekst_poruke,
        p1.datum_slanja,
        p1.posiljalac_id,
        p1.primalac_id,
        k.ime as primalac_ime,
        k.prezime as primalac_prezime,
        k.profilna_slika as primalac_slika
    FROM poruke p1
    LEFT JOIN poruke p2 ON (p1.primalac_id = p2.primalac_id AND p1.datum_slanja < p2.datum_slanja)
    JOIN korisnik k ON k.id = p1.primalac_id 
    WHERE p2.primalac_id IS NULL AND (p1.primalac_id = :user_id OR p1.posiljalac_id = :user_id);
    """
    )

    results = db.execute(query, {"user_id": user_id}).mappings().all()

    if not results:
        raise HTTPException(status_code=404, detail="No messages found")

    return [
        {
            "tekst_poruke": row["tekst_poruke"],
            "datum_slanja": row["datum_slanja"],
            "posiljalac_id": row["posiljalac_id"],
            "primalac_id": row["primalac_id"],
            "primalac_ime": row["primalac_ime"],
            "primalac_prezime": row["primalac_prezime"],
            "primalac_slika": row["primalac_slika"],
        }
        for row in results
    ]
