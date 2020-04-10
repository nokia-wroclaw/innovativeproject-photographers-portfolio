from sqlalchemy.orm import Session
from . import models, schemas

#User
def get_user_by_id(portfolio_db: Session, user_id: int):
    return portfolio_db.query(models.User).filter(models.User.id == user_id).first()
def get_user_by_email(portfolio_db: Session, email: str):
    return portfolio_db.query(models.User).filter(models.User.email_address == email).first()
def get_user_by_aemail(portfolio_db: Session, a_email: str):
    return portfolio_db.query(models.User).filter(models.User.additional_email == a_email).first()
def get_users(portfolio_db: Session, skip: int = 0, limit: int = 50):
    return portfolio_db.query(models.User).offset(skip).limit(limit).all()
def create_user(portfolio_db: Session. user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreally" #later have to transform it for OAuth2 with Password and hashing
    portfolio_db_user = models.User(email=user.email_address, password=fake_hashed_password)
    portfolio_db.add(portfolio_db_user)
    portfolio_db.commit()
    portfolio_db.refresh(portfolio_db_user)
    return portfolio_db_user

#Social
def get_user_sm_link(portfolio_db: Session, sm_link: str):
    return portfolio_db.query(models.Social_media_link).filter(models.Social_media_link.sm_url == sm_link).first()

#Message
def get_message_by_sender(portfolio_db: Session, sender_email: str)
    return portfolio_db.query(models.Message).filter(models.Message.sender_email_address == sender_email).first()
def get_status(portfolio_db: Session, status: str):
    return portfolio_db.query(models.Message).filter(models.Message.status == status).first()

#Photos
def get_path_and_name(portfolio_db: Session, pan: str):
    return portfolio_db.query(models.Photos).filter(models.Photos.path_and_name == pan).first()