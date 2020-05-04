from fastapi import Depends, FastAPI, HTTPException, APIRouter, Request, Response, Form, status
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from ..database import SessionLocal, engine
from .. import schemas, models

from ..auth import(
    RegisterForm,
    create_user,
    get_user_by_email,
    verify_token
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

auth_route = APIRouter()

@auth_route.post("/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email_address)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    return create_user(db, user)