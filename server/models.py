from pydantic import BaseModel

class LoginData(BaseModel):
    username: str
    password: str

class NominationData(BaseModel):
    nominee_name: str
    nominee_email: str
    nomination_reason: str
    your_name: str
    your_email: str
