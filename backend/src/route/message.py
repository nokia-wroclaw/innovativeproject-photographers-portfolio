from fastapi import Depends, FastAPI, HTTPException, APIRouter, Request, Response, Form, status, File, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from ..database import SessionLocal, engine
from .. import schemas, models

from ..message import(
    get_user_by_email,
    save_message
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

message_route = APIRouter()

@message_route.post("/api/v1/message")
async def send_message(message: schemas.MessageCreate, requests: Request, db: Session = Depends(get_db)):
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    msg = save_message(db, username, message)
    return msg

# @message_route.get("/api/v1/status")
# async def update_status(status: str, requests: Request, db: Session = Depends(get_db)):
#     user = requests.cookies["username"]
#     if user not None:

#     return status