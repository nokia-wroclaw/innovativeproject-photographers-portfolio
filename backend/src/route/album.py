from fastapi import Depends, FastAPI, HTTPException, APIRouter, Request, Response, Form, status, File, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from ..database import SessionLocal, engine
from .. import schemas, models

from ..album import(
    create_album,
    # create_subalbum,
    get_user_by_email,
    get_page,
    # get_album,
    # get_album_status
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

album_route = APIRouter()

@album_route.post("/api/v1/album")
async def add_album(album: schemas.List_of_contentsCreate, requests: Request, db: Session = Depends(get_db)):
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    user = get_user_by_email(db, username)
    page = get_page(db, user.id)
    if not page:
        return false
    album = create_album(db, username, page, album)
    return album

# @album_route.post("/api/v1/subalbum")
# async def add_subalbum(subalbum: schemas.ContentsCreate, request: Request, db: Session = Depends(get_db)):
#         username = requests.cookies["username"]
#     response = Response()
#     response.set_cookie(
#         key="username",
#         value=username 
#     )
#     user = get_user_by_email(db, username)
#     page = get_page(db, user.id)
#     album = get_album(db, page)
#     status = get_album_status(db, album.)
#     return subalbum 