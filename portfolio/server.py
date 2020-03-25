from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from forms import ContactForm
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


@app.get("/contact")
async def contact(request: Request):
    form = ContactForm()
    if form.validate_on_submit():
        person = form.person.data
        form.person.data = ''
    return templates.TemplateResponse(
        'contact.html',{"request": request, "title":"Contact", "name":"Jan Kowalski", "form":form}
    )