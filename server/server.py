import psycopg2
from fastapi import FastAPI
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

@app.get("/")
def welcome():
    return {"message": "Welcome to ITWorx API"}

@app.get("/winners")
def get_recent_winners():
    # Example data, you should fetch this from your database
    winners = [
        {"name": "John Smith", "role": "Software Engineer", "date": "June 2023", "image": "./PIC/2.jpg"},
        {"name": "Jane Doe", "role": "Product Manager", "date": "May 2023", "image": "./PIC/3.jpg"},
        {"name": "Sam Johnson", "role": "UX Designer", "date": "April 2029", "image": "./PIC/4.jpg"}
    ]
    return {"winners": winners}  
