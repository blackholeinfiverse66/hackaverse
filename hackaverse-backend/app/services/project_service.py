from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.models.project import Project
from app.models.team import Team
from app.schemas.project import ProjectCreate, ProjectUpdate
from fastapi import HTTPException, status

class ProjectService:
    @staticmethod
    def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
        return db.query(Project).offset(skip).limit(limit).all()

    @staticmethod
    def get_project(db: Session, project_id: int) -> Optional[Project]:
        return db.query(Project).filter(Project.id == project_id).first()

    @staticmethod
    def get_projects_by_team(db: Session, team_id: int) -> List[Project]:
        return db.query(Project).filter(Project.team_id == team_id).all()

    @staticmethod
    def create_project(db: Session, project: ProjectCreate, user_id: int) -> Project:
        # Check if team exists
        team = db.query(Team).filter(Team.id == project.team_id).first()
        if not team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Team not found"
            )

        # Check if user is member of the team
        if user_id not in [member.id for member in team.members]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not a member of this team"
            )

        db_project = Project(
            title=project.title,
            description=project.description,
            track=project.track,
            github_url=project.github_url,
            demo_url=project.demo_url,
            video_url=project.video_url,
            team_id=project.team_id,
            created_by=user_id
        )
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def update_project(db: Session, project_id: int, project_update: ProjectUpdate, user_id: int) -> Project:
        db_project = db.query(Project).filter(Project.id == project_id).first()
        if not db_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

        # Check if user is creator or team member
        if db_project.created_by != user_id and user_id not in [member.id for member in db_project.team.members]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this project"
            )

        update_data = project_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_project, field, value)

        db_project.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def delete_project(db: Session, project_id: int, user_id: int) -> bool:
        db_project = db.query(Project).filter(Project.id == project_id).first()
        if not db_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

        # Check if user is creator
        if db_project.created_by != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this project"
            )

        db.delete(db_project)
        db.commit()
        return True

    @staticmethod
    def submit_project(db: Session, project_id: int, user_id: int) -> Project:
        db_project = db.query(Project).filter(Project.id == project_id).first()
        if not db_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )

        # Check if user is team member
        if user_id not in [member.id for member in db_project.team.members]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to submit this project"
            )

        if db_project.status != "draft":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Project is not in draft status"
            )

        db_project.status = "submitted"
        db_project.submitted_at = datetime.utcnow()
        db.commit()
        db.refresh(db_project)
        return db_project
