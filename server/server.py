import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
connection = psycopg2.connect(
    dbname='itworx',
    user='postgres',
    password='1234',
    host='localhost', 
)
cursor = connection.cursor()

# Allowing CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="localhost",
        port="5432"
    )
    return conn

@app.get("/")
def welcome():
    return {"message": "Welcome to ITWorx API"}

@app.get("/winners")
def get_recent_winners():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT name, role, date, image FROM winners ORDER BY date DESC LIMIT 3;")
        winners = cur.fetchall()
        cur.close()
        conn.close()

        # Convert the fetched data into a list of dictionaries
        result = [{"name": row[0], "role": row[1], "date": row[2], "image": row[3]} for row in winners]

        return {"winners": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
