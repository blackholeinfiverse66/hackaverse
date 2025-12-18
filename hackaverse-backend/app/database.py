from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Create SQLAlchemy engine with connection pooling settings for stability
engine = create_engine(
    settings.database_url,
    pool_size=10,           # Number of connections to maintain
    max_overflow=20,        # Additional connections when pool is exhausted
    pool_recycle=3600,      # Recycle connections every hour
    pool_pre_ping=True,     # Verify connections before use
    echo=False              # Set to True for SQL debugging
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Dependency to get DB session with error handling
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        # Rollback any pending transactions on error
        db.rollback()
        raise e
    finally:
        # Always close the session to return connection to pool
        db.close()
