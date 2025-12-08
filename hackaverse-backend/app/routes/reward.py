from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import time

router = APIRouter()

class RewardRequest(BaseModel):
    user_id: int
    achievement_type: str
    points: int
    description: Optional[str] = None

class RewardResponse(BaseModel):
    success: bool
    reward_id: int
    total_points: int
    message: str
    timestamp: float

@router.post("/", response_model=RewardResponse)
async def grant_reward(request: RewardRequest):
    """Grant karma points/rewards to users."""

    # Mock reward processing
    reward_id = int(time.time() * 1000)  # Simple ID generation

    # Mock total points calculation (in real app, this would be from database)
    mock_current_points = {
        1: 150,
        2: 200,
        3: 75
    }

    current_points = mock_current_points.get(request.user_id, 100)
    new_total = current_points + request.points

    # Achievement messages based on type
    achievement_messages = {
        "project_submission": f"🎯 Awarded {request.points} points for project submission!",
        "peer_review": f"🤝 Awarded {request.points} points for helping fellow hackers!",
        "first_place": f"🏆 Awarded {request.points} points for winning first place!",
        "innovation": f"💡 Awarded {request.points} points for innovative solution!",
        "participation": f"🎉 Awarded {request.points} points for active participation!"
    }

    message = achievement_messages.get(request.achievement_type,
                                     f"✨ Awarded {request.points} points for achievement!")

    return RewardResponse(
        success=True,
        reward_id=reward_id,
        total_points=new_total,
        message=message,
        timestamp=time.time()
    )

@router.get("/leaderboard")
async def get_karma_leaderboard():
    """Get karma points leaderboard."""

    # Mock leaderboard data
    leaderboard = [
        {"user_id": 2, "username": "hackmaster", "points": 450, "rank": 1},
        {"user_id": 1, "username": "codewizard", "points": 380, "rank": 2},
        {"user_id": 3, "username": "innovator", "points": 320, "rank": 3},
        {"user_id": 4, "username": "teambuilder", "points": 290, "rank": 4},
        {"user_id": 5, "username": "problem_solver", "points": 250, "rank": 5}
    ]

    return {"leaderboard": leaderboard}
