from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=4)
    confirm_password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: str


class TaskUpdate(BaseModel):
    task_id: int
    title: str
    description: str
    completed: bool


class TaskDelete(BaseModel):
    task_id: int












