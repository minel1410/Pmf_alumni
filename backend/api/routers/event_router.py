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
from sqlalchemy import desc
from datetime import timedelta
from utils import authentication, emailUtil
from database import get_db
from datetime import datetime, timedelta
from models import Event, EventTag, User, CourseUser, Course, Department, Token, Tag, TagUser
import uuid
import os
import json

router = APIRouter()

#dogadjaji za koje je zainteresiran user
@router.get("/user/{user_id}")
async def get_interested_events(user_id: int, db: Session = Depends(get_db)):
    # Finding user tags trazi tagove usera
    user_tags = db.query(TagUser.tag_id).filter(TagUser.korisnik_id == user_id).all()
   #lista id-ova od tagova usera
    user_tag_ids = []
    #prolazimo kroz tagove u user_tags listi i prvi element je taj id
    for tag in user_tags:
        user_tag_ids.append(tag[0])
    #ako nema vrati praznu listu
    if not user_tag_ids:
        return []

    #Kreiraj mi listu eventa spoji ih po tagovima i filtriraj prema tagovima usera
    events = (
        db.query(Event)
        .join(EventTag)
        .filter(EventTag.tag_id.in_(user_tag_ids))
        .all()
    )

    #ako nema dogadjaja koji odgovaraju useru bacimo izuzetak
    if not events:
        raise HTTPException(status_code=404, detail=f"Ne postoje dogadjaji za datog usera {user_id}")

    #lista eventa sta treba ispisat korisniku
    event_list = []
    for event in events:
        event_data = { #uzima podatke iz liste events i formira ih u ovom obliku koji cemo ispisivat
            "dogadjaj_id": event.dogadjaj_id,
            "naziv_dogadjaja": event.naziv_dogadjaja,
            "opis_dogadjaja": event.opis_dogadjaja,
            "ulica": event.ulica,
            "grad": event.grad,
            "datum_dogadjaja": event.datum_dogadjaja.isoformat(), 
            "dogadjaj_slika": event.dogadjaj_slika,
        }
        event_list.append(event_data) 

    return {"status": 200, "data":event_list}


#dogadjaji koje je postavio user na njima ce biti operacije delete i put
@router.get("/user/{user_id}/my_events")
async def get_user_events(user_id:int, db:Session=Depends(get_db)):
    events = db.query(Event).filter(Event.korisnik_id == user_id).all() #iz modela
    if not events:
        raise HTTPException(status_code=404, detail=f"Ne postoje dogadjaji za datog usera {user_id}")
    event_list = []
    for event in events:
        event_data = {
            "dogadjaj_id": event.dogadjaj_id,
            "naziv_dogadjaja": event.naziv_dogadjaja,
            "opis_dogadjaja": event.opis_dogadjaja,
            "ulica": event.ulica,
            "grad": event.grad,
            "datum_dogadjaja": event.datum_dogadjaja.isoformat(),
            "dogadjaj_slika": event.dogadjaj_slika,
        }
        event_list.append(event_data)

    return {"status": 200, "data": event_list}

#za admina da dobije dogadjaje
@router.get("/admin/events")
async def get_all_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    if not events:
        raise HTTPException(status_code=404, detail=f"Ne postoje dogadjaji")
    event_list = []
    for event in events:
        event_data = { #uzima podatke iz liste events i formira ih u ovom obliku koji cemo ispisivat
            "dogadjaj_id": event.dogadjaj_id,
            "naziv_dogadjaja": event.naziv_dogadjaja,
            "opis_dogadjaja": event.opis_dogadjaja,
            "ulica": event.ulica,
            "grad": event.grad,
            "datum_dogadjaja": event.datum_dogadjaja.isoformat(), 
            "dogadjaj_slika": event.dogadjaj_slika,
        }
        event_list.append(event_data) 

    return {"status": 200, "data":event_list}



@router.post("/create")
async def create_new_event(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()

    last_event = db.query(Event).order_by(desc(Event.dogadjaj_id)).first()
    last_event_id = last_event.dogadjaj_id if last_event else 0
    
    new_event_id = last_event_id + 1

    new_event = Event(
        dogadjaj_id=new_event_id,
        naziv_dogadjaja=request_data['event_name'],
        opis_dogadjaja=request_data['event_description'],
        ulica=request_data['street'],
        grad=request_data['city'],
        tip_dogadjaja_id=request_data['event_type_id'],
        korisnik_id=request_data['user_id'],
        datum_dogadjaja=request_data['event_date'],
    )

    last_event_tag = db.query(EventTag).order_by(desc(EventTag.tag_dogadjaja_id)).first()
    last_event_tag_id = last_event_tag.tag_dogadjaja_id if last_event else 0

    new_event_tag_id = last_event_tag_id + 1

    new_event_tags = EventTag(
        tag_dogadjaja_id=new_event_tag_id,
        tag_id = request_data['tag_id'],
        dogadjaj_id = new_event_id
    )

    db.add(new_event)
    db.add(new_event_tags)
    db.commit()

    return {"message": "Uspješno ste dodali novi event!", "event_id": new_event_id, "status": 200}

@router.delete("/delete/{event_id}")
async def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.dogadjaj_id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail=f"Dogadjaj sa ID-ijem {event_id} nije pronadjen")

    event_tags = db.query(EventTag).filter(EventTag.dogadjaj_id == event_id).all()
    if event_tags:
        for event_tag in event_tags:
            db.delete(event_tag)

    db.commit()

    db.delete(event)
    db.commit()

    return {"message": f"Dogadjaj sa ID-ijem {event_id} je uspješno obrisan", "status": 200}
