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
        password='1234',
        host='localhost',
    )
    cursor = connection.cursor()
except Exception as e:
    logging.error("Database connection or operation failed: %s", e)
    raise HTTPException(status_code=500, detail="Database connection or operation failed")

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
    email: str
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
        cursor.execute("""
            SELECT u.name, u.email, w.month_year, COALESCE(w.image_url, '') 
            FROM winners w 
            JOIN users u ON w.winner_id = u.id 
            ORDER BY w.month_year DESC LIMIT 3;
        """)
        winners = cursor.fetchall()
        if not winners:
            logging.warning("No winners found in the database.")
            raise HTTPException(status_code=404, detail="No winners found")
        
        result = [{"name": row[0], "email": row[1], "month_year": row[2], "image": row[3]} for row in winners]
        return {"winners": result}
    except psycopg2.DatabaseError as db_error:
        logging.error("Database error occurred: %s", db_error)
        raise HTTPException(status_code=500, detail=f"Database error occurred: {db_error}")
    except Exception as e:
        logging.error("An unexpected error occurred: %s", e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from the database: {e}")

@app.post("/login")
def login(data: LoginData, request: Request):
    try:
        cursor.execute("""
            SELECT email, password
            FROM users
            WHERE email = %s
        """, (data.email,))
        result = cursor.fetchone()
        if result and result[1] == data.password:
            request.session['user'] = data.email  # Store user in session
            return JSONResponse(content={"message": "Login successful"}, status_code=200)
        else:
            return JSONResponse(content={"message": "Invalid credentials"}, status_code=401)
    except Exception as e:
        logging.error("An unexpected error occurred: %s", e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from the database: {e}")


@app.post("/logout")
def logout(request: Request):
    request.session.pop('user', None)  # Remove user from session
    return JSONResponse(content={"message": "Logged out successfully"}, status_code=200)

@app.get("/check_login_status")
def check_login_status(request: Request):
    if 'user' in request.session:
        print("User is logged in")
        return JSONResponse(content={"loggedIn": True}, status_code=200)
    else:
        print("User is not logged in")
        return JSONResponse(content={"loggedIn": False}, status_code=200)
