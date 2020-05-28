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
    create_subalbum,
    get_user_by_email,
    get_page,
    get_album,
    get_album_byname,
    upl_photo
)

from ..mainpage import(
    get_photo
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

# @album_route.get("/api/v1/getalbum")
# async def test(album_name: str, requests: Request, db: Session = Depends(get_db)):
#     username = requests.cookies["username"]
#     response = Response()
#     response.set_cookie(
#         key="username",
#         value=username 
#     )
#     user = get_user_by_email(db, username)
#     page = get_page(db, user.id)
#     return get_album_byname(db, page, album_name)
    

@album_route.post("/api/v1/subalbum")
async def add_subalbum(album_name: str, subalbum: schemas.Contents, requests: Request, db: Session = Depends(get_db)):
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    user = get_user_by_email(db, username)
    page = get_page(db, user.id)
    if not page:
        return False
    album_status = get_album_byname(db, page, album_name)
    subalbum = create_subalbum(db, username, page, album_name, album_status.id, subalbum)
    return subalbum

@album_route.post("/api/v1/addphoto")
async def add_photo_toalbum(requests: Request, page_id: int, album_name: str, photo_id: int, subalbum_name:str = "", db: Session = Depends(get_db)):
    username = requests.cookies["username"]
    response = Response()
    response.set_cookie(
        key="username",
        value=username 
    )
    if subalbum_name is None:
        status = False
    else:
        status = True
    save_tolist = upl_photo(db, username, page_id, photo_id, album_name, subalbum_name, status)
    return response