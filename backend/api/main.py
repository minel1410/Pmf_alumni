from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routers import auth_router
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

    # Registracija ruta
    app.include_router(auth_router.router, prefix="/auth", tags=["auth"])

    return app


app = start_application()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
