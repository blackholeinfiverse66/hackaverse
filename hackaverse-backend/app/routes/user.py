from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserProfile, UserUpdate
from app.utils.auth import get_current_user
from typing import Optional

router = APIRouter()

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get the current user's profile information."""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "full_name": current_user.full_name,
        "bio": current_user.bio,
        "avatar_url": current_user.avatar_url,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "is_verified": current_user.is_verified,
        "created_at": current_user.created_at,
        "updated_at": current_user.updated_at
    }

@router.put("/profile", response_model=UserProfile)
async def update_user_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update the current user's profile information."""
    # Update user fields
    if update_data.full_name is not None:
        current_user.full_name = update_data.full_name
    if update_data.bio is not None:
        current_user.bio = update_data.bio
    if update_data.avatar_url is not None:
        current_user.avatar_url = update_data.avatar_url

    db.commit()
    db.refresh(current_user)

    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "full_name": current_user.full_name,
        "bio": current_user.bio,
        "avatar_url": current_user.avatar_url,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "is_verified": current_user.is_verified,
        "created_at": current_user.created_at,
        "updated_at": current_user.updated_at
    }

@router.get("/stats")
async def get_user_stats(current_user: User = Depends(get_current_user)):
    """Get user statistics and activity data."""
    # Mock stats data - in a real app, this would come from the database
    return {
        "projects_created": 3,
        "teams_joined": 2,
        "submissions_made": 1,
        "achievements_unlocked": 5,
        "total_points": 450,
        "rank": 12,
        "activity": {
            "last_login": "2023-11-15T14:30:00Z",
            "account_created": current_user.created_at,
            "profile_completion": 85
        }
    }