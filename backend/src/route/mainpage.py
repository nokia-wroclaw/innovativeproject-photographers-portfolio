from fastapi import Depends, FastAPI, HTTPException, APIRouter, Request, Response, Form, status, File, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from ..database import SessionLocal, engine
from .. import schemas, models

from ..mainpage import(
    create_user_page,
    upload_file
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

mainpage_route = APIRouter()

@mainpage_route.post("/api/v1/mainpage")
async def create_page_withurl(mainpage: schemas.Main_pageCreate, requests: Request, db: Session = Depends(get_db)):
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    page = create_user_page(db, username, mainpage)
    return page

@mainpage_route.post("/api/v1/uploadfiles")
async def add_file(requests: Request, file: UploadFile = File(...), db: Session = Depends(get_db)): #dla jednej strony użytkownika
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    photo = upload_file(db, username, file)
    return None