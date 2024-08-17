from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware
import psycopg2
import logging
from pydantic import BaseModel

app = FastAPI()

# Database connection
try:
    connection = psycopg2.connect(
        dbname='itworx',
        user='postgres',
        password='123',
        host='localhost',
    )
    cursor = connection.cursor()
except Exception as e:
    logging.error("Database connection failed: %s", e)
    raise HTTPException(status_code=500, detail="Database connection failed")

# Session middleware
app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginData(BaseModel):
    username: str
    password: str

class NominationData(BaseModel):
    nominee_name: str
    nominee_email: str
    nomination_reason: str
    your_name: str
    your_email: str

@app.get("/")
def welcome():
    return {"message": "Welcome to ITWorx API"}

@app.get("/winners")
def get_recent_winners():
    try:
        cursor.execute("SELECT name, role, date, image FROM winners ORDER BY date DESC LIMIT 3;")
        winners = cursor.fetchall()
        result = [{"name": row[0], "role": row[1], "date": row[2], "image": row[3]} for row in winners]
        return {"winners": result}
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")

@app.post("/login")
def login(data: LoginData, request: Request):
    try:
        if data.username == "admin" and data.password == "admin":
            request.session['user'] = data.username  # Store user in session
            return JSONResponse(content={"message": "Login successful"}, status_code=200)
        else:
            return JSONResponse(content={"message": "Invalid credentials"}, status_code=401)
    except Exception as e:
        logging.error(f"Error during login: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/logout")
def logout(request: Request):
    request.session.pop('user', None)  # Remove user from session
    return JSONResponse(content={"message": "Logged out successfully"}, status_code=200)

@app.get("/check_login_status")
def check_login_status(request: Request):
    if 'user' in request.session:
        return JSONResponse(content={"loggedIn": True}, status_code=200)
    else:
        return JSONResponse(content={"loggedIn": False}, status_code=401)

@app.post("/nominate")
def nominate(data: NominationData):
    try:
        cursor.execute("""
            INSERT INTO nominations (nominee_name, nominee_email, nomination_reason, your_name, your_email)
            VALUES (%s, %s, %s, %s, %s);
        """, (data.nominee_name, data.nominee_email, data.nomination_reason, data.your_name, data.your_email))
        connection.commit()
        return JSONResponse(content={"message": "Nomination submitted successfully"}, status_code=200)
    except Exception as e:
        logging.error(f"Error during nomination: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/check_email/{email}")
def check_email(email: str, request: Request):
    try:
        cursor.execute("SELECT 1 FROM nominations WHERE nominee_email = %s LIMIT 1;", (email,))
        exists = cursor.fetchone() is not None
        return JSONResponse(content={"exists": exists}, status_code=200)
    except Exception as e:
        logging.error(f"Error checking email: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")