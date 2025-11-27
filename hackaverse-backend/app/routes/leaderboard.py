from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from app.database import get_db
from app.models.team import Team
from app.models.project import Project
from app.models.submission import Submission
from app.schemas.leaderboard import LeaderboardEntry, LeaderboardStats
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[LeaderboardEntry])
async def get_leaderboard(
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db)
):
    """Get leaderboard data with team rankings and statistics."""

    # Base query to get teams with their project and submission counts and total scores
    query = db.query(
        Team.id,
        Team.name,
        Team.category,
        func.count(Project.id).label('projects'),
        func.count(Team.members).label('members'),
        func.coalesce(func.sum(Submission.score), 0).label('total_score')
    ).outerjoin(Project, Team.id == Project.team_id)\
     .outerjoin(Submission, Project.id == Submission.project_id)\
     .group_by(Team.id, Team.name, Team.category, Team.members)

    # Apply category filter if specified
    if category and category != 'all':
        query = query.filter(Team.category == category)

    # Order by total score descending
    teams_data = query.order_by(func.coalesce(func.sum(Submission.score), 0).desc()).all()

    # Calculate score changes (simplified - in real app this would compare with previous period)
    leaderboard_entries = []
    for i, team_data in enumerate(teams_data):
        # Mock score change calculation - in real app this would be stored in database
        change = (i % 3 - 1) * (10 + i * 2)  # Random change for demo
        trend = "up" if change > 0 else "down" if change < 0 else "stable"

        entry = LeaderboardEntry(
            id=team_data.id,
            name=team_data.name,
            category=team_data.category,
            score=int(team_data.total_score),
            change=abs(change),
            trend=trend,
            projects=team_data.projects,
            members=len(team_data.members) if team_data.members else 0
        )
        leaderboard_entries.append(entry)

    return leaderboard_entries

@router.get("/stats", response_model=LeaderboardStats)
async def get_leaderboard_stats(db: Session = Depends(get_db)):
    """Get leaderboard statistics."""

    # Get total teams
    total_teams = db.query(func.count(Team.id)).scalar()

    # Get active projects count
    active_projects = db.query(func.count(Project.id)).filter(Project.status == "active").scalar()

    # Get top score
    top_score_query = db.query(func.coalesce(func.sum(Submission.score), 0))\
                       .outerjoin(Project, Submission.project_id == Project.id)\
                       .outerjoin(Team, Project.team_id == Team.id)\
                       .group_by(Team.id)\
                       .order_by(func.sum(Submission.score).desc())\
                       .limit(1)

    top_score_result = top_score_query.first()
    top_score = int(top_score_result[0]) if top_score_result else 0

    return LeaderboardStats(
        total_teams=total_teams,
        active_projects=active_projects,
        top_score=top_score
    )
