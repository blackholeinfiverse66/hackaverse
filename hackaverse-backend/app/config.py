from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://user:password@localhost/hackaverse"
    mongodb_url: str = "mongodb://localhost:27017/hackaverse"

    # JWT
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # File Storage
    upload_directory: str = "uploads"
    max_file_size: int = 10 * 1024 * 1024  # 10MB

    # Email (optional)
    smtp_server: Optional[str] = None
    smtp_port: Optional[int] = None
    smtp_username: Optional[str] = None
    smtp_password: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
