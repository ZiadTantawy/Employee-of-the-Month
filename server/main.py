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
        password='mfht132465',
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
    
@app.get("/get_employee_data/{nomineeName}")
def get_employee_data(nomineeName: str) -> dict:
    try:
        # Use parameterized query
        query = "SELECT nominee_name, nominee_email, nomination_reason FROM nominations WHERE nominee_name = %s"
        cursor.execute(query, (nomineeName,))
        nominee = cursor.fetchone()
        query = ""
        if nominee:
            # Return a dictionary for better structure
            return {
                "nominee_name": nominee[0],
                "nominee_email": nominee[1],
                "nomination_reason": nominee[2]
            }
        else:
            # Return a 404 error if no record is found
            raise HTTPException(status_code=404, detail="Nominee not found")
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
    
@app.get("/get_nominees/ {userEmail}")
def get_nominees(userEmail: str) -> list:
    try:
        query = "SELECT user.id from user where user.email = %s"
        cursor.execute(query, (userEmail,))
        userID = cursor.fetchone()
        query = """SELECT users.name, users.email, nominations.nomination_reason
FROM users
JOIN nominations ON nominations.nominee_id = users.id
WHERE EXTRACT(YEAR FROM nominations.month_year) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND EXTRACT(MONTH FROM nominations.month_year) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND nominations.nominator_id = %s
"""
        cursor.execute(query, (userID,))
        nominees = cursor.fetchall()
        # i turned the fetched data to dictionary since it is returned as a tuple from fetchall
        # and it can't be parsed in the front end
        nominees = [{"name": nominee[0], "email": nominee[1], "nomination_reason": nominee[2]} for nominee in nominees]
        return nominees
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")


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
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/check_email/{nomineeEmail}")
def check_email(nomineeEmail: str):
    try:
        cursor.execute("SELECT 1 FROM nominations WHERE nominee_email = %s LIMIT 1;", (nomineeEmail,))
        exists = cursor.fetchone() is not None
        return JSONResponse(content={"exists": exists}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")