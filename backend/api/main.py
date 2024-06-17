from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routers import auth_router, chat_router, admin_router, file_router, job_router
from database import engine


def start_application() -> FastAPI:
    app = FastAPI()

    origins = ["http://localhost:3000"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router.router, prefix="/auth", tags=["auth"])
    app.include_router(chat_router.router, prefix="/chat", tags=["chat"])
    app.include_router(admin_router.router, prefix="/admin", tags=["admin"])
    app.include_router(file_router.router, prefix="/files", tags=["files"])
    app.include_router(job_router.router, prefix="/jobs", tags=["jobs"])
    return app


app = start_application()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
