from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from utils import authentication, emailUtil
from database import get_db
from datetime import datetime, timedelta
from models import User, CourseUser, Course, Department, Token, Tag, TagUser

router = APIRouter()


@router.get("/studies")
async def get_studies(db: Session = Depends(get_db)):
    query = (
        db.query(Course, Department)
        .join(Department, Course.odsjek_id == Department.odsjek_id)
        .order_by(Course.smjer_id)
    )
    smjerovi_niz = []
    for smjer, odsjek in query:
        smjerovi_niz.append(
            {
                "smjer_id": smjer.smjer_id,
                "naziv_smjera": smjer.naziv,
                "odsjek_id": odsjek.odsjek_id,
                "naziv_odsjeka": odsjek.naziv,
            }
        )
    return smjerovi_niz


@router.post("/register")
async def register_user(
    request: Request, response: Response, db: Session = Depends(get_db)
):
    request_data = await request.json()

    existing_user = db.query(User).filter(User.email == request_data["email"]).first()
    if existing_user:
        raise HTTPException(
            status_code=409, detail="Korisnik s ovom email adresom već postoji"
        )

    hashed_password = authentication.hash_password(request_data["password"])

    new_user = User(
        ime=request_data["name"],
        prezime=request_data["lastname"],
        email=request_data["email"],
        password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_course_user = CourseUser(
        korisnik_id=new_user.id,
        smjer_id=request_data["course_id"],
        odsjek_id=request_data["department_id"],
        studij_id=request_data["study_id"],
    )

    db.add(new_course_user)
    db.commit()

    token_expires = timedelta(days=30)  # Ovo ostaje za generiranje tokena
    token = authentication.create_access_token(
        {"user_id": new_user.id},
        expires_delta=token_expires,
    )

    cookie_params = {
        "key": "access_token",
        "value": token,
        "httponly": True,
        "samesite": "Strict",
    }

    response.set_cookie(**cookie_params)

    return {
        "message": "Registration successful",
        "cookie": cookie_params,
    }


@router.post("/password-recovery")
async def recover_password(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    email = request_data.get("email")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=404, detail="Korisnik sa datim emailom nije pronađen."
        )

    token = emailUtil.serializer.dumps(email, salt=emailUtil.SECURITY_PASSWORD_SALT)
    emailUtil.reset_tokens[token] = email
    emailUtil.send_reset_email(email, token)


@router.get("/password-reset")
async def reset_password_form(token: str):
    try:
        email = emailUtil.serializer.loads(
            token, salt=emailUtil.SECURITY_PASSWORD_SALT, max_age=3600
        )
        if (
            token not in emailUtil.reset_tokens
            or emailUtil.reset_tokens[token] != email
        ):
            raise HTTPException(status_code=400, detail="Nevažeći token")
    except Exception:
        raise HTTPException(status_code=400, detail="Nevažeći ili istekao token")

    return email


@router.post("/password-reset")
async def reset_password_post(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    email = request_data.get("email")
    new_password = request_data.get("new_password")

    if not email or not new_password:
        raise HTTPException(
            status_code=400, detail="Email or new_password not provided"
        )

    user = db.query(User).filter(User.email == email).first()

    if user:
        user.password = authentication.hash_password(new_password)
        db.commit()
        return {"message": "Password updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.post("/login")
async def login_user(
    request: Request, response: Response, db: Session = Depends(get_db)
):
    request_data = await request.json()
    email = request_data["email"]
    password = request_data["password"]
    remember = request_data["rememberMe"]

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=404, detail="Korisnik sa datim emailom nije pronađen."
        )
    if authentication.verify_password(password, user.password):
        token_expires = timedelta(days=30)
        max_age = token_expires.total_seconds()

        token = authentication.create_access_token(
            {"user_id": user.id},
            expires_delta=token_expires,
        )

        expire_date = datetime.utcnow() + token_expires

        cookie_params = {
            "key": "access_token",
            "value": token,
            "httponly": True,
            "samesite": "Strict",
            "expires": (
                expire_date.strftime("%a, %d-%b-%Y %H:%M:%S GMT") if remember else None
            ),
        }
        print(cookie_params)

        response.set_cookie(**cookie_params)
        return {"message": "Login successful", "cookie": cookie_params}

    else:
        raise HTTPException(status_code=401, detail="Netačan password")


@router.get("/get_cookies/")
async def get_cookies(request: Request, db: Session = Depends(get_db)):
    cookie = request.cookies.get("access_token")
    print(cookie)
    if not cookie:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token provided"
        )
    user_id = await authentication.get_current_user(token=cookie)
    user = db.query(User).filter(User.id == user_id).first()
    print(user)
    return user


@router.get("/tags")
async def get_tags(db: Session = Depends(get_db)):
    tags = db.query(Tag).all()
    return tags


@router.post("/interests-post")
async def post_tags(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    user = request_data["user"]
    interests = request_data["interests"]
    for interest in interests:
        new_tag = TagUser(korisnik_id=user["id"], tag_id=interest)
        db.add(new_tag)
    db.commit()
    return {"success": True}
