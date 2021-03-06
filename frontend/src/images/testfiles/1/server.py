from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    pics = os.listdir("static/img/jan/")
    return templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski", "pics": pics}
    )

@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse(
        "about.html", {"request": request, "title": "About", "name": "Jan Kowalski"}
    )

@app.get("/contact")
async def contact(request: Request):
    return templates.TemplateResponse(
        "contact.html", {"request": request, "title":"Contact", "name":"Jan Kowalski"}
    )

@app.post("/contact")
async def postContact(*, cfname: str = Form(...), clname: str = Form(...), cmail: str = Form(...), ctitle: str = Form(...), cbody: str = Form(...)):
    return { "cfname": cfname, "clname": clname, "cmail": cmail, "ctitle": ctitle, "cbody": cbody}