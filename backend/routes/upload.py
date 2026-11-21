import os
import json

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.database.connection import SessionLocal
from backend.models.paper import Paper
from backend.services.pdf_processor import extract_text_from_pdf
from backend.services.paper_analyzer import analyze_paper


router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "data/papers"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def convert_to_text(value):
    """
    Convert Gemini output into text suitable for MySQL TEXT columns.
    """

    if value is None:
        return None

    if isinstance(value, list):
        return json.dumps(value, ensure_ascii=False)

    return str(value)


@router.post("/")
async def upload_paper(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # 1. Save PDF
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # 2. Extract text from PDF
    text = extract_text_from_pdf(file_path)

    # 3. Analyze paper using Gemini
    analysis = analyze_paper(text)

    # 4. Save paper information to MySQL
    paper = Paper(
        title=convert_to_text(analysis.get("title")) or file.filename,
        authors=convert_to_text(analysis.get("authors")),
        year=analysis.get("year"),
        abstract=convert_to_text(analysis.get("abstract")),
        technology=convert_to_text(analysis.get("technology")),
        dataset=convert_to_text(analysis.get("dataset")),
        key_findings=convert_to_text(analysis.get("key_findings")),
        research_gap=convert_to_text(analysis.get("research_gap")),
        pdf_path=file_path,
        content=text
    )

    db.add(paper)
    db.commit()
    db.refresh(paper)

    return {
        "message": "Paper uploaded and analyzed successfully",
        "paper_id": paper.id,
        "filename": file.filename,
        "analysis": analysis
    }