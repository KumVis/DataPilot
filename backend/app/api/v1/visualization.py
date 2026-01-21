from fastapi import APIRouter, UploadFile, File
from app.services.visualization_service import analyze_dataset

router = APIRouter(
    prefix="/visualization",
    tags=["Data Visualization"]
)

@router.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    return analyze_dataset(file)
