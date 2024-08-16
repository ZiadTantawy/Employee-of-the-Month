from fastapi import APIRouter, HTTPException
from db import cursor
import logging

router = APIRouter()

@router.get("/winners")
def get_recent_winners():
    try:
        cursor.execute("SELECT name, role, date, image FROM winners ORDER BY date DESC LIMIT 3;")
        winners = cursor.fetchall()
        result = [{"name": row[0], "role": row[1], "date": row[2], "image": row[3]} for row in winners]
        return {"winners": result}
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")
