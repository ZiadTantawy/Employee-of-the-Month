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
        connection.rollback()  # Roll back the transaction on error

        logging.error("Database error occurred: %s", db_error)
        raise HTTPException(status_code=500, detail=f"Database error occurred: {db_error}")
    except Exception as e:
        connection.rollback()  # Roll back the transaction on error

        logging.error("An unexpected error occurred: %s", e)
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from the database: {e}") 
    
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
        connection.rollback()  # Roll back the transaction on error

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

    
@app.get("/get_employee_data/{nomineeName}")
def get_employee_data(nomineeName: str) -> dict:
    try:
        # Use parameterized query

        query = "SELECT users.id FROM users WHERE users.name = %s"
        cursor.execute(query, (nomineeName,))
        nomineeID = cursor.fetchone()[0]
        query = """select users.name, users.email, nominations.nomination_reason
from users
inner join nominations on nominations.nominee_id = users.id
where users.id = %s"""
        cursor.execute(query, (nomineeID,))
        nominee = cursor.fetchone()
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
        connection.rollback()  # Roll back the transaction on error
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
    
@app.get("/get_nominees")
def get_nominees(request: Request) -> list:
    try:
        user_email = request.session.get('user')

        if user_email:
            # Use user_email as needed
            print("User email from session:", user_email)
        else:
            print("No user email in session")
        query = "SELECT users.id from users where users.email = %s"
        cursor.execute(query, (user_email,))
        userID = cursor.fetchone()
        if userID is None:
            raise HTTPException(status_code=404, detail="User not found")
        print(userID)
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
        connection.rollback()  # Roll back the transaction on error
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")

@app.get("/get_previous_nominees")
def get_nominees(request: Request) -> list:
    try:
        user_email = request.session.get('user')
        
        if user_email:
            # Use user_email as needed
            print("User email from session:", user_email)
        else:
            print("No user email in session")
        query = "SELECT users.id from users where users.email = %s"
        cursor.execute(query, (user_email,))
        userID = cursor.fetchone()
        print(userID)
        query = """SELECT users.name, users.email, nominations.nomination_reason
FROM users
JOIN nominations ON nominations.nominee_id = users.id
WHERE (EXTRACT(YEAR FROM nominations.month_year) <> EXTRACT(YEAR FROM CURRENT_DATE)
  OR EXTRACT(MONTH FROM nominations.month_year) <> EXTRACT(MONTH FROM CURRENT_DATE))
  AND nominations.nominator_id = %s
Limit 3
"""
        cursor.execute(query, (userID,))
        nominees = cursor.fetchall()
        # i turned the fetched data to dictionary since it is returned as a tuple from fetchall
        # and it can't be parsed in the front end
        nominees = [{"name": nominee[0], "email": nominee[1], "nomination_reason": nominee[2]} for nominee in nominees]
        return nominees
    except Exception as e:
        connection.rollback()  # Roll back the transaction on error

        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
    
@app.get("/get_all_current_nominees")
def get_all_current_nominees():
    try:
        query = """
    SELECT users.name, users.email, nominations.nomination_reason
    FROM users
    JOIN nominations ON nominations.nominee_id = users.id
    WHERE (EXTRACT(YEAR FROM nominations.month_year) = EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(MONTH FROM nominations.month_year) = EXTRACT(MONTH FROM CURRENT_DATE))
            """
        cursor.execute(query)
        current_nominees = cursor.fetchall()
        current_nominees = [{"name": nominee[0], "email": nominee[1], "nomination_reason": nominee[2]} for nominee in current_nominees]
        return current_nominees
    except Exception as e:
        connection.rollback()
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
        


@app.post("/nominate")
def nominate(data: NominationData):
    try:
        nominee_query = "SELECT id FROM users WHERE email = %s"
        cursor.execute(nominee_query, (data.nominee_email,))
        nominee_id = cursor.fetchone()[0]
        
        nominator_query = "SELECT id FROM users WHERE email = %s"
        cursor.execute(nominator_query, (data.your_email,))
        nominator_id = cursor.fetchone()[0]
        
        insert_query = """
            INSERT INTO nominations (nominee_id, nominator_id, nomination_reason, month_year)
            VALUES (%s, %s, %s, CURRENT_DATE);
        """
        cursor.execute(insert_query, (nominee_id, nominator_id, data.nomination_reason))
        connection.commit()
        return JSONResponse(content={"message": "Nomination submitted successfully"}, status_code=200)
    except Exception as e:
        connection.rollback()  # Roll back the transaction on error

        logging.error("Error submitting nomination: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/check_email/{nomineeEmail}")
