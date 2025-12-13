import pandas as pd
import re

def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Perform standard data cleaning:
    - Trim spaces
    - Remove newlines
    - Remove special characters
    - Remove duplicate rows
    """

    df = df.copy()

    for col in df.select_dtypes(include=["object"]).columns:
        df[col] = (
            df[col]
            .astype(str)
            .str.strip()                         # remove leading/trailing spaces
            .str.replace(r"\n|\r", " ", regex=True)  # remove newlines
            .str.replace(r"[^\w\s]", "", regex=True) # remove special characters
            .str.replace(r"\s+", " ", regex=True)    # normalize spaces
        )

    # Remove duplicate rows
    df.drop_duplicates(inplace=True)

    return df
