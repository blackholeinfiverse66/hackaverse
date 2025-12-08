from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserProfile(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None