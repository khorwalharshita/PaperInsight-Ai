from fastapi import FastAPI

from backend.database.connection import Base, engine
from backend.models.paper import Paper
from backend.routes.papers import router as paper_router
from backend.routes.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(paper_router)
app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "PaperInsight AI Backend is running!"
    }