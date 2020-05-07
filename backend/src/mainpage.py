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


#Main_page
def create_page_url(portfolio_db: Session, page: schemas.Main_pageCreate, user: User) -> Response
def create_user_page(portfolio_db: Session, page: schemas.Main_pageCreate, user_id: int):
    portfolio_db_page = models.Main_page(**page.dict(), photographer_id = user_id)
    portfolio_db.add(portfolio_db_page)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_page)
    return portfolio_db_page
