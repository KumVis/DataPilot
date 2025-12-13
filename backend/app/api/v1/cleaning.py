from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import BytesIO
from app.services.cleaning_service import process_cleaning

router = APIRouter()

@router.post("/clean")
async def clean_data(file: UploadFile = File(...)):
    filename = file.filename.lower()

    file_bytes = await file.read()   # 🔑 read file into memory
    file_stream = BytesIO(file_bytes)

    if filename.endswith(".csv"):
        df = pd.read_csv(file_stream)

    elif filename.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_stream)

    else:
        raise HTTPException(
            status_code=400,
            detail="Only CSV or Excel files are supported"
        )

    result = process_cleaning(df)

    return {
        "summary": result["summary"]
    }
