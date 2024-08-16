from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from db import connection
from middleware import configure_middlewares
from routes import auth, nominations, winners

app = FastAPI()

# Configure middlewares
configure_middlewares(app)

# Include routes
app.include_router(auth.router)
app.include_router(nominations.router)
app.include_router(winners.router)

@app.get("/")
def welcome():
    return {"message": "Welcome to ITWorx API Test"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
