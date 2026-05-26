from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.routes import auth, tasks
from app.database import Base, engine

app = FastAPI()

# This creates the tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Tasklytics Backend API running"}