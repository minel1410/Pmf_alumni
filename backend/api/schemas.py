from pydantic import BaseModel, HttpUrl
from typing import Optional


class UserSchema(BaseModel):
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
