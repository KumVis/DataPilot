import pandas as pd
import numpy as np

def profile_dataframe(df: pd.DataFrame):
    total_cells = df.shape[0] * df.shape[1]
    null_cells = int(df.isna().sum().sum())

    column_stats = {}

    for col in df.columns:
        series = df[col]
        col_info = {
            "dtype": str(series.dtype),
            "null_count": int(series.isna().sum()),
            "null_percent": round(series.isna().mean() * 100, 2),
            "unique_values": int(series.nunique()),
        }

        if pd.api.types.is_numeric_dtype(series):
            col_info.update({
                "min": float(series.min()),
                "max": float(series.max()),
                "mean": round(float(series.mean()), 2),
            })
        else:
            col_info["top_values"] = (
                series.value_counts().head(5).to_dict()
            )

        column_stats[col] = col_info

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "shape": f"{df.shape[0]} x {df.shape[1]}",
        "duplicates": int(df.duplicated().sum()),
        "duplicate_percent": round(df.duplicated().mean() * 100, 2),
        "null_cells": null_cells,
        "null_cell_percent": round((null_cells / total_cells) * 100, 2),
        "column_summary": column_stats,
    }
