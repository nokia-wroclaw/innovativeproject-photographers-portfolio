from typing import List

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from sqlalchemy.orm import Session

from . import  models
from . import crud
from . import schemas
from .database import SessionLocal, engine

#models.Base.metadata.create_all(bind=engine)

app = FastAPI()