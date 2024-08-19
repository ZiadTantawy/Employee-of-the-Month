from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from db import cursor, connection
from models import NominationData

router = APIRouter()

@router.post("/nominate")
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

@router.get("/check_email/{nomineeEmail}")
def check_email(nomineeEmail: str):
    try:
        cursor.execute("SELECT 1 FROM nominations WHERE nominee_email = %s LIMIT 1;", (nomineeEmail,))
        exists = cursor.fetchone() is not None
        return JSONResponse(content={"exists": exists}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")