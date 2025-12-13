import pandas as pd
from app.utils.text_cleaner import clean_dataframe

def process_cleaning(df: pd.DataFrame) -> dict:
    """
    Apply cleaning logic and return cleaned dataframe + summary
    """

    original_rows = len(df)
    original_columns = df.shape[1]

    cleaned_df = clean_dataframe(df)

    cleaned_rows = len(cleaned_df)

    summary = {
        "original_rows": original_rows,
        "cleaned_rows": cleaned_rows,
        "removed_duplicates": original_rows - cleaned_rows,
        "columns": list(cleaned_df.columns)
    }

    return {
        "dataframe": cleaned_df,
        "summary": summary
    }
