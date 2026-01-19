from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.comparison_service import (
    get_columns,
    compare_with_pk,
)

router = APIRouter(prefix="/compare", tags=["Data Comparison"])


@router.post("/columns")
async def extract_columns(file: UploadFile = File(...)):
    try:
        return {"columns": get_columns(file)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/with-pk")
async def compare_files_with_pk(
    file_old: UploadFile = File(...),
    file_new: UploadFile = File(...),
    pk_old: str = Form(...),
    pk_new: str = Form(...),
):
    try:
        return compare_with_pk(file_old, file_new, pk_old, pk_new)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
