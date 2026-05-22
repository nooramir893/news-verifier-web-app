"""
models.py – All Pydantic schemas (User + Detection)
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Dict, Optional
from datetime import datetime


# ── User Schemas ──────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    """Body sent by the signup form."""
    name:     str      = Field(..., min_length=2,  max_length=80)
    email:    EmailStr
    password: str      = Field(..., min_length=8,  max_length=128)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Muhammad Ali",
                "email": "mali@example.com",
                "password": "SecurePass1!",
            }
        }


class UserLogin(BaseModel):
    """Body sent by the login form."""
    email:    EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {"email": "mali@example.com", "password": "SecurePass1!"}
        }


class UserPublic(BaseModel):
    """Safe user info returned to the frontend – NO password."""
    id:         str
    name:       str
    email:      EmailStr
    username:   str
    university: Optional[str] = ""
    department: Optional[str] = ""
    role:       Optional[str] = "Student"
    bio:        Optional[str] = ""
    join_date:  datetime


class UserUpdate(BaseModel):
    """Fields the user can update from the profile page."""
    name:       Optional[str] = None
    university: Optional[str] = None
    department: Optional[str] = None
    bio:        Optional[str] = None


class TokenResponse(BaseModel):
    """Returned after successful login / register."""
    access_token: str
    token_type:   str = "bearer"
    user:         UserPublic


# ── Detection Schemas ─────────────────────────────────────────────────────────

class DetectRequest(BaseModel):
    """Body sent from the /detect page textarea."""
    text: str = Field(..., min_length=20, max_length=10_000,
                      description="News article text to classify.")

    class Config:
        json_schema_extra = {
            "example": {"text": "Scientists confirm regular exercise improves brain health…"}
        }


class DetectResponse(BaseModel):
    """Full response returned to the frontend after classification."""
    verdict:    str           # "FAKE" or "REAL"
    confidence: float         # average confidence across models, 0-100
    models:     Dict[str, float]  # {"lr": 88.5, "nb": 91.0, …}
    word_count: int
    title:      str           # first sentence, truncated – for history display


class HistoryItem(BaseModel):
    """One row in the user's analysis history (stored in MongoDB)."""
    id:         Optional[str] = None
    user_id:    str
    text:       str
    title:      str
    verdict:    str
    confidence: float
    models:     Dict[str, float]
    word_count: int
    date:       datetime = Field(default_factory=datetime.utcnow)
