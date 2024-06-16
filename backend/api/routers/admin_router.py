from fastapi import (
    APIRouter,
    Depends,
    WebSocket,
    WebSocketDisconnect,
    HTTPException,
    status,
)
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


@router.put("/verify/{user_id}")
async def verify_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )

    user.is_verified = True
    db.commit()
    db.refresh(user)
    return {"message": f"User with id {user_id} successfully verified"}


@router.put("/assign-admin/{user_id}")
async def assign_admin(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )

    user.is_admin = True
    db.commit()
    db.refresh(user)
    return {"message": f"User with id {user_id} successfully assigned admin status"}
