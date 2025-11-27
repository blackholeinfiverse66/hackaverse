from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    track = Column(String)  # AI/ML, Web3, Gaming, Open Innovation, etc.
    github_url = Column(String)
    demo_url = Column(String)
    video_url = Column(String)
    status = Column(String, default="draft")  # draft, submitted, approved, rejected
    score = Column(Float, default=0.0)
    feedback = Column(Text)

    # Foreign keys
    team_id = Column(Integer, ForeignKey("teams.id"))
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    submitted_at = Column(DateTime(timezone=True))

    # Relationships
    team = relationship("Team", back_populates="projects")
    creator = relationship("User")
    submissions = relationship("Submission", back_populates="project")

    def __repr__(self):
        return f"<Project(id={self.id}, title={self.title}, status={self.status})>"
