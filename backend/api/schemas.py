from pydantic import BaseModel, HttpUrl
from datetime import datetime,date
from typing import Optional
from datetime import date, datetime


class UserSchema(BaseModel):
    id: int
    name: str
    lastname: str
    email: str
    password: str
    status: Optional[str] = ""
    is_admin: Optional[bool] = False
    profile_image: Optional[HttpUrl] = None
    diploma_image: Optional[HttpUrl] = None


class DislikePostSchema(BaseModel):
    user_id: int
    post_id: int


class EventsSchemaSchema(BaseModel):
    event_name: str
    event_description: str
    location: str
    event_date: str
    user_id: int


class CommentUserPostSchema(BaseModel):
    comment: str
    comment_date: str
    user_id: int
    post_id: int


class CourseUserSchema(BaseModel):
    user_id: int
    course_id: int


class CourseSchema(BaseModel):
    course_name: str
    course_id: int


class DepartmentSchema(BaseModel):
    department_name: str
    department_id: int


class StudySchema(BaseModel):
    study_name: str


class RegisterSchema(BaseModel):
    user: UserSchema
    course: CourseSchema
    department: DepartmentSchema


class EventTypeSchema(BaseModel):
    event_type_id:int 
    event_type_name: str


class EventSchema(BaseModel):
    event_id:Optional[int]=None
    event_name: Optional[str]=None
    event_description: Optional[str] = None
    street: Optional[str]= None
    city: Optional[str]= None
    event_type_id: Optional[int]=None
    user_id: Optional[int]=None
    event_date: Optional[datetime]=None
    event_image: Optional[str] = None


class EventTagSchema(BaseModel):
    tag_id: int
    event_id: int

class PostSchema(BaseModel):
    post_id: int
    title: Optional[str] = None
    content: Optional[str]=None
    post_date:Optional [date]=None
    user_id: int
    post_image:Optional[str]=None

class PostDislikeSchema(BaseModel):
    user_id:int
    post_id:int

class PostLikeSchema(BaseModel):
    user_id:int
    post_id:int

class PostCommentUserSchema(BaseModel):
    comment:str
    comment_date:date
    user_id:int
    post_id:int




class MessageBase(BaseModel):
    tekst_poruke: str
    datum_slanja: datetime
    posiljalac_id: int
    primalac_id: int


class MessageCreate(BaseModel):
    tekst_poruke: str
    posiljalac_id: int
    primalac_id: int


class MessageResponse(BaseModel):
    poruka_id: int
    tekst_poruke: str
    datum_slanja: datetime
    posiljalac_id: int
    primalac_id: int

    class Config:
        from_attributes = True

class JobSchema(BaseModel):
    job_name: str
    company_name: str
    email: str
    job_description: str
    location: str
    job_type: str
    job_image: Optional[str] = None
    start_date: date
    end_date: date
    user_id: int

class TagJobSchema(BaseModel):
    tag_id: int
    job_id: int

class EventTypeSchema(BaseModel):
    event_type_id:int 
    event_type_name: str


class EventSchema(BaseModel):
    event_id:Optional[int]=None
    event_name: Optional[str]=None
    event_description: Optional[str] = None
    street: Optional[str]= None
    city: Optional[str]= None
    event_type_id: Optional[int]=None
    user_id: Optional[int]=None
    event_date: Optional[datetime]=None
    event_image: Optional[str] = None


class EventTagSchema(BaseModel):
    tag_id: int
    event_id: int

class PostSchema(BaseModel):
    post_id: int
    title: Optional[str] = None
    content: Optional[str]=None
    post_date:Optional [date]=None
    user_id: int
    post_image:Optional[str]=None

class PostDislikeSchema(BaseModel):
    user_id:int
    post_id:int

class PostLikeSchema(BaseModel):
    user_id:int
    post_id:int

class PostCommentUserSchema(BaseModel):
    comment:str
    comment_date:date
    user_id:int
    post_id:int


class MessageBase(BaseModel):
    tekst_poruke: str
    datum_slanja: datetime
    posiljalac_id: int
    primalac_id: int


class MessageCreate(BaseModel):
    tekst_poruke: str
    posiljalac_id: int
    primalac_id: int


class MessageResponse(BaseModel):
    poruka_id: int
    tekst_poruke: str
    datum_slanja: datetime
    posiljalac_id: int
    primalac_id: int

    class Config:
        from_attributes = True

class JobSchema(BaseModel):
    job_name: str
    company_name: str
    email: str
    job_description: str
    location: str
    job_type: str
    job_image: Optional[str] = None
    start_date: date
    end_date: date
    user_id: int

class TagJobSchema(BaseModel):
    tag_id: int
    job_id: int