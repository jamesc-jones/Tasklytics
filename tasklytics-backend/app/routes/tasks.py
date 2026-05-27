from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models
from app.auth.auth_dependencies import get_current_user

from app.schemas import TaskCreate, TaskUpdate

from app.database import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

# Get User Tasks
@router.get("/")
def get_tasks(
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):

    return db.query(models.Task).filter(
        models.Task.user_id == current_user.id
    ).all()


# Create a Task
@router.post("/")
def create_task(
        task: TaskCreate,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):

    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        user_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# Update a Task
@router.put("/{task_id}")
def update_task(
        task_id: int,
        task_data: TaskUpdate,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):

    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task_data.title
    db_task.description = task_data.description
    db_task.completed = task_data.completed

    db.commit()
    db.refresh(db_task)

    return db_task


# Delete a Task
@router.delete("/{task_id}")
def delete_task(
        task_id: int,
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):

    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted!"}