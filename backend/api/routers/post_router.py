from urllib import request
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    status,
    File,
    UploadFile,
    Form,
)
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlalchemy.orm import Session
from sqlalchemy import desc,func
from datetime import timedelta
from schemas import PostDislikeSchema, PostLikeSchema, PostSchema
from utils import authentication, emailUtil
from database import get_db
from datetime import datetime, timedelta
from models import Event, EventTag, Post, PostDislike,PostLike, User, CourseUser, Course, Department, Token, Tag, TagUser
import uuid
import os
import json

router = APIRouter()


#svi postovi sa lajkovima i dislajkovima
@router.get("/all-posts")
async def get_posts(db: Session=Depends(get_db)):
    today=datetime.now()
    seven_days_ago=today-timedelta(days=7)
    posts=db.query(Post).filter(Post.datum_objave>=seven_days_ago).all()
    if not posts:
        raise HTTPException(status_code=404, detail=f"Ne postoje postovi")
    post_list=[]
    for post in posts:
        likes=db.query(func.count(PostLike.id)).filter(PostLike.post_id==post.post_id).scalar()
        dislikes=db.query(func.count(PostDislike.id)).filter(PostDislike.post_id==post.post_id).scalar()
        user=db.query(User).filter(post.korisnik_id==User.id).first()
        post_data={
            "post_id":post.post_id,
            "naslov":post.naslov,
            "sadrzaj":post.sadrzaj,
            "datum_objave":post.datum_objave,
            "korisnik_id":post.korisnik_id,
            "korisnik_ime":user.ime,
            "naziv_slike":post.naziv_slike,
            "lajkovi":likes,
            "dislajkovi":dislikes
        }
        post_list.append(post_data)

    return {"status": 200, "data":post_list}

#postovi od datog usera sa lajkovima i dislajkovima
@router.get("/{user_id}/my-posts")
async def get_user_posts(user_id:int, db:Session=Depends(get_db)):
    posts=db.query(Post).filter(Post.korisnik_id==user_id).all()
    if not posts:
        raise HTTPException(status_code=404, detail=f"Ne postoje objave za datog usera {user_id}")
    post_list=[]
    for post in posts:
        likes=db.query(func.count(PostLike.id)).filter(PostLike.post_id==post.post_id).scalar()
        dislikes=db.query(func.count(PostDislike.id)).filter(PostDislike.post_id==post.post_id).scalar()
        user=db.query(User).filter(post.korisnik_id==User.id).first()
        post_data={
            "post_id":post.post_id,
            "naslov":post.naslov,
            "sadrzaj":post.sadrzaj,
            "datum_objave":post.datum_objave,
            "korisnik_ime":user.ime,
            "korisnik_prezime":user.prezime,
            "korisnik_id":post.korisnik_id,
            "naziv_slike":post.naziv_slike,
            "lajkovi":likes,
            "dislajkovi":dislikes
        }
        post_list.append(post_data)

    return {"status": 200, "data":post_list}


#Brisanje posta, lajkova i dislajkova
@router.delete("/delete/{post_id}")
async def delete_post(post_id:int, db:Session=Depends(get_db)):
    post=db.query(Post).filter(Post.post_id==post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail=f"Post sa ID-ijem {post_id} nije pronadjen")
    
    likes=db.query(PostLike).filter(PostLike.post_id==post_id).all()
    dislikes=db.query(PostDislike).filter(PostDislike.post_id==post_id).all()

    if likes:
        for like in likes:
            db.delete(like)
    if dislikes:
        for dislike in dislikes:
            db.delete(dislike)

    db.commit()
    db.delete(post)
    db.commit()
    return {"message": f"Post sa ID-ijem {post_id} je uspješno obrisan", "status": 200}


#Kreiranje posta
@router.post("/create")
async def create_post(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    last_post = db.query(Post).order_by(desc(Post.post_id)).first()
    last_post_id = last_post.post_id if last_post else 0
    new_post_id = last_post_id + 1
 
    new_post=Post(
        post_id=new_post_id,
        naslov=request_data['title'],
        sadrzaj=request_data['content'],
        datum_objave=request_data['post_date'],
        korisnik_id=request_data['user_id'],
    )
 
    db.add(new_post)
    db.commit()
 
    return {"message": "Uspješno ste dodali novi post!", "post_id": new_post_id, "status": 200}


#Uredjivanje posta
@router.put("/edit-post")
async def edit_post(post_request:PostSchema, db:Session=Depends(get_db)):
    post=db.query(Post).filter(post_request.post_id==Post.post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post nije pronadjen")
    post.naslov=post_request.title
    post.sadrzaj=post_request.content
    post.naziv_slike = post_request.post_image

    db.commit()
    return {"message": "Uspješno ste azurirali post", "status": 200}


#Kada korisnik lajka post 
@router.put("/like-post")
async def like_post(like_request:PostLikeSchema, db:Session=Depends(get_db)):
    last_like=db.query(PostLike).order_by(desc(PostLike.id)).first()
    last_like_id=last_like.id if last_like else 0
    new_like_id=last_like_id+1
    new_like = PostLike(id=new_like_id, post_id=like_request.post_id, korisnik_id=like_request.user_id)
    db.add(new_like)
    db.commit()
    
    return {"message": "Uspjesno dodan lajk"}

#Kada korisnik dislajka post
@router.put("/dislike-post")
async def dislike_post(dislike_request:PostDislikeSchema, db:Session=Depends(get_db)):
    last_dislike=db.query(PostDislike).order_by(desc(PostDislike.id)).first()
    last_dislike_id=last_dislike.id if last_dislike else 0
    new_dislike_id=last_dislike_id+1
    new_dislike=PostDislike(id=new_dislike_id, post_id=dislike_request.post_id, korisnik_id=dislike_request.user_id) 
    db.add(new_dislike)
    db.commit()   

    return {"message": "Uspjesno dodan dislajk"}






       

