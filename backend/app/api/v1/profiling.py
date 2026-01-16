from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import BytesIO

from app.services.profiling_service import profile_dataframe

router = APIRouter()

@router.post("/profile")
async def profile_data(file: UploadFile = File(...)):
    filename = file.filename.lower()
    content = await file.read()
    stream = BytesIO(content)

    if filename.endswith(".csv"):
        df = pd.read_csv(stream)
    elif filename.endswith((".xlsx", ".xls")):
        df = pd.read_excel(stream)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    return profile_dataframe(df)
