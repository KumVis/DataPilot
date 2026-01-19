import pandas as pd
from io import BytesIO




def to_python_type(value):
    """
    Convert numpy / pandas types to native Python types
    """
    if pd.isna(value):
        return None

    if isinstance(value, (pd.Timestamp,)):
        return value.isoformat()

    if hasattr(value, "item"):
        return value.item()

    return value

# -------------------------------------------/
def normalize_records(records):
    """
    Convert list of dicts with numpy values to JSON-safe dicts
    """
    normalized = []
    for row in records:
        clean_row = {}
        for k, v in row.items():
            clean_row[k] = to_python_type(v)
        normalized.append(clean_row)
    return normalized
# ----------------------------------------------

# -------------------------------
# Helper: Read uploaded file safely
# -------------------------------
def read_file(upload_file):
    """
    Safely read CSV or Excel UploadFile into pandas DataFrame
    """
    upload_file.file.seek(0)
    contents = upload_file.file.read()

    if not contents or len(contents) == 0:
        raise ValueError("Uploaded file is empty or unreadable")

    buffer = BytesIO(contents)
    filename = upload_file.filename.lower()

    if filename.endswith(".csv"):
        return pd.read_csv(buffer)

    if filename.endswith((".xlsx", ".xls")):
        return pd.read_excel(buffer, engine="openpyxl")

    raise ValueError("Unsupported file format. Upload CSV or Excel.")


# -------------------------------
# Extract columns only (metadata)
# -------------------------------
def get_columns(upload_file):
    df = read_file(upload_file)
    return list(df.columns)


# -------------------------------
# Compare two files using primary keys
# -------------------------------
def compare_with_pk(file_old, file_new, pk_old, pk_new):
    df_old = read_file(file_old)
    df_new = read_file(file_new)

    pk_old = pk_old.strip()
    pk_new = pk_new.strip()

    # ---- Validate PK existence ----
    if pk_old not in df_old.columns:
        raise ValueError(f"Primary key '{pk_old}' not found in File A")

    if pk_new not in df_new.columns:
        raise ValueError(f"Primary key '{pk_new}' not found in File B")

    # ---- Set index ----
    df_old = df_old.set_index(pk_old)
    df_new = df_new.set_index(pk_new)

    # ---- Validate PK uniqueness ----
    if not df_old.index.is_unique:
        raise ValueError(f"Primary key '{pk_old}' is not unique in File A")

    if not df_new.index.is_unique:
        raise ValueError(f"Primary key '{pk_new}' is not unique in File B")

    # ---- Added / Removed ----
    added = df_new.loc[~df_new.index.isin(df_old.index)]
    removed = df_old.loc[~df_old.index.isin(df_new.index)]

    # ---- Changed Records (JSON-safe diff) ----
    changed_rows = []
    common_keys = df_old.index.intersection(df_new.index)

    for key in common_keys:
        old_row = df_old.loc[key]
        new_row = df_new.loc[key]

        diffs = {}

        for col in df_old.columns:
            if col not in df_new.columns:
                continue

            old_val = old_row[col]
            new_val = new_row[col]

            # Skip if both are NaN
            if pd.isna(old_val) and pd.isna(new_val):
                continue

            # Detect change
            if pd.isna(old_val) != pd.isna(new_val) or old_val != new_val:
                diffs[col] = {
                    "old": to_python_type(old_val),
                    "new": to_python_type(new_val),
                }

        if diffs:
            changed_rows.append({
                "primary_key": key,
                "changes": diffs
            })

    # ---- Final JSON-safe response ----
    return {
        "summary": {
            "added": len(added),
            "removed": len(removed),
            "changed": len(changed_rows),
        },
        "added": added.reset_index().to_dict(orient="records"),
        "removed": removed.reset_index().to_dict(orient="records"),
        "changed": changed_rows,
    }
