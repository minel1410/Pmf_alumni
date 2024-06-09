from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List
from models import Message, ConnectionManager
from schemas import MessageCreate, MessageResponse
import os
from fastapi.responses import FileResponse

from database import get_db

router = APIRouter()


@router.get("/images/{image_name}")
async def get_image(image_name: str):

    image_path = os.path.join("..", "images", image_name)
    return FileResponse(image_path)
