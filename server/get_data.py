from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from models import LoginData
from db import cursor

router = APIRouter()

@router.get("/get_employee_data")
def get_employee_data():
    cursor.execute("select nominee_name, nominee_email, nomination_reason from nominations")
    nominee=cursor.fetchone()
    print(nominee)
