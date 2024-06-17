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
    mjesto_stanovanja = Column(String, nullable=True)
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


class EventType(Base):
    __tablename__="tip_dogadjaja"

    tip_dogadjaja_id=Column(Integer,primary_key=True,autoincrement=True,nullable=False)
    naziv_tipa_dogadjaja=Column(String,nullable=False)

class Event(Base):
    __tablename__="dogadjaj"

    dogadjaj_id=Column(Integer, primary_key=True, autoincrement=True,nullable=False)
    naziv_dogadjaja=Column(String,nullable=False)
    opis_dogadjaja=Column(Text,nullable=True)
    ulica=Column(String,nullable=True)
    grad=Column(String,nullable=True)
    tip_dogadjaja_id=Column(Integer,ForeignKey("tip_dogadjaja.tip_dogadjaja_id"), nullable=False)
    korisnik_id=Column(Integer,ForeignKey("korisnik.id"),nullable=False)
    datum_dogadjaja=Column(Date, nullable=False)
    dogadjaj_slika=Column(String,nullable=True)

class EventTag(Base):
    __tablename__="tag_dogadjaj"

    tag_dogadjaja_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    tag_id = Column(Integer, ForeignKey("tag.tag_id"), nullable=False) 
    dogadjaj_id = Column(Integer, ForeignKey("dogadjaj.dogadjaj_id"),nullable=False)

class Post(Base):
    __tablename__="post"

    post_id=Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    naslov=Column(String, nullable=True)
    sadrzaj=Column(Text,nullable=False)
    datum_objave=Column(Date, nullable=False)
    korisnik_id=Column(Integer,ForeignKey("korisnik.id"),nullable=False)
    naziv_slike=Column(String,nullable=True)

class PostDislike(Base):
    __tablename__="dislajk_post"

    id=Column(Integer,primary_key=True,autoincrement=True,nullable=False)
    korisnik_id=Column(Integer,ForeignKey("korisnik.id"),nullable=False)
    post_id=Column(Integer,ForeignKey("post.post_id"),nullable=False)

class PostLike(Base):
    __tablename__="lajk_post"
    
    id=Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    korisnik_id=Column(Integer,ForeignKey("korisnik.id"),nullable=False)
    post_id=Column(Integer,ForeignKey("post.post_id"),nullable=False)

class PostCommentUser(Base):
    __tablename__="komentar_korisnik_post"

    id=Column(Integer, primary_key=True,autoincrement=True,nullable=False)
    komentar=Column(Text, nullable=False)
    datum_komentara=Column(Date,nullable=False)
    korisnik_id=Column(Integer,ForeignKey("korisnik.id"),nullable=False)
    post_id=Column(Integer,ForeignKey("post.post_id"),nullable=False)
