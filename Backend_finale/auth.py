"""
auth.py – Password hashing, JWT creation/decoding,
and FastAPI authentication dependency.
"""

from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

from fastapi import (
    Depends,
    HTTPException,
    status
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from config import settings


# ─────────────────────────────────────────────────────────────
# Password Hashing
# ─────────────────────────────────────────────────────────────

pwd_ctx = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(plain: str) -> str:
    """
    Hash plain password safely.

    bcrypt supports maximum 72 bytes,
    so truncate long passwords safely.
    """

    plain = plain[:72]

    return pwd_ctx.hash(plain)


def verify_password(
    plain: str,
    hashed: str
) -> bool:
    """
    Verify plain password against bcrypt hash.
    """

    plain = plain[:72]

    return pwd_ctx.verify(
        plain,
        hashed
    )


# ─────────────────────────────────────────────────────────────
# JWT Helpers
# ─────────────────────────────────────────────────────────────

def create_access_token(data: dict) -> str:
    """
    Create JWT token with expiration.
    """

    payload = data.copy()

    payload["exp"] = (
        datetime.utcnow()
        + timedelta(
            minutes=settings.JWT_EXPIRE_MINUTES
        )
    )

    return jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )


def decode_token(token: str) -> dict:
    """
    Decode and validate JWT token.
    """

    try:

        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )


# ─────────────────────────────────────────────────────────────
# FastAPI Auth Dependency
# ─────────────────────────────────────────────────────────────

_bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        _bearer_scheme
    ),
) -> str:
    """
    Validate JWT and return user_id.
    """

    payload = decode_token(
        credentials.credentials
    )

    user_id: str = payload.get("sub")

    if not user_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload missing subject.",
        )

    return user_id