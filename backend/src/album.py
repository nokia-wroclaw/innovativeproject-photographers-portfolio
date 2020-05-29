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

from .mainpage import(
    get_page,
    get_user_by_email,
    get_photo
)

def create_album(portfolio_db: Session, username: str, page_id: int, album: schemas.List_of_contentsCreate):
    user = get_user_by_email(portfolio_db, username)
    page = get_page(portfolio_db, user.id)
    portfolio_db_album = models.List_of_Contents(label_content = album.label_content, is_subgroup_there = album.is_subgroup_there, page_id = page)
    portfolio_db.add(portfolio_db_album)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_album)
    return portfolio_db_album

def get_album(portfolio_db: Session, page_id: int):
    return portfolio_db.query(models.List_of_Contents).filter(models.List_of_Contents.page_id == page_id).first()
    

def get_album_byname(portfolio_db: Session, page_id: int, album_name: str):
    return portfolio_db.query(models.List_of_Contents).filter(models.List_of_Contents.page_id == page_id).filter(models.List_of_Contents.label_content == album_name).first()

def create_subalbum(portfolio_db: Session, username: str, page_id: int, album_name: str, list_id: int, subalbum: schemas.Contents):
    user = get_user_by_email(portfolio_db, username)
    page = get_page(portfolio_db, user.id)
    album_status = get_album_byname(portfolio_db, page, album_name)
    if album_status.is_subgroup_there is True:
        portfolio_db_subalbum = models.Contents(label_content = subalbum.label_content, list_id = list_id)
        portfolio_db.add(portfolio_db_subalbum)
        portfolio_db.commit()
        portfolio_db.refresh(portfolio_db_subalbum)
        return portfolio_db_subalbum
    else:
        return "Album type does not allow adding subalbums."

def get_subalbum(portfolio_db: Session, album_id: int):
    return portfolio_db.query(models.Contents).filter(models.Contents.list_id == album_id).first()

def get_subalbum_byname(portfolio_db: Session, album_id: int, subalbum_name: str):
    return portfolio_db.query(models.Contents).filter(models.Contents.list_id == album_id).filter(models.Contents.label_content == subalbum_name).first()

def get_subalbum_byid(portfolio_db: Session, album_id: int, subalbum_id: int):
    return portfolio_db.query(models.Contents).filter(models.Contents.list_id == album_id).filter(models.Contents.id == subalbum_id).first()

def upl_photo(portfolio_db: Session, username: str, page_id: int, photo_id: int, album_name: str, subalbum_name: str, status: bool):
    user = get_user_by_email(portfolio_db, username)
    page_id = get_page(portfolio_db, user.id)
    album = get_album_byname(portfolio_db, page_id, album_name)
    ph = get_photo(portfolio_db, page_id, photo_id)
    if status == False:
        ph.id_list = album.id
        ph.list_content = False
    elif status == True:
        subalbum = get_subalbum_byname(portfolio_db, album.id, subalbum_name)
        ph.id_list = subalbum.id
        ph.list_content = True
    portfolio_db.commit()
    portfolio_db.refresh(ph)
    return ph

def upl_photo_toalbum(portfolio_db: Session, username: str, page_id: int, photo_id: int, album_name: str):
    user = get_user_by_email(portfolio_db, username)
    page_id = get_page(portfolio_db, user.id)
    album = get_album_byname(portfolio_db, page_id, album_name)
    ph = get_photo(portfolio_db, page_id, photo_id)
    ph.id_list = album.id
    ph.list_content = False
    portfolio_db.commit()
    portfolio_db.refresh(ph)
    return ph

def upl_photo_tosubalbum(portfolio_db: Session, username: str, page_id: int, photo_id: int, album_name: str, subalbum_name: str):
    user = get_user_by_email(portfolio_db, username)
    page_id = get_page(portfolio_db, user.id)
    album = get_album_byname(portfolio_db, page_id, album_name)
    ph = get_photo(portfolio_db, page_id, photo_id)
    subalbum = get_subalbum_byname(portfolio_db, album.id, subalbum_name)
    ph.id_list = subalbum.id
    ph.list_content = True
    portfolio_db.commit()
    portfolio_db.refresh(ph)
    return ph