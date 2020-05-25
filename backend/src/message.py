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

#Message
def save_message(portfolio_db: Session, username: str, message: schemas.MessageCreate):
    user = get_user_by_email(portfolio_db, username)
    portfolio_db_message = models.Message(first_name = message.first_name, last_name = message.last_name, sender_email_address = message.sender_email_address, subject = message.subject, message_content = message.message_content, date = message.date, receiver_id = user.id)
    portfolio_db.add(portfolio_db_message)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_message)
    return portfolio_db_message

# def get_massage(portfolio_db: Session, message_id: int) -> models.User:
#     return portfolio_db.query(models.User).filter(models.User.email_address == email).first()


# def change_status(portfolio_db: Session, album: schemas):   
#     portfolio_db_status = models.List_of_Contents(status = album.status)
#     if portfolio_db_status == "Nie przeczytane":
#         portfolio_db_status = "Odczytane"
#     portfolio_db.add(portfolio_db_status)
#     portfolio_db.commit()
#     portfolio_db.refresh(portfolio_db_status)
#     return portfolio_db_status