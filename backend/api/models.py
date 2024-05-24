from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Date
from database import Base
from typing import Annotated, Union
from pydantic import BaseModel


class User(Base):
    __tablename__ = "korisnik"

    id = Column(
        Integer, primary_key=True, autoincrement=True, nullable=False
    )  # id ne može biti None
    ime = Column(String, nullable=True)  # ime može biti None
    prezime = Column(String, nullable=True)  # prezime može biti None
    email = Column(String, nullable=False)  # email mora biti naveden
    password = Column(String, nullable=False)  # password mora biti naveden
    is_admin = Column(Boolean, nullable=True)  # is_admin može biti None
    profilna_slika = Column(String, nullable=True)  # profilna_slika može biti None
    diploma_slika = Column(String, nullable=True)  # diploma_slika može biti None
    verifikovan = Column(Boolean, nullable=True, default=False)
    broj_indeksa = Column(String, nullable=True)  # broj_indeksa može biti None
    zanimanje = Column(String, nullable=True)  # zanimanje može biti None
    godina_diplomiranja = Column(
        Integer, nullable=True
    )  # godina_diplomiranja može biti None
    trenutni_poslodavac = Column(
        String, nullable=True
    )  # trenutni_poslodavac može biti None
    linkedin_profil = Column(String, nullable=True)  # linkedin_profil može biti None
    broj_telefona = Column(String, nullable=True)  # broj_telefona može biti None
    datum_registracije = Column(
        Date, nullable=True
    )  # datum_registracije može biti None
    zadnji_login = Column(Date, nullable=True)  # zadnji_login može biti None
    cv = Column(String, nullable=True)  # cv može biti None
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


class Tag(Base):
    __tablename__ = "tag"

    tag_id = Column(Integer, primary_key=True, autoincrement=True)
    naziv = Column(Text)


class TagUser(Base):
    __tablename__ = "tag_korisnik"
    id = Column(Integer, primary_key=True, autoincrement=True)
    korisnik_id = Column(Integer, ForeignKey("korisnik.id"), nullable=False)
    tag_id = Column(Integer, ForeignKey("tag.tag_id"), nullable=False)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None
