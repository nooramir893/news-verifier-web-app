"""
database.py – MongoDB connection via Motor (async driver)
"""
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

client: AsyncIOMotorClient = None
db = None


async def connect_db():
    """Open the async connection pool. Called once on app startup."""
    global client, db
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB]
    await client.admin.command("ping")
    print(f"✅  MongoDB connected  →  {settings.MONGO_DB}")


async def close_db():
    """Close the connection pool. Called once on app shutdown."""
    if client:
        client.close()
        print("🛑  MongoDB connection closed.")


def get_db():
    """
    Dependency for FastAPI routes.
    Usage:
        from database import get_db
        @router.get("/example")
        async def handler(db = Depends(get_db)):
            ...
    """
    return db
