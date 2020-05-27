from typing import List
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, Request, Response, Form, status, File, UploadFile
from sqlalchemy.orm import Session
import jwt
import os
from jwt import PyJWTError
from jwt.exceptions import ExpiredSignatureError
from passlib.context import CryptContext
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from .database import SessionLocal, engine
from . import models, schemas

from .auth import(
    get_user_by_email
)

#Main_page
def create_user_page(portfolio_db: Session, username: str, mainpage: schemas.Main_pageCreate):
    user = get_user_by_email(portfolio_db, username)
    portfolio_db_page = models.Main_page(page_url = mainpage.page_url, album_type = mainpage.album_type, photographer_id = user.id)
    portfolio_db.add(portfolio_db_page)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_page)
    return portfolio_db_page

def get_page(portfolio_db: Session, photographer_id: int):
    page = portfolio_db.query(models.Main_page).filter(models.Main_page.photographer_id == photographer_id).first()
    return page.id

#Photos
def save_file_indb(portfolio_db: Session, path: str, pg_id: int):
    portfolio_db_photo = models.Photos(path_and_name = path, page_id = pg_id)
    portfolio_db.add(portfolio_db_photo)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_photo)
    return portfolio_db_photo

def upload_file(portfolio_db: Session, username: str, file: File):
    user = get_user_by_email(portfolio_db, username)
    page_id = get_page(portfolio_db, user.id)
    path = "../../testfiles/" + str(page_id)
    if not os.path.isdir(path):
        os.mkdir(path)
    filen = file.filename
    with open(path + "/" + filen, 'wb') as f:
        f.write(file.file.read())
    f.close()
    save_file_indb(portfolio_db, path + "/" + filen, page_id)
    return None

def get_photo(portfolio_db: Session, page_id: int, file_id: int):
    return portfolio_db.query(models.Photos).filter(models.Photos.page_id == page_id).filter(models.Photos.id == file_id).first()