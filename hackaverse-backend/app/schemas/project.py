from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    track: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    video_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    team_id: Optional[int] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    track: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    video_url: Optional[str] = None
    status: Optional[str] = None

class Project(ProjectBase):
    id: int
    status: str
    score: float
    feedback: Optional[str]
    team_id: Optional[int]
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime]
    submitted_at: Optional[datetime]

    class Config:
        from_attributes = True

class ProjectWithDetails(Project):
    team_name: Optional[str] = None
    creator_name: str
    member_count: Optional[int] = None
