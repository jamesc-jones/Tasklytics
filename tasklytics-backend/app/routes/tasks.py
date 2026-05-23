from fastapi import APIRouter

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/")
def test_tasks():
    return {"message": "Tasks route working"}