def check_email(nomineeEmail: str):
    try:
        cursor.execute("SELECT 1 FROM nominations WHERE nominee_email = %s LIMIT 1;", (nomineeEmail,))
        exists = cursor.fetchone() is not None
        return JSONResponse(content={"exists": exists}, status_code=200)
    except Exception as e:
        connection.rollback()  # Roll back the transaction on error
        raise HTTPException(status_code=500, detail="Internal Server Error")

    
@app.get("/get_non_nominated_users")
def get_non_nominated_users(request: Request):
    if 'user' not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_email = request.session['user']
    try:
        query = """
            SELECT u.id, u.name, u.email 
            FROM users u
            LEFT JOIN nominations n ON u.id = n.nominee_id 
            WHERE n.nominee_id IS NULL AND u.email != %s
        """
        cursor.execute(query, (user_email,))
        users = cursor.fetchall()
        result = [{"id": row[0], "name": row[1], "email": row[2]} for row in users]
        return {"users": result}
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")

@app.get("/get_current_user")
def get_current_user(request: Request):
    if 'user' in request.session:
        try:
            query = "SELECT name, email FROM users WHERE email = %s"
            cursor.execute(query, (request.session['user'],))
            user = cursor.fetchone()
            if user:
                return {"name": user[0], "email": user[1]}
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception as e:
            logging.error("Failed to fetch user data from database: %s", e)
            raise HTTPException(status_code=500, detail="Failed to fetch user data from database")
    else:
        raise HTTPException(status_code=401, detail="Not authenticated")


@app.get("/get_nominee_email/{nominee_name}")
def get_nominee_email(nominee_name: str):
    try:
        query = "SELECT email FROM users WHERE name = %s"
        cursor.execute(query, (nominee_name,))
        result = cursor.fetchone()
        if result:
            return {"email": result[0]}
        else:
            raise HTTPException(status_code=404, detail="Nominee not found")
    except Exception as e:
        logging.error("Failed to fetch nominee email from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch nominee email from database")
@app.post("/addUser")
def add_user(data: dict, request: Request):
    try:
        # Extract user data
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not name or not email or not password:
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Insert the new user into the database
        insert_query = """
            INSERT INTO users (name, email, password, image_url, created_at)
            VALUES (%s, %s, %s, NULL, CURRENT_TIMESTAMP);
        """
        cursor.execute(insert_query, (name, email, password))
        connection.commit()
        
        return JSONResponse(content={"message": "User added successfully!"}, status_code=200)
    except psycopg2.IntegrityError as e:
        connection.rollback()
        logging.error("Integrity error: %s", e)
        raise HTTPException(status_code=400, detail="User already exists or invalid data")
    except Exception as e:
        connection.rollback()
        logging.error("Error adding user: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@app.post("/vote/{nomineeName}")
def vote_for_nominee(nomineeName: str, request: Request):
    try:
        # Check if user is authenticated
        if 'user' not in request.session:
            raise HTTPException(status_code=401, detail="Not authenticated")

        user_email = request.session['user']['email']

        # Fetch the nominee's ID
        cursor.execute("SELECT id FROM users WHERE name = %s", (nomineeName,))
        nominee_id = cursor.fetchone()

        if nominee_id is None:
            raise HTTPException(status_code=404, detail="Nominee not found")

        # Fetch the voter’s ID
        cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
        voter_id = cursor.fetchone()

        if voter_id is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if the user has already voted this month
        cursor.execute("""
            SELECT 1 FROM votes 
            WHERE voter_id = %s 
            AND EXTRACT(YEAR FROM month_year) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND EXTRACT(MONTH FROM month_year) = EXTRACT(MONTH FROM CURRENT_DATE)
        """, (voter_id,))

        if cursor.fetchone():
            return JSONResponse(content={"message": "You have already voted this month"}, status_code=403)

        # Insert the vote into the database
        cursor.execute("""
            INSERT INTO votes (voter_id, nominee_id, month_year)
            VALUES (%s, %s, CURRENT_DATE)
        """, (voter_id, nominee_id))
        connection.commit()

        return JSONResponse(content={"message": "Vote cast successfully"}, status_code=200)

    except Exception as e:
        connection.rollback()  # Roll back the transaction on error
        logging.error("Failed to cast vote: %s", e)
        raise HTTPException(status_code=500, detail="Failed to cast vote")

