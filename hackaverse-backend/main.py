from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import (
    auth, projects, teams, submissions,
    agent, judge, reward, system, logs, leaderboard, user
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HackaVerse API",
    description="Backend API for HackaVerse hackathon platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(teams.router, prefix="/api/teams", tags=["teams"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["submissions"])
app.include_router(agent.router, prefix="/api/agent", tags=["agent"])
app.include_router(judge.router, prefix="/api/judge", tags=["judge"])
app.include_router(reward.router, prefix="/api/reward", tags=["reward"])
app.include_router(system.router, prefix="/api/system", tags=["system"])
app.include_router(logs.router, prefix="/api/logs", tags=["logs"])
app.include_router(leaderboard.router, prefix="/api/leaderboard", tags=["leaderboard"])
app.include_router(user.router, prefix="/api/user", tags=["user"])
