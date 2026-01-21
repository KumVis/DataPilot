import pandas as pd
from fastapi import UploadFile
from io import BytesIO
from app.utils.json_sanitizer import safe_json

def analyze_dataset(file: UploadFile):
    contents = file.file.read()   # 🔥 READ BYTES FIRST

    if file.filename.endswith(".csv"):
        df = pd.read_csv(BytesIO(contents))
    elif file.filename.endswith(".xlsx") or file.filename.endswith(".xls"):
        df = pd.read_excel(BytesIO(contents))
    else:
        return {"error": "Unsupported file format"}

    numeric_columns = df.select_dtypes(include="number").columns.tolist()
    categorical_columns = df.select_dtypes(exclude="number").columns.tolist()

    analysis = {
        "columns": df.columns.tolist(),
        "row_count": len(df),
        "numeric_columns": numeric_columns,
        "categorical_columns": categorical_columns,
        "summary": {
            "mean": df[numeric_columns].mean().to_dict() if numeric_columns else {},
            "min": df[numeric_columns].min().to_dict() if numeric_columns else {},
            "max": df[numeric_columns].max().to_dict() if numeric_columns else {},
        },
        "sample_data": df.head(20).to_dict(orient="records"),
    }

    return safe_json(analysis)
