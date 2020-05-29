from typing import List
from datetime import date, datetime, time, timedelta
from pydantic import BaseModel


#Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str = None


#Social
class Social_media_linkBase(BaseModel):
    sm_url: str
    sm_icon: str
class Social_media_link(Social_media_linkBase):
    id: int
    owner_id: int
    class Config:
        orm_mode = True

#Message
class MessageBase(BaseModel):
    first_name: str
    last_name: str
    sender_email_address: str
    subject: str
    message_content: str
    date: date
class MessageCreate(MessageBase):
    pass
class Message(MessageBase):
    id: int    
    receiver_id: int
    status: str
    class Config:
        orm_mode = True

#Photos
class PhotosBase(BaseModel):
    path_and_name: str   
class PhotosCreate(PhotosBase):
    pass
class Photos(PhotosBase):
    id: int
    page_id: int
    list_content: bool
    id_list_content: int = None
    id_content: int = None
    class Config:
        orm_mode = True

#List_of_contents
class List_of_contentsBase(BaseModel):
    first_name: str
    last_name: str
    sender_email_address: str
    subject: str
    message_content: str
    date: datetime = None
class List_of_contentsCreate(List_of_contentsBase):
    pass
class List_of_contents(List_of_contentsBase):
    id: int
    page_id: int
    photos: List[Photos] = []
    class Config:
        orm_mode = True

#Contents
class ContentsBase(BaseModel):
    label_content: str
class ContentsCreate(ContentsBase):
    pass
class Contents(ContentsBase):
    id: int
    list_id: int
    photos: List[Photos] = []
    class Config:
        orm_mode = True

#Main_page
class Main_pageBase(BaseModel):
    page_url: str
    album_type: str
class Main_pageCreate(Main_pageBase):
    pass
class Main_page(Main_pageBase):
    id: int
    photographer_id: int
    photos: List[Photos] = []
    content_list: List[List_of_contents] = []
    class Config:
        orm_mode = True

#User
class UserBase(BaseModel):
    email_address: str
class UserCreate(UserBase):
    first_name: str
    last_name: str
    nickname: str = None
    additional_email: str = None
    password: str
    repassword: str
class User(UserBase):
    id: int 
    user_token: str = None
    social_media: List[Social_media_link] = []
    msg: List[Message] = []
    pages: List[Main_page] = [] 
    class Config:
        orm_mode = True

