from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.team import Team
from app.schemas.team import TeamCreate, TeamUpdate, Team as TeamSchema

router = APIRouter()

@router.get("/", response_model=list[TeamSchema])
async def get_teams(db: Session = Depends(get_db)):
    """Get all teams."""
    teams = db.query(Team).all()
    return teams

@router.get("/{team_id}", response_model=TeamSchema)
async def get_team(team_id: int, db: Session = Depends(get_db)):
    """Get a specific team by ID."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@router.post("/", response_model=TeamSchema)
async def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    """Create a new team."""
    db_team = Team(**team.dict())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

@router.put("/{team_id}", response_model=TeamSchema)
async def update_team(team_id: int, team_update: TeamUpdate, db: Session = Depends(get_db)):
    """Update an existing team."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    for key, value in team_update.dict().items():
        setattr(team, key, value)

    db.commit()
    db.refresh(team)
    return team

@router.delete("/{team_id}")
async def delete_team(team_id: int, db: Session = Depends(get_db)):
    """Delete a team."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    db.delete(team)
    db.commit()
    return {"message": "Team deleted successfully"}
