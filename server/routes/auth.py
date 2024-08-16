from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from models import LoginData

router = APIRouter()

@router.post("/login")
def login(data: LoginData, request: Request):
    try:
        if data.username == "admin" and data.password == "admin":
            request.session['user'] = data.username  # Store user in session
            return JSONResponse(content={"message": "Login successful"}, status_code=200)
        else:
            return JSONResponse(content={"message": "Invalid credentials"}, status_code=401)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/logout")
def logout(request: Request):
    request.session.pop('user', None)  # Remove user from session
    return JSONResponse(content={"message": "Logged out successfully"}, status_code=200)

@router.get("/check_login_status")
def check_login_status(request: Request):
    if 'user' in request.session:
        return JSONResponse(content={"loggedIn": True}, status_code=200)
    else:
        return JSONResponse(content={"loggedIn": False}, status_code=401)
