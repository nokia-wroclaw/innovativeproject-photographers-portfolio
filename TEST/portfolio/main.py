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

from starlette.requests import Request
from starlette.responses import Response

from .database import SessionLocal, engine
from . import models, schemas, crud

#from database import SessionLocal, engine
#import models, schemas, crud

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

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


def create_access_token(*, data: dict, expires_delta: timedelta = None)->str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, crud.SECRET_KEY, algorithm=crud.ALGORITHM)
    return encoded_jwt        

@app.get("/")
async def read_item(request: Request):
    return templates.TemplateResponse("Register.html", {"request": request })

@app.get("/login")
async def read_item(request: Request):
    return templates.TemplateResponse("Login.html", {"request": request })


@app.post("/login", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db))-> Response:
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email_address}, expires_delta=access_token_expires
    )
    token1.access_token = access_token
    user.user_token = access_token
    crud.save_user_token(db, user)
    response = Response(status_code=200)

    response.set_cookie(
        key="username",
        value=form_data.username,
        expires=crud.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return response
    
@app.get("/logout")
async def logout(request: Request, db: Session = Depends(get_db)) -> Response:
    username_cookie = request.cookies["username"]
    response = Response()
    crud.logout_user(db, username_cookie)
    response.delete_cookie(key="username")
    return response

#User
#async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
async def get_current_user(token = Depends(get_access_token), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token.access_token, crud.SECRET_KEY, algorithms=[crud.ALGORITHM])
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

@app.post("/user/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email_address)
    if db_user:
        raise HTTPException(status_code=400, detail="Emali istnieje w bazie")
    return crud.create_user(db, user=user)       


#Photos
@app.post("/photos")
async def create_files(file: bytes = File(...)):
    return {"file_size": len(file)}

@app.post("/uploadphotos", response_model=schemas.Photos)
# def create_upload_photos(page_id: int, content_id: int, cont_list: bool, photos: schemas.PhotosCreate, db: Session = Depends(get_db),file: UploadFIle = File(...)):
def create_upload_photos(file: UploadFIle = File(...)):
 
    file_name = file.file_name
    with open("./portfolio/files/"+file_name, 'wb') as fn:
        fn.write(file.file.read())
    fn.close()
    return {"filename":file.filename}


# #Message
# @app.post("/message/", response_model=schemas.Message)
# def create_message_for_users(user_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
#     return crud.create_message(db, message, user_id) 


# #Page
# @app.post("/page/", response_model=schemas.Main_page)
# def create_page_for_users(user_id: int, page: schemas.Main_pageCreate, db: Session = Depends(get_db)):
#     return crud.create_user_page(db, page, user_id)     



# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)     