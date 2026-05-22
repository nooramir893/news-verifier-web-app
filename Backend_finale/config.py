"""
config.py – Central configuration loaded from .env
All settings are Pydantic-validated at startup.
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "NewsVerifier"
    DEBUG: bool = False

    # MongoDB (local: mongodb://localhost:27017  |  Atlas: your Atlas URI)
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB:  str = "fakenews_db"

    # JWT – change JWT_SECRET to a long random string in production!
    JWT_SECRET:         str = "CHANGE_ME_very_long_random_secret_key"
    JWT_ALGORITHM:      str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7   # 7 days

    # ML model file paths (relative to project root)
    MODEL_PATH:      str = "ml_models/best_model.pkl"
    VECTORIZER_PATH: str = "ml_models/tfidf_vectorizer.pkl"

    # CORS – comma-separated list of allowed frontend URLs
    # In .env: ALLOWED_ORIGINS=http://localhost:3000,https://yoursite.com
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
