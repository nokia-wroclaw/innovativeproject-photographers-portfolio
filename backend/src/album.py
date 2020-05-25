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
    get_user_by_email
)

def create_album(portfolio_db: Session, username: str, page_id: int, album: schemas.List_of_contentsCreate):
    user = get_user_by_email(portfolio_db, username)
    page = get_page(portfolio_db, user.id)
    portfolio_db_album = models.List_of_Contents(label_content = album.label_content, is_subgroup_there = album.is_subgroup_there, page_id = page)
    portfolio_db.add(portfolio_db_album)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_album)
    return portfolio_db_album

# def get_album(portfolio_db: Session, page_id: int):
#     return portfolio_db.query(models.List_of_Contents).filter(models.List_of_Contents.page_id == page_id).first()

# def get_album_status(portfolio_db: Session, album_id: int):
#     return portfolio_db.query(models.List_of_Contents).filter(models.List_of_Contents.is_subgroup_there == is_subgroup_there).first()

# def create_subalbum(portfolio_db: Session, username: str, page_id: int, album_id: int, subalbum: schemas.ContentsCreate):
#     user = get_user_by_email(portfolio_db, username)
#     page = get_page(portfolio_db, user.id)
#     album = get_album(portfolio_db, page)
#     if album.is_subgroup_there is false:
#         return false
#     portfolio_db_subalbum = models.Contents(label_content = subalbum.label_content)
#     portfolio_db.add(portfolio_db_subalbum)
#     portfolio_db.commit()
#     portfolio_db.refresh(portfolio_db_subalbum)
#     return portfolio_db_subalbum
