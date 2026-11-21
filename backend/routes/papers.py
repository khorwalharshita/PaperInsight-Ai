from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.connection import SessionLocal
from backend.models.paper import Paper

router = APIRouter(prefix="/papers", tags=["Papers"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_papers(db: Session = Depends(get_db)):
    return db.query(Paper).all()