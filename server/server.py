import psycopg2
from fastapi import FastAPI

app = FastAPI()
connection = psycopg2.connect(
    dbname='itworx',
    user='postgres',
    password='1234',
    host='localhost', 
)
cursor = connection.cursor()

@app.get("/")
def home():
    return {"message": "Hello World"}
@app.post("/login")
def login(username: str, password: str):
    cursor.execute(f"SELECT * FROM users WHERE username='{username}' AND password='{password}'")
    user = cursor.fetchone()
    if user:
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}
    


    

    
    


