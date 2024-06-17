from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import desc
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Job, Tag, TagJob, TagUser
from datetime import date
router = APIRouter()

#USER
#dodavanje novog posla
@router.post("/create")
async def create_job(request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    last_job = db.query(Job).order_by(desc(Job.posao_id)).first()
    last_job_id = last_job.posao_id if last_job else 0
    new_job_id = last_job_id+1
    new_job = Job(
        posao_id = new_job_id,
        naziv_posla=request_data['job_name'],
        naziv_firme=request_data['company_name'],
        email=request_data['email'],
        opis_posla=request_data['job_description'],
        lokacija=request_data['location'],
        tip_posla=request_data['job_type'],
        datum_pocetka=request_data['start_date'],
        datum_zavrsetka=request_data['end_date'],
        korisnik_id=request_data['user_id'],
    )
    last_job_tag=db.query(TagJob).order_by(desc(TagJob.id)).first()
    last_job_tag_id = last_job_tag.id if last_job else 0
    new_job_tag_id = last_job_tag_id + 1

    new_job_tag = TagJob(
        id=new_job_tag_id, 
        tag_id=request_data['tag_id'],
        posao_id=new_job_id
        )
    db.add(new_job)
    db.add(new_job_tag)
    db.commit()
    return {"message": "Uspješno ste dodali novi posao!", "job_id": new_job_id, "status": 200}

#tagovi potrebni za izlistavanje u formi kod dodavanja posla
@router.get("/tags")
async def get_tags(db: Session = Depends(get_db)):
    tags = db.query(Tag).all()
    return tags

#update posla koji je kreirao korisnik
@router.put("/update/{job_id}")
async def update_job(job_id: int, request: Request, db: Session = Depends(get_db)):
    request_data = await request.json()
    job = db.query(Job).filter(Job.posao_id == job_id).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Ažuriranje podataka o poslu
    job.naziv_posla = request_data['job_name']
    job.naziv_firme = request_data['company_name']
    job.email = request_data['email']
    job.opis_posla = request_data['job_description']
    job.lokacija = request_data['location']
    job.tip_posla = request_data['job_type']
    job.datum_pocetka = request_data['start_date']
    job.datum_zavrsetka = request_data['end_date']
    job.korisnik_id = request_data['user_id']

    # Ažuriranje podataka o tagu
    job_tag = db.query(TagJob).filter(TagJob.posao_id == job_id).first()
    if job_tag:
        job_tag.tag_id = request_data['tag_id']

    db.commit()
    return {"message": "Uspješno ste ažurirali posao!", "status": 200}

#dogadjaji koje je kreirao korisnik
@router.get("/user/{user_id}/my_jobs")
async def get_user_jobs(user_id:int, db:Session=Depends(get_db)):
    jobs = db.query(Job).filter(Job.korisnik_id == user_id).all() #iz modela
    if not jobs:
        raise HTTPException(status_code=404, detail=f"Ne postoje poslovi koje je objavio korisnik sa ID-ijem {user_id}")
    job_list = []
    for job in jobs:
        job_data = {
            "posao_id": job.posao_id,
            "naziv_posla": job.naziv_posla,
            "naziv_firme": job.naziv_firme,
            "email": job.email,
            "opis_posla": job.opis_posla,
            "lokacija": job.lokacija,
            "tip_posla": job.tip_posla,
            "posao_slika": job.posao_slika,
            "datum_pocetka": job.datum_pocetka,
            "datum_zavrsetka": job.datum_zavrsetka,
        }
        job_list.append(job_data)

    return {"status": 200, "data": job_list}

#brisanje posla koji je korisnik postavio
@router.delete("/delete/{job_id}")
async def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.posao_id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail=f"Posao sa ID-ijem {job_id} nije pronađen")
    job_tags = db.query(TagJob).filter(TagJob.posao_id == job_id).all()
    if job_tags:
        for job_tag in job_tags:
            db.delete(job_tag)
    db.commit()
    db.delete(job)
    db.commit()
    return {"message": f"Posao sa ID-ijem {job_id} je uspješno obrisan", "status": 200}

#personalizirani oglasi-detalji o jednom poslu
@router.get("/{job_id}")
async def get_single_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.posao_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail=f"Ne postoji posao sa ID-ijem {job_id}")

    job_data = {
        "posao_id": job.posao_id,
        "naziv_posla": job.naziv_posla,
        "naziv_firme": job.naziv_firme,
        "email": job.email,
        "opis_posla": job.opis_posla,
        "lokacija": job.lokacija,
        "tip_posla": job.tip_posla,
        "posao_slika": job.posao_slika,
        "datum_pocetka": job.datum_pocetka,
        "datum_zavrsetka": job.datum_zavrsetka,
    }

    return {"status": 200, "data": job_data}

#personalizirani oglasi-svi poslovi
@router.get("/user/{user_id}")
async def get_interested_jobs(user_id: int, db: Session = Depends(get_db)):
    user_tags = db.query(TagUser.tag_id).filter(TagUser.korisnik_id == user_id).all()
    user_tag_ids = [tag[0] for tag in user_tags]

    if not user_tag_ids:
        return []

    current_date = date.today()

    jobs = (
        db.query(Job)
        .join(TagJob)
        .filter(TagJob.tag_id.in_(user_tag_ids))
        .all()
    )

    if not jobs:
        raise HTTPException(status_code=404, detail=f"Ne postoje poslovi za datog korisnika {user_id}")

    job_list = []
    for job in jobs:
        if job.datum_zavrsetka >= current_date:
            job_data = {
                "posao_id": job.posao_id,
                "naziv_posla": job.naziv_posla,
                "naziv_firme": job.naziv_firme,
                "email": job.email,
                "opis_posla": job.opis_posla,
                "lokacija": job.lokacija,
                "tip_posla": job.tip_posla,
                "posao_slika": job.posao_slika,
                "datum_pocetka": job.datum_pocetka,
                "datum_zavrsetka": job.datum_zavrsetka,
            }
            job_list.append(job_data)

    return {"status": 200, "data": job_list}

#ADMIN
#svi poslovi u tabeli
@router.get("/admin/all_jobs")
async def get_all_jobs(db:Session=Depends(get_db)):
    jobs = db.query(Job).all() 
    if not jobs:
        raise HTTPException(status_code=404, detail=f"Ne postoje traženi poslovi!")
    job_list = []
    for job in jobs:
        job_data = {
            "posao_id": job.posao_id,
            "naziv_posla": job.naziv_posla,
            "naziv_firme": job.naziv_firme,
            "email": job.email,
            "opis_posla": job.opis_posla,
            "lokacija": job.lokacija,
            "tip_posla": job.tip_posla,
            "posao_slika": job.posao_slika,
            "datum_pocetka": job.datum_pocetka,
            "datum_zavrsetka": job.datum_zavrsetka,
        }
        job_list.append(job_data)

    return {"status": 200, "data": job_list}