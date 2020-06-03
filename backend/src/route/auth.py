from fastapi import Depends, Header,File, Body,Query, UploadFile, FastAPI, HTTPException, APIRouter, Request, Response, Form, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder
from fastapi_mail import FastMail

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
import smtplib

from ..database import SessionLocal, engine
from .. import schemas, models

from ..auth import(
    create_user,
    authenticate_user,
    get_user_by_email,
    verify_token,
    create_access_token,
    save_access_token,
    delete_access_token,
    CookieVerificationError
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

auth_route = APIRouter()

html = """
<html> 
<body>
<p>Hi This test mail
<br>Thanks for using Fastapi-mail</p> 
</body> 
</html>
"""

template = """
<html> 
<body>
<p>Hi Please confirm your registration.
<br> To log in please click the link below.
<br> <a href="http://localhost:3000/login">Login!</a>
<br>Thank you.</p> 
</body> 
</html>
"""

@auth_route.post("/api/v1/register")
async def register_user(user: schemas.UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> models.User:
    if user.password != user.repassword:
        raise HTTPException(status_code=400, detail="Passwords don't match.")
    db_user = get_user_by_email(db, email=user.email_address)
    g_mail = "photographers.portfolio2020@gmail.com"
    g_pass = "Zdjecia1234"
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    us = create_user(db, user)
    #us.user_token = jsonable_encoder(create_access_token(data={"sub": us.email_address}))
    save_access_token(db, us)
    response = Response(status_code=200)
    response.set_cookie(
        key="username",
        value=us.email_address
    )
    mail = FastMail(email=g_mail,password=g_pass,tls=True,port="587",service="gmail")
    background_tasks.add_task(mail.send_message, recipient=us.email_address,subject="Confirm your registration.",body=template,text_format="html")
    return us


@auth_route.post("/api/v1/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Response:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user.user_token = jsonable_encoder(create_access_token(data={"sub": user.email_address}))
    save_access_token(db, user)

    response = Response(status_code=200)
    response.set_cookie(
        key="username",
        value=form_data.username
    )
    return response

@auth_route.get("/api/v1/get-access-token")
async def get_access_token(requests: Request, db: Session = Depends(get_db)) -> Response:
    try:
        username = requests.cookies["username"]
        verify_token(db, username)
        response = Response()
        response.set_cookie(
            key="username",
            value=username 
        )
        return response
    except CookieVerificationError:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST)

@auth_route.get("/api/v1/logout")
async def logout_user(request: Request, db: Session = Depends(get_db)) -> Response:
    user_cookie = request.cookies["username"]
    delete_access_token(db, user_cookie)
    response = Response()
    response.delete_cookie(key="username")
    return response