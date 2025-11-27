from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SubmissionBase(BaseModel):
    file_url: str
    file_type: str
    description: Optional[str] = None

class SubmissionCreate(SubmissionBase):
    project_id: int

class SubmissionUpdate(BaseModel):
    description: Optional[str] = None

class Submission(SubmissionBase):
    id: int
    project_id: int
    submitted_by: int
    submitted_at: datetime
    file_size: Optional[int] = None

    class Config:
        from_attributes = True

class SubmissionWithDetails(Submission):
    project_title: str
    submitter_name: str
    team_name: Optional[str] = None
