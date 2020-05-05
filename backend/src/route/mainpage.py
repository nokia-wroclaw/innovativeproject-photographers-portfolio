from fastapi import Depends, FastAPI, HTTPException, APIRouter, Request, Response, Form, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from ..database import SessionLocal, engine
from .. import schemas, models

from ..mainpage import(

)

#Page
@app.post("/page/", response_model=schemas.Main_page)
def create_page_for_user(user_id: int, page: schemas.Main_pageCreate, db: Session = Depends(get_db)):
    return crud.create_user_page(db, page, user_id)     

