from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.submission import Submission
from app.models.project import Project
from app.schemas.submission import SubmissionCreate, SubmissionUpdate
from fastapi import HTTPException, status
import os

class SubmissionService:
    @staticmethod
    def get_submissions(db: Session, skip: int = 0, limit: int = 100) -> List[Submission]:
        return db.query(Submission).offset(skip).limit(limit).all()

    @staticmethod
    def get_submission_by_id(db: Session, submission_id: int) -> Optional[Submission]:
        return db.query(Submission).filter(Submission.id == submission_id).first()

    @staticmethod
    def get_project_submissions(db: Session, project_id: int) -> List[Submission]:
        return db.query(Submission).filter(Submission.project_id == project_id).all()

    @staticmethod
    def create_submission(db: Session, submission: SubmissionCreate, user_id: int, file_size: int = None) -> Submission:
        # Verify project exists and user has access
        project = db.query(Project).filter(Project.id == submission.project_id).first()
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

        # Check if user is part of the project team
        if not SubmissionService._user_can_submit_to_project(db, user_id, submission.project_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to submit to this project"
            )

        db_submission = Submission(
            file_url=submission.file_url,
            file_type=submission.file_type,
            description=submission.description,
            project_id=submission.project_id,
            submitted_by=user_id,
            file_size=file_size
        )
        db.add(db_submission)
        db.commit()
        db.refresh(db_submission)
        return db_submission

    @staticmethod
    def update_submission(db: Session, submission_id: int, submission_update: SubmissionUpdate, user_id: int) -> Submission:
        db_submission = db.query(Submission).filter(Submission.id == submission_id).first()
        if not db_submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found"
            )

        # Only submitter can update submission
        if db_submission.submitted_by != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own submissions"
            )

        update_data = submission_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_submission, field, value)

        db.commit()
        db.refresh(db_submission)
        return db_submission

    @staticmethod
    def delete_submission(db: Session, submission_id: int, user_id: int):
        db_submission = db.query(Submission).filter(Submission.id == submission_id).first()
        if not db_submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found"
            )

        # Only submitter can delete submission
        if db_submission.submitted_by != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own submissions"
            )

        # Delete file from storage
        if db_submission.file_url and os.path.exists(db_submission.file_url):
            os.remove(db_submission.file_url)

        db.delete(db_submission)
        db.commit()

    @staticmethod
    def _user_can_submit_to_project(db: Session, user_id: int, project_id: int) -> bool:
        """Check if user can submit to a project (must be team member or leader)"""
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project or not project.team_id:
            return False

        team = project.team
        return (team.leader_id == user_id or
                any(member.id == user_id for member in team.members))
