from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.submission import Submission
from app.schemas.submission import SubmissionCreate, SubmissionUpdate, Submission as SubmissionSchema
from app.services.submission_service import SubmissionService

router = APIRouter()
submission_service = SubmissionService()

@router.get("/", response_model=list[SubmissionSchema])
async def get_submissions(db: Session = Depends(get_db)):
    """Get all submissions."""
    return submission_service.get_submissions(db)

@router.get("/{submission_id}", response_model=SubmissionSchema)
async def get_submission(submission_id: int, db: Session = Depends(get_db)):
    """Get a specific submission by ID."""
    submission = submission_service.get_submission_by_id(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission

@router.post("/", response_model=SubmissionSchema)
async def create_submission(submission: SubmissionCreate, db: Session = Depends(get_db)):
    """Create a new submission."""
    return submission_service.create_submission(db, submission)

@router.put("/{submission_id}", response_model=SubmissionSchema)
async def update_submission(submission_id: int, submission_update: SubmissionUpdate, db: Session = Depends(get_db)):
    """Update an existing submission."""
    submission = submission_service.update_submission(db, submission_id, submission_update)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission

@router.delete("/{submission_id}")
async def delete_submission(submission_id: int, db: Session = Depends(get_db)):
    """Delete a submission."""
    success = submission_service.delete_submission(db, submission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"message": "Submission deleted successfully"}
