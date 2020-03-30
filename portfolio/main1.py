from fastapi import FastAPI, Form, Body
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from pydantic import BaseModel

class User(BaseModel):
    imie: str
    nazwisko: str
    email: str

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_item(request: Request):
    return templates.TemplateResponse("item.html", {"request": request })

#@app.post("/user/")
#async def login(username: User):
#    return username

@app.post("/user/")    
async def login(*, imie: str = Form(...), nazwisko: str = Form(...), email: str = Form(...)):
    return {"imie": imie, "   nazwisko": nazwisko, "   email":email}
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)