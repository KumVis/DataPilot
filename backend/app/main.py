from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.cleaning import router as cleaning_router
from app.api.v1.profiling import router as profiling_router
from app.api.v1.comparison import router as comparison_router
from app.api.v1.visualization import router as visualization_router





app = FastAPI(title="Data Quality Backend")

from fastapi import Request

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print("➡️ REQUEST:", request.method, request.url)
    response = await call_next(request)
    print("⬅️ RESPONSE:", response.status_code)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*","http://localhost:3000","http://127.0.0.1:3000"],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cleaning_router, prefix="/api/v1")
app.include_router(profiling_router, prefix="/api/v1")
app.include_router(comparison_router, prefix="/api/v1")
app.include_router(visualization_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
