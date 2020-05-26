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

#from database import SessionLocal, engine
#import models, schemas

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#User authentication
def get_password_hash(password) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(portfolio_db: Session, username: str, password: str) -> models.User:
    user = get_user_by_email(portfolio_db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def get_user_by_email(portfolio_db: Session, email: str) -> models.User:
    return portfolio_db.query(models.User).filter(models.User.email_address == email).first()

def create_user(portfolio_db: Session, user: schemas.UserCreate) -> models.User:
    fake_hashed_password = get_password_hash(user.password)
    portfolio_db_user = models.User(email_address=user.email_address, first_name=user.first_name, last_name=user.last_name, nickname=user.nickname, additional_email=user.additional_email, password=fake_hashed_password)
    portfolio_db.add(portfolio_db_user)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_user)
    return portfolio_db_user

def create_access_token(*, data: dict) -> str:
    to_encode = data.copy()
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def save_access_token(portfolio_db: Session, user: models.User) -> models.User:
    portfolio_db.commit()
    portfolio_db.refresh(user)
    return user

def verify_token(portfolio_db: Session, email_address) -> str:
    try:
        user = get_user_by_email(portfolio_db, email_address)
        token = user.user_token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is not None:
            return username
        raise TokenVerificationError
    except ExpiredSignatureError:
        raise TokenVerificationError

def delete_access_token(portfolio_db: Session, email: str) -> models.User:
    try:
        user = get_user_by_email(portfolio_db, email)
        if user is None:
            raise TokenRemovalError
        user.user_token = None
        portfolio_db.commit()
        portfolio_db.refresh(user)
        return user
    except ExpiredSignatureError:
        raise TokenRemovalError

class TokenVerificationError(Exception):
    """Raised when user does not provide valid access token."""
class CookieVerificationError(Exception):
    """Raised when user does not provide valid access token."""
class UserVerificationError(Exception):
    """Raised wher user does not provide valid password or username."""
class TokenRemovalError(Exception):
    """Raised when token was not erased from database."""