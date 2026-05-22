"""
routes.py – All API routes in one file.

Endpoints
─────────
POST   /api/auth/register      – create account
POST   /api/auth/login         – get JWT token

POST   /api/detect/            – classify a news article (auth required)

GET    /api/history/           – list user's analysis history (auth required)
GET    /api/history/stats      – aggregate stats for dashboard (auth required)
DELETE /api/history/{id}       – delete one history record (auth required)

GET    /api/user/me            – get current user profile (auth required)
PATCH  /api/user/me            – update profile fields (auth required)
"""
import re
from datetime import datetime
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from database import get_db
from models import (
    UserRegister, UserLogin, UserPublic, UserUpdate, TokenResponse,
    DetectRequest, DetectResponse,
)
from auth import hash_password, verify_password, create_access_token, get_current_user
from detector import ml_service

router = APIRouter()


# ── Helpers ───────────────────────────────────────────────────────────────────

def _doc_to_public(doc: dict) -> UserPublic:
    """Convert a raw MongoDB user document to the safe UserPublic schema."""
    return UserPublic(
        id=str(doc["_id"]),
        name=doc["name"],
        email=doc["email"],
        username=doc.get("username", ""),
        university=doc.get("university", ""),
        department=doc.get("department", ""),
        role=doc.get("role", "Student"),
        bio=doc.get("bio", ""),
        join_date=doc.get("join_date", datetime.utcnow()),
    )


def _serialize_history(doc: dict) -> dict:
    """Convert MongoDB _id ObjectId to string for JSON serialisation."""
    doc["id"] = str(doc.pop("_id"))
    return doc


# ── Auth routes ───────────────────────────────────────────────────────────────

@router.post("/api/auth/register", response_model=TokenResponse, status_code=201,
             tags=["Auth"], summary="Register a new user account")
async def register(body: UserRegister):
    db = get_db()
    existing = await db.users.find_one({"email": body.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )

    username = body.name.lower().replace(" ", "_")
    user_doc = {
        "name":             body.name,
        "email":            body.email,
        "username":         username,
        "hashed_password":  hash_password(body.password),
        "university":       "",
        "department":       "",
        "role":             "Student",
        "bio":              "",
        "join_date":        datetime.utcnow(),
    }

    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    token = create_access_token({"sub": str(result.inserted_id)})
    return TokenResponse(token_type="bearer", access_token=token, user=_doc_to_public(user_doc))


@router.post("/api/auth/login", response_model=TokenResponse,
             tags=["Auth"], summary="Log in and receive a JWT token")
async def login(body: UserLogin):
    db = get_db()
    user_doc = await db.users.find_one({"email": body.email})

    if not user_doc or not verify_password(body.password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    token = create_access_token({"sub": str(user_doc["_id"])})
    return TokenResponse(token_type="bearer", access_token=token, user=_doc_to_public(user_doc))


# ── Detection route ───────────────────────────────────────────────────────────

@router.post("/api/detect/", response_model=DetectResponse,
             tags=["Detection"], summary="Classify a news article as FAKE or REAL")
async def detect(body: DetectRequest, user_id: str = Depends(get_current_user)):
    text = body.text.strip()

    verdict, confidence, model_scores = ml_service.predict(text)

    first_sentence = re.split(r"[.!?]", text)[0].strip()
    title = (first_sentence[:65] + "…") if len(first_sentence) > 65 else first_sentence or "Untitled Article"
    word_count = len(text.split())

    db = get_db()
    await db.history.insert_one({
        "user_id":    user_id,
        "text":       text,
        "title":      title,
        "verdict":    verdict,
        "confidence": confidence,
        "models":     model_scores,
        "word_count": word_count,
        "date":       datetime.utcnow(),
    })

    return DetectResponse(
        verdict=verdict,
        confidence=confidence,
        models=model_scores,
        word_count=word_count,
        title=title,
    )


# ── History routes ────────────────────────────────────────────────────────────

@router.get("/api/history/", tags=["History"],
            summary="Get all past analyses for the logged-in user")
async def get_history(user_id: str = Depends(get_current_user)):
    db = get_db()
    cursor = db.history.find({"user_id": user_id}, sort=[("date", -1)], limit=50)
    return [_serialize_history(doc) async for doc in cursor]


@router.get("/api/history/stats", tags=["History"],
            summary="Get aggregate stats (total, fake, real, avgConf)")
async def get_stats(user_id: str = Depends(get_current_user)):
    db = get_db()
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {
            "_id":        None,
            "total":      {"$sum": 1},
            "fake_count": {"$sum": {"$cond": [{"$eq": ["$verdict", "FAKE"]}, 1, 0]}},
            "real_count": {"$sum": {"$cond": [{"$eq": ["$verdict", "REAL"]}, 1, 0]}},
            "avg_conf":   {"$avg": "$confidence"},
        }},
    ]
    result = await db.history.aggregate(pipeline).to_list(1)
    if not result:
        return {"total": 0, "fake": 0, "real": 0, "avgConf": 0, "fakePercent": 0}

    r     = result[0]
    total = r["total"]
    fake  = r["fake_count"]
    return {
        "total":       total,
        "fake":        fake,
        "real":        r["real_count"],
        "avgConf":     round(r["avg_conf"], 1),
        "fakePercent": round(fake / total * 100) if total else 0,
    }


@router.delete("/api/history/{item_id}", tags=["History"],
               summary="Delete a single history record")
async def delete_history(item_id: str, user_id: str = Depends(get_current_user)):
    db = get_db()
    result = await db.history.delete_one(
        {"_id": ObjectId(item_id), "user_id": user_id}
    )
    if result.deleted_count != 1:
        raise HTTPException(status_code=404, detail="History item not found.")
    return {"message": "Deleted successfully."}


# ── User routes ───────────────────────────────────────────────────────────────

@router.get("/api/user/me", response_model=UserPublic,
            tags=["User"], summary="Get current user profile")
async def get_me(user_id: str = Depends(get_current_user)):
    db = get_db()
    doc = await db.users.find_one({"_id": ObjectId(user_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="User not found.")
    return _doc_to_public(doc)


@router.patch("/api/user/me", response_model=UserPublic,
              tags=["User"], summary="Update profile fields")
async def update_me(body: UserUpdate, user_id: str = Depends(get_current_user)):
    db = get_db()
    updates = {k: v for k, v in body.model_dump().items() if v is not None}
    if updates:
        await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": updates})

    doc = await db.users.find_one({"_id": ObjectId(user_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="User not found.")
    return _doc_to_public(doc)
