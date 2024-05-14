from fastapi import FastAPI, Depends, HTTPException
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import SessionLocal, engine
from models import User, CourseUser, Course, Department
from fastapi import Depends, FastAPI, HTTPException, Request
from schemas import (
    UserSchema,
    CourseUserSchema,
    CourseSchema,
    StudySchema,
    DepartmentSchema,
    RegisterSchema,
)


def start_application():
    app = FastAPI()

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


app = start_application()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/user/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Not found")

    return user


@app.get("/studies")
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


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.post("/register")
async def register_user(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    print(request_data)

    # Provjera postojanja korisnika s istim emailom
    existing_user = db.query(User).filter(User.email == request_data["email"]).first()
    if existing_user:
        # Ako korisnik već postoji, vratite odgovarajuću grešku
        raise HTTPException(
            status_code=409, detail="Korisnik s ovom email adresom već postoji"
        )

    # Hesiranje lozinke
    hashed_password = pwd_context.hash(request_data["password"])

    # Ako korisnik ne postoji, dodajte novog korisnika u bazu podataka
    new_user = User(
        ime=request_data["name"],
        prezime=request_data["lastname"],
        email=request_data["email"],
        password=hashed_password,  # Koristite heširanu lozinku
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Nakon commit-a, možete pristupiti ID-u novog korisnika
    new_user_id = new_user.id
    new_course_user = CourseUser(
        korisnik_id=new_user_id,
        smjer_id=request_data["course_id"],
        odsjek_id=request_data["department_id"],
        studij_id=request_data["study_id"],
    )

    db.add(new_course_user)
    db.commit()

    # Vratite odgovor koji želite vratiti klijentu nakon uspješne registracije
    return {"message": "Korisnik je uspješno registrovan", "user_id": new_user_id}
