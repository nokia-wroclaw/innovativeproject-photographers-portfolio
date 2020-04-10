from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "USERS"

    id = Column(Integer, primary_key=True, index=True)

    email_address = Column(String(100), unique=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(100), nullable=False)
    nickname = Column(String(30))
    additional_email = Column(String(100), unique=True, nullable=False)
    password = Column(String(32), nullable=False)

    social_media = relationship("Social_media_link", back_populates="owner_of")
    msg = relationship("Message", back_populates="receiver")
    pages = relationship("Main_page", back_populates="photographer")

class Social_media_link(Base):
    __tablename__ = "SOCIAL_MEDIA_LINKS"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("USERS.id"))

    sm_url = Column(String)
    sm_icon = Column(String)

    owner_of = relationship("Users", back_populates="social_media")
    
class Message(Base):
    __tablename__ = "MESSAGE"

    id = Column(Integer, primary_key=True, index=True)
    receiver_id = Column(Integer, ForeignKey("USERS.id"))

    first_name = Column(String(50), nullable=False)
    last_name = Column(String(100), nullable=False)
    sender_email_address = Column(String(100), nullable=False, unique=True)
    subject = Column(String(50))
    message_content = Column(String(300))
    date = Column(DateTime, nullable=False)
    status = Column(String(30), nullable=False)

    receiver = relationship("Users", back_populates="msg")

class Main_page(Base):
    __tablename__ = "MAIN_PAGE"

    id = Column(Integer, primary_key=True, index=True)
    photographer_id = Column(Integer, ForeignKey("USERS.id"))

    page_url = Column(String(100), nullable=False, index=True)
    album_type = Column(String(100), nullable=False)

    photographer = relationship("Users", back_populates="pages")
    list_ofc = relationship("List_of_Contents", back_populates="m_page")
    photos = relationship("Photos", back_populates="m_page")

class List_of_Contents(Base):
    __tablename__ = "LIST_OF_CONTENTS"

    id = Column(Integer, primary_key=True)
    page_id  = Column(Integer, ForeignKey("MAIN_PAGE.id"))

    label_content = Column(String(100))
    is_subgroup_there = Column(Boolean, default=False)
 
    m_page = relationship("Main_page", back_populates="list_ofc")
    content = relationship("Contents", back_populates="list_ofc")

class Contents(Base):
    __tablename__ = "CONTENTS"

    id = Column(Integer, primary_key=True)
    list_id = Column(Integer, ForeignKey("LIST_OF_CONTENTS.id"))

    label_content = Column(String(100))
    list_ofc = relationship("List_of_Contents", back_populates="content")

class Photos(Base):
    __tablename__ = "PHOTOS"

    id = Column(Integer, primary_key=True)
    page_id  = Column(Integer, ForeignKey("MAIN_PAGE.id"))

    path_and_name = Column(String(100), unique=True, nullable=False)
    label_type = Column(Boolean, default=True) #CZY NA PEWNO BOOLEAN?

    m_page = relationship("Main_page", back_populates="photos")