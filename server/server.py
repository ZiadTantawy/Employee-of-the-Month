from fastapi import FastAPI, HTTPException ,Request
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import logging

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
    logging.error("Database connection failed: %s", e)
    raise HTTPException(status_code=500, detail="Database connection failed")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def login(request: Request):
    data = request.json()
    username = data.get('username')
    password = data.get('password')
    
    if username == "admin" and password == "admin":
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}
