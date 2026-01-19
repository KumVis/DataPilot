import pandas as pd
import numpy as np


def sanitize_for_json(obj):
    if isinstance(obj, float):
        if np.isnan(obj) or np.isinf(obj):
            return None
    return obj

def profile_dataframe(df: pd.DataFrame):
    duplicates_df = df[df.duplicated(keep=False)]
    nulls_df = df[df.isna().any(axis=1)]

    column_summary = {}

    for col in df.columns:
        series = df[col]

        null_percent = round(series.isna().mean() * 100, 2)
        unique_values = int(series.nunique())

        column_summary[col] = {
            "dtype": str(series.dtype),
            "null_percent": sanitize_for_json(null_percent),
            "unique_values": unique_values,
        }

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "duplicate_percent": sanitize_for_json(
            round(df.duplicated().mean() * 100, 2)
        ),
        "null_cell_percent": sanitize_for_json(
            round(df.isna().mean().mean() * 100, 2)
        ),
        "top_rows": df.head(5).replace({np.nan: None}).to_dict(orient="records"),
        "duplicates": duplicates_df.replace({np.nan: None}).to_dict(orient="records"),
        "null_records": nulls_df.replace({np.nan: None}).to_dict(orient="records"),
        "column_summary": column_summary,
    }
