from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from db import cursor
import logging

router = APIRouter()

@router.get("/get_employee_data/{nomineeName}")
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
    
@router.get("/get_nominees")
def get_nominees():
    try:
        query = """select users.name, users.email, nominations.nomination_reason 
    from users, nominations 
    where nominations.nominee_id = users.id"""
        cursor.execute(query)
        nominees = cursor.fetchall()
        # i turned the fetched data to dictionary since it is returned as a tuple from fetchall
        # and it can't be parsed in the front end
        nominees = [{"name": nominee[0], "email": nominee[1], "nomination_reason": nominee[2]} for nominee in nominees]
        return nominees
    except Exception as e:
        logging.error("Failed to fetch data from database: %s", e)
        raise HTTPException(status_code=500, detail="Failed to fetch data from database")

