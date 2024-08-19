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
    name: str
    email: str
    reason: str

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
        
        if data.email == "admin@gmail.com" and data.password == "admin":
            request.session['user'] = {
                'email': data.email,
                'isAdmin': True
            }  # Store user in session
            return JSONResponse(content={"message": "Login successful", "isAdmin": True}, status_code=200)
        elif result and result[1] == data.password:
            request.session['user'] = {
                'email': data.email,
                'isAdmin': False
            }  # Store user in session
            return JSONResponse(content={"message": "Login successful", "isAdmin": False}, status_code=200)
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

@app.get("/is_admin")
def is_admin(request: Request):
    user_session = request.session.get('user')
    
    if user_session and user_session.get('isAdmin'):
        return JSONResponse(content={"isAdmin": True}, status_code=200)
    else:
        return JSONResponse(content={"isAdmin": False}, status_code=200)

@app.get("/nominees")
def get_all_nominees():
    try:
        # Fetch total votes
        cursor.execute("""
           SELECT COUNT(*) AS total_votes
           FROM votes
           WHERE EXTRACT(YEAR FROM month_year) = EXTRACT(YEAR FROM CURRENT_DATE)
           AND EXTRACT(MONTH FROM month_year) = EXTRACT(MONTH FROM CURRENT_DATE)
        """)
        total_votes = cursor.fetchone()[0]

        if total_votes == 0:
            total_votes = 1  # Prevent division by zero

        # Fetch nominees and their vote counts
        cursor.execute("""
            SELECT u.name, u.email, n.nomination_reason, COUNT(v.nominee_id) AS vote_count
            FROM users u
            JOIN nominations n ON n.nominee_id = u.id
            LEFT JOIN votes v ON v.nominee_id = u.id
            WHERE EXTRACT(YEAR FROM n.month_year) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND EXTRACT(MONTH FROM n.month_year) = EXTRACT(MONTH FROM CURRENT_DATE)
            GROUP BY u.name, u.email, n.nomination_reason
        """)
        nominees = cursor.fetchall()

        if not nominees:
            logging.warning("No nominees found in the database.")
            raise HTTPException(status_code=404, detail="No nominees found")

        result = [
            {
                "name": row[0],
                "email": row[1],
                "nomination_reason": row[2],
                "vote_count": row[3],
                "percentage": (row[3] / total_votes) * 100  # Calculate percentage
            } for row in nominees
        ]

        return {"nominees": result}

    except psycopg2.DatabaseError as db_error:
        logging.error("Database error occurred: %s", db_error)
        raise HTTPException(status_code=500, detail=f"Database error occurred: {db_error}")
    except Exception as e:
        logging.error("An unexpected error occurred: %s", e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from the database: {e}")

