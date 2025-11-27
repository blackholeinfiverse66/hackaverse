from pydantic import BaseModel
from typing import Optional

class LeaderboardEntry(BaseModel):
    id: int
    name: str
    category: str
    score: int
    change: int
    trend: str
    projects: int
    members: int

class LeaderboardStats(BaseModel):
    total_teams: int
    active_projects: int
    top_score: int
