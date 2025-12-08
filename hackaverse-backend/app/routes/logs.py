from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import time
from datetime import datetime, timedelta

router = APIRouter()

class LogEntry(BaseModel):
    id: int
    time: str
    severity: str
    event: str
    submission: Optional[str] = None
    team: Optional[str] = None
    actor: str
    message: str

class LogsResponse(BaseModel):
    logs: List[LogEntry]
    total: int

@router.get("/", response_model=LogsResponse)
async def get_logs(
    severity: Optional[str] = Query(None, description="Filter by severity level"),
    source: Optional[str] = Query(None, description="Filter by source/actor"),
    date_range: Optional[str] = Query("today", description="Filter by date range (today, 7days, 30days)"),
    limit: Optional[int] = Query(100, description="Maximum number of logs to return"),
    offset: Optional[int] = Query(0, description="Pagination offset")
):
    """
    Get system logs with filtering options.

    Query parameters:
    - severity: Filter by severity level (info, warn, error)
    - source: Filter by source/actor
    - date_range: Filter by date range (today, 7days, 30days)
    - limit: Maximum number of logs to return (default: 100)
    - offset: Pagination offset (default: 0)
    """

    # Generate mock log data based on filters
    mock_logs = generate_mock_logs()

    # Apply filters
    filtered_logs = mock_logs

    if severity:
        filtered_logs = [log for log in filtered_logs if log.severity == severity]

    if source:
        filtered_logs = [log for log in filtered_logs if log.actor == source]

    # Apply date range filter
    now = datetime.now()
    if date_range == "today":
        cutoff = now - timedelta(days=1)
    elif date_range == "7days":
        cutoff = now - timedelta(days=7)
    elif date_range == "30days":
        cutoff = now - timedelta(days=30)
    else:
        cutoff = now - timedelta(days=365)  # Default to 1 year

    filtered_logs = [log for log in filtered_logs if datetime.strptime(log.time, "%Y-%m-%d %H:%M:%S") >= cutoff]

    # Apply pagination
    paginated_logs = filtered_logs[offset:offset + limit]

    return LogsResponse(
        logs=paginated_logs,
        total=len(filtered_logs)
    )

def generate_mock_logs():
    """Generate mock log data for development"""
    mock_data = []

    # Generate logs for different time periods
    now = datetime.now()
    time_formats = [
        (now - timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S"),
        (now - timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S"),
        (now - timedelta(hours=6)).strftime("%Y-%m-%d %H:%M:%S"),
        (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M:%S"),
        (now - timedelta(days=2)).strftime("%Y-%m-%d %H:%M:%S"),
    ]

    # Sample log entries
    log_entries = [
        {
            "id": 1,
            "time": time_formats[0],
            "severity": "info",
            "event": "project_submission",
            "submission": "Project Alpha",
            "team": "Team Innovators",
            "actor": "queue",
            "message": "New project submission received from Team Innovators"
        },
        {
            "id": 2,
            "time": time_formats[1],
            "severity": "warn",
            "event": "validation_warning",
            "submission": "Project Beta",
            "team": "Team Builders",
            "actor": "agent",
            "message": "Project Beta missing required documentation"
        },
        {
            "id": 3,
            "time": time_formats[2],
            "severity": "error",
            "event": "submission_failed",
            "submission": "Project Gamma",
            "team": "Team Creators",
            "actor": "api",
            "message": "Failed to process submission: invalid file format"
        },
        {
            "id": 4,
            "time": time_formats[3],
            "severity": "info",
            "event": "user_login",
            "submission": None,
            "team": None,
            "actor": "ui",
            "message": "Admin user logged in successfully"
        },
        {
            "id": 5,
            "time": time_formats[4],
            "severity": "info",
            "event": "system_check",
            "submission": None,
            "team": None,
            "actor": "system",
            "message": "System health check passed"
        },
        {
            "id": 6,
            "time": time_formats[0],
            "severity": "warn",
            "event": "rate_limit",
            "submission": "Project Delta",
            "team": "Team Developers",
            "actor": "api",
            "message": "High request rate detected from Team Developers"
        },
        {
            "id": 7,
            "time": time_formats[1],
            "severity": "info",
            "event": "reward_granted",
            "submission": None,
            "team": "Team Innovators",
            "actor": "reward",
            "message": "Karma points awarded to Team Innovators for innovation"
        },
        {
            "id": 8,
            "time": time_formats[2],
            "severity": "error",
            "event": "database_error",
            "submission": None,
            "team": None,
            "actor": "system",
            "message": "Database connection timeout occurred"
        }
    ]

    # Generate multiple copies with different IDs to simulate more data
    for i, entry in enumerate(log_entries):
        for j in range(3):  # Create 3 variations of each log
            new_entry = entry.copy()
            new_entry["id"] = i * 10 + j + 1
            # Vary the time slightly
            if j > 0:
                time_obj = datetime.strptime(new_entry["time"], "%Y-%m-%d %H:%M:%S")
                time_obj = time_obj - timedelta(minutes=j * 15)
                new_entry["time"] = time_obj.strftime("%Y-%m-%d %H:%M:%S")
            mock_data.append(LogEntry(**new_entry))

    return mock_data