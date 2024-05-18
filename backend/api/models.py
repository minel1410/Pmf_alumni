from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from database import Base
from typing import Annotated, Union
from pydantic import BaseModel


class User(Base):
    __tablename__ = "korisnik"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=True)
    ime = Column(String)  # ime može biti None
    prezime = Column(String)  # prezime može biti None
    email = Column(String)  # email mora biti naveden
    password = Column(String)  # password mora biti naveden
    is_admin = Column(Boolean, nullable=True)  # is_admin može biti None
    profilna_slika = Column(String, nullable=True)  # profilna_slika može biti None
    diploma_slika = Column(String, nullable=True)  # diploma_slika može biti None
    verifikovan = Column(Boolean, nullable=True, default=False)
    response_model = None


class CourseUser(Base):
    __tablename__ = "smjer_korisnik"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=True)
    korisnik_id = Column(Integer, ForeignKey("korisnik.id"))
    smjer_id = Column(Integer, ForeignKey("smjer.smjer_id"))
    odsjek_id = Column(Integer, ForeignKey("odsjek.odsjek_id"))
    studij_id = Column(Integer, ForeignKey("studij.studij_id"), nullable=True)


class Course(Base):
    __tablename__ = "smjer"

    smjer_id = Column(Integer, primary_key=True, autoincrement=True)
    naziv = Column(Text)
    odsjek_id = Column(Integer, ForeignKey("odsjek.id"))


class Department(Base):
    __tablename__ = "odsjek"

    odsjek_id = Column(Integer, primary_key=True, autoincrement=True)
    naziv = Column(Text)


class Study(Base):
    __tablename__ = "studij"

    studij_id = Column(Integer, primary_key=True, autoincrement=True)
    naziv = Column(Text)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None
