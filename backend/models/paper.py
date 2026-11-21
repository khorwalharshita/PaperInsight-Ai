from sqlalchemy import Column, Integer, String, Text
from backend.database.connection import Base


class Paper(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(500), nullable=False)
    authors = Column(Text)
    year = Column(Integer)

    abstract = Column(Text)
    technology = Column(String(500))
    dataset = Column(String(500))
    key_findings = Column(Text)
    research_gap = Column(Text)

    pdf_path = Column(String(500))
    content = Column(Text)