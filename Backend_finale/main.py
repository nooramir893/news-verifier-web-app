"""
main.py – FastAPI entry point
Run with:  uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import connect_db, close_db
from detector import ml_service
from routes import router

# Read settings for CORS
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: connect DB + load ML model. Shutdown: close DB."""
    print("🚀  Starting NewsVerifier backend…")
    await connect_db()
    ml_service.load_models()
    print("✅  Server ready. Docs at http://127.0.0.1:8000/docs")
    yield
    await close_db()
    print("🛑  Server shut down.")


app = FastAPI(
    title="NewsVerifier API",
    description="AI-powered fake-news detection – FastAPI + MongoDB + Scikit-learn",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "message": "NewsVerifier API is running", "docs": "/docs"}
