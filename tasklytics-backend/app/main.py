from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.routes import auth, tasks, admin
from app.database import Base, engine

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Tasklytics API",
    description="Task management backend with JWT auth",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This creates the tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth.router)
app.include_router(tasks.router)

app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "Tasklytics Backend API running!"}

