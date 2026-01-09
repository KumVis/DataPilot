from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from io import BytesIO
import pandas as pd

from app.services.cleaning_service import process_cleaning

router = APIRouter()

@router.post("/clean")
async def clean_data(file: UploadFile = File(...)):
    filename = file.filename.lower()

    file_bytes = await file.read()
    file_stream = BytesIO(file_bytes)

    if filename.endswith(".csv"):
        df = pd.read_csv(file_stream)
        output_format = "csv"
    elif filename.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_stream)
        output_format = "excel"
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    result = process_cleaning(df)

    cleaned_df = result["dataframe"]

    # --- Create preview ---
    preview = cleaned_df.head(5).to_dict(orient="records")

    # --- Create downloadable file ---
    output = BytesIO()
    if output_format == "csv":
        cleaned_df.to_csv(output, index=False)
        media_type = "text/csv"
        filename = "cleaned_data.csv"
    else:
        cleaned_df.to_excel(output, index=False)
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        filename = "cleaned_data.xlsx"

    output.seek(0)

    headers = {
        "X-Summary": str(result["summary"]),
        "Access-Control-Expose-Headers": "X-Summary"
    }

    return StreamingResponse(
        output,
        media_type=media_type,
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            **headers
        }
    )
