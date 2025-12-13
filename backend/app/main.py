from fastapi import FastAPI
from app.api.v1.cleaning import router as cleaning_router

app = FastAPI(title="Data Quality Backend")

app.include_router(cleaning_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
