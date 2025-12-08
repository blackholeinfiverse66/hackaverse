from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
import time
import psutil
import platform

router = APIRouter()

class HealthStatus(BaseModel):
    status: str  # "healthy", "warning", "critical"
    timestamp: float
    uptime: float
    version: str
    services: Dict[str, Any]

@router.get("/health", response_model=HealthStatus)
async def get_system_health():
    """Get system health status."""

    # Mock health data (in real app, this would check actual system metrics)
    services_status = {
        "database": {"status": "healthy", "response_time": 45},
        "cache": {"status": "healthy", "response_time": 12},
        "ai_agent": {"status": "healthy", "response_time": 1500},
        "file_storage": {"status": "healthy", "response_time": 89}
    }

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
        uptime=time.time() - time.time(),  # Mock uptime
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
