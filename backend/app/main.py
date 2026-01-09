from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.cleaning import router as cleaning_router

app = FastAPI(title="Data Quality Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*","http://localhost:3000","http://127.0.0.1:3000"],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cleaning_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
