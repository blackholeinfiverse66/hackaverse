from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Association table for team members
team_members = Table(
    'team_members',
    Base.metadata,
    Column('team_id', Integer, ForeignKey('teams.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True)
)

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)
    track = Column(String)  # AI/ML, Web3, Gaming, Open Innovation, etc.
    max_members = Column(Integer, default=4)
    is_open = Column(Boolean, default=True)  # Whether team accepts new members

    # Foreign key for team leader
    leader_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    leader = relationship("User")
    members = relationship("User", secondary=team_members, backref="teams")
    projects = relationship("Project", back_populates="team")
    submissions = relationship("Submission", back_populates="team")

    @property
    def member_count(self):
        return len(self.members) + 1  # +1 for leader

    def __repr__(self):
        return f"<Team(id={self.id}, name={self.name}, members={self.member_count})>"
