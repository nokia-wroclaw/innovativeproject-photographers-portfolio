from sqlalchemy import update
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import models, schemas

#import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10


#User
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)    

def authenticate_user(portfolio_db: Session, username: str, password: str):
    user = get_user_by_email(portfolio_db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user    

def get_user_by_id(portfolio_db: Session, user_id: int):
    return portfolio_db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(portfolio_db: Session, email: str):
    return portfolio_db.query(models.User).filter(models.User.email_address == email).first()

def get_user_by_aemail(portfolio_db: Session, a_email: str):
    return portfolio_db.query(models.User).filter(models.User.additional_email == a_email).first()

def get_users(portfolio_db: Session, skip: int = 0, limit: int = 50):
    return portfolio_db.query(models.User).offset(skip).limit(limit).all()

def create_user(portfolio_db: Session, user: schemas.UserCreate):
    fake_hashed_password = get_password_hash(user.password)
    #portfolio_db_user = models.User(email_address=user.email , password=fake_hashed_password, )
    portfolio_db_user = models.User(email_address=user.email_address, first_name=user.first_name, last_name=user.last_name, nickname=user.nickname, additional_email=user.additional_email, password=fake_hashed_password)
    portfolio_db.add(portfolio_db_user)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_user)
    return portfolio_db_user

def save_user_token(portfolio_db: Session, user: models.User):
    portfolio_db.commit()
    portfolio_db.refresh(user)
    return user

def logout_user(portfolio_db: Session, email: str):
    user_object = get_user_by_email(portfolio_db, email)
    user_object.user_token = None
    portfolio_db.commit()
    portfolio_db.refresh(user_object)
    return user_object

# def verify_token(token)
#    credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )   
# try:
#     payload = jwt.decode(token.access_token, SECRET_KEY, algorithms=[ALGORITHM])
#     username: str = payload.get("sub")
#     user = get_user_by_email(username)
#     if user is None
#         raise credentials_exception
#     return user
# except PyJWTError:
#     raise credentials_exception


#Social
def get_user_sm_link(portfolio_db: Session, sm_link: str):
    return portfolio_db.query(models.Social_media_link).filter(models.Social_media_link.sm_url == sm_link).first()

#Message
def get_message_by_sender(portfolio_db: Session, sender_email: str):
    return portfolio_db.query(models.Message).filter(models.Message.sender_email_address == sender_email).first()

def get_status(portfolio_db: Session, status: str):
    return portfolio_db.query(models.Message).filter(models.Message.status == status).first()

def create_message(portfolio_db: Session, message: schemas.Message, user_id: int):
    portfolio_db_message = models.Message(**message.dict(), receiver_id = user_id)
    portfolio_db.add(portfolio_db_message)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_message)
    return portfolio_db_message

#Photos
def get_path_and_name(portfolio_db: Session, pan: str):
    return portfolio_db.query(models.Photos).filter(models.Photos.path_and_name == pan).first()


#Main_page
def create_user_page(portfolio_db: Session, page: schemas.Main_pageCreate, user_id: int):
    portfolio_db_page = models.Main_page(**page.dict(), photographer_id = user_id)
    portfolio_db.add(portfolio_db_page)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_page)
    return portfolio_db_page

