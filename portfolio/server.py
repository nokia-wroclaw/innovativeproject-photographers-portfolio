from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="portfolio/static"), name="static")
templates = Jinja2Templates(directory="portfolio/templates")


@app.get("/")
async def home(request: Request):
    pics = os.listdir("portfolio/static/img/jan/")
    return templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski", "pics": pics}
    )


@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse(
        "about.html", {"request": request, "title": "About", "name": "Jan Kowalski"}
    )

@app.get("/login")
async def sign_in(request: Request):
    return templates.TemplateResponse(
        "login.html", {"request": request, "title": "Login"}
    )

@app.get("/register")
async def sign_up(request: Request):
    return templates.TemplateResponse(
        "register.html", {"request": request, "title": "Register"}
    )

@app.post("/register")
async def create_user(*, fname: str = Form(...), lname: str = Form(...), email: str = Form(...)):
    return {"fname": fname, "lname": lname, "email": email}