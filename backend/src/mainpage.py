from typing import List
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, Request, Response, Form, status
from sqlalchemy.orm import Session
import jwt
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
