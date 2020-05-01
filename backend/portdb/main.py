from typing import List
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, Request, Response, Form, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from jwt import PyJWTError
from passlib.context import CryptContext
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from .database import SessionLocal, engine
from . import models, schemas, crud

#from database import SessionLocal, engine
#import models, schemas, crud

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)

class Tok:
    access_token: str
    token_type: str


token1 = Tok()
token1.access_token = ""
token1.token_type = "Bearer"

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_access_token():
    return token1

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/login", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email_address}, expires_delta=access_token_expires
    )
    token1.access_token = access_token
    return {"access_token": access_token, "token_type": "bearer"}

#User
#async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
async def get_current_user(token = Depends(get_access_token), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token.access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except PyJWTError:
        raise credentials_exception

    user = crud.get_user_by_email(db, token_data.username)
    if user is None:
        raise credentials_exception
    return user

@app.get("http://localhost:3000/register")
async def read_item(request: Request):
    return {"request": request }

@app.get("/user/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user

@app.get("/user/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/user/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email_address)
    if db_user:
        raise HTTPException(status_code=400, detail="Emali istnieje w bazie")
    return crud.create_user(db, user=user)

#Message
@app.post("/message/", response_model=schemas.Message)
def create_message_for_users(user_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db, message, user_id)


#Page
@app.post("/page/", response_model=schemas.Main_page)
def create_message_for_users(user_id: int, page: schemas.Main_pageCreate, db: Session = Depends(get_db)):
    return crud.create_user_page(db, page, user_id)


#Photos
@app.post("/photos/", response_model=schemas.Photos)
def create_photos(page_id: int, content_id: int, cont_list: bool, photos: schemas.PhotosCreate, db: Session = Depends(get_db)):
    return "aa"



# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)