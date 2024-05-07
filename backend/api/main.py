from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel


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


class User(BaseModel):
    email: str
    password: str


@app.post("/login")
def login(user: User):
    # Pristupite podacima poslanim u tijelu zahtjeva
    username = user.email
    password = user.password
    # Ovdje dodajte logiku za prijavu korisnika
    # Na primjer, provjerite korisničko ime i lozinku u bazi podataka
    # Ako je prijava uspješna, vratite odgovarajući odgovor
    # Ako prijava nije uspješna, podignite izuzetak HTTPException
    # sa statusom koda 401 (Unauthorized) ili drugim odgovarajućim statusom koda

    # Ako je prijava uspješna, možete vratiti neki odgovor
    return {"message": "Login successful for " + username}
