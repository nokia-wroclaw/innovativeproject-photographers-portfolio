from typing import List

from pydantic import BaseModel

#User
class UserBase(BaseModel):
    firt_name: str
    last_name: str
    email: str
    nickname: str = None
    additional_email: str = None
class UserCreate(UserBase):
    password: str
class User(UserBase):
    id: int 
    social_media = List[Social_media_links] = []
    msg = List[Message] = []
    pages = List[List] = []
class Config:
    orm_mode = True

#Social
class Social_media_linksBase(BaseModel):
    sm_url: str
    sm_icon: str
class Social_media_linksCreate(Social_media_linksBase):
    pass
class Social_media_links(Social_media_linksBase):
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
class MessageCreate(MessageBase):
    pass
class Message(MessageBase):
    id: int
    receiver_id: int
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
class Config:
    orm_mode = True

#Photos
class PhotosBase(BaseModel):
    path_and_name: str
    label_type: bool
class PhotosCreate(PhotosBase):
    pass
class Photos(PhotosBase):
    id: int
    page_id: int
class Config:
    orm_mode = True