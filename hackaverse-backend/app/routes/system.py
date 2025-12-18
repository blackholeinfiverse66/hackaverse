from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import time
import psutil
import platform
from sqlalchemy import text
from app.database import SessionLocal
from app.models.user import User

router = APIRouter()

class HealthStatus(BaseModel):
    status: str  # "healthy", "warning", "critical"
    timestamp: float
    uptime: float
    version: str
    services: Dict[str, Any]

def get_db_for_health_check():
    """Get database session for health check only"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/health", response_model=HealthStatus)
async def get_system_health(db=Depends(get_db_for_health_check)):
    """Get system health status with actual database connection test."""

    services_status = {}
    
    # Test database connection
    try:
        start_time = time.time()
        # Simple query to test connection
        db.execute(text("SELECT 1"))
        response_time = int((time.time() - start_time) * 1000)
        services_status["database"] = {
            "status": "healthy" if response_time < 1000 else "warning",
            "response_time": response_time
        }
    except Exception as e:
        services_status["database"] = {
            "status": "critical",
            "response_time": -1,
            "error": str(e)[:100]  # Truncate error message
        }

    # Mock other services (can be replaced with real checks)
    services_status["cache"] = {"status": "healthy", "response_time": 12}
    services_status["ai_agent"] = {"status": "healthy", "response_time": 1500}
    services_status["file_storage"] = {"status": "healthy", "response_time": 89}

    # Determine overall status
    has_warnings = any(service["status"] == "warning" for service in services_status.values())
    has_critical = any(service["status"] == "critical" for service in services_status.values())

    if has_critical:
        overall_status = "critical"
    elif has_warnings:
        overall_status = "warning"
    else:
        overall_status = "healthy"

    return HealthStatus(
        status=overall_status,
        timestamp=time.time(),
        uptime=time.time() - psutil.boot_time(),
        version="1.0.0",
        services=services_status
    )

@router.get("/info")
async def get_system_info():
    """Get system information."""

    return {
        "platform": platform.system(),
        "python_version": platform.python_version(),
        "cpu_count": psutil.cpu_count(),
        "memory_total": psutil.virtual_memory().total,
        "memory_available": psutil.virtual_memory().available,
        "disk_usage": psutil.disk_usage('/')._asdict(),
        "uptime": time.time() - psutil.boot_time()
    }
