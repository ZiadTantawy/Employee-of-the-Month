from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from config import CORS_ORIGINS, SECRET_KEY

def configure_middlewares(app):
    app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
