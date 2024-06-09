from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List
from models import Message, ConnectionManager, User
from schemas import MessageCreate, MessageResponse
from database import get_db

router = APIRouter()


@router.get("/all_users")
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.id).all()
    return users