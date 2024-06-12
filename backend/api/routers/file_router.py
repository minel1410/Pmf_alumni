from fastapi import (
    APIRouter,
    Depends,
    WebSocket,
    WebSocketDisconnect,
    UploadFile,
    File,
    HTTPException,
)
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List
from models import Message, ConnectionManager, User
from schemas import MessageCreate, MessageResponse
import os
import shutil
import uuid
from fastapi.responses import FileResponse
from typing import Optional

from database import get_db

router = APIRouter()


@router.get("/images/diploma/{image_name}")
async def get_image(image_name: str):

    image_path = os.path.join("..", "images", "diploma", image_name)
    return FileResponse(image_path)


@router.get("/images/profile/{image_name}")
async def get_image(image_name: str):

    image_path = os.path.join("..", "images", "profile", image_name)
    return FileResponse(image_path)


@router.post("/upload-avatar/{user_id}")
async def upload_avatar(
    user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)
):
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join("..", "images", "profile", unique_filename)

    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.profilna_slika = unique_filename
        db.commit()
    finally:
        db.close()

    return {"filename": unique_filename, "url": f"/images/profile/{unique_filename}"}


@router.get("/images/profile/{filename}")
async def get_uploaded_file(filename: Optional[str] = None):
    if filename:
        file_location = os.path.join("..", "images", "profile", filename)
    else:
        file_location = os.path.join("..", "images", "profile", "no-avatar.svg")
    return FileResponse(file_location)


@router.get("/images/profile/id/{user_id}")
async def get_uploaded_file(user_id: str, db: Session = Depends(get_db)):

    user = db.query(User).filter_by(id=user_id).first()
    filename = user.profilna_slika
    if filename:
        file_location = os.path.join("..", "images", "profile", filename)
    else:
        file_location = os.path.join("..", "images", "profile", "no-avatar.svg")
    return FileResponse(file_location)
