from fastapi import FastAPI
from starlette.requests import Request
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from jinja2 import Environment, FileSystemLoader, PackageLoader, select_autoescape

env = Environment(
    autoescape=select_autoescape(enabled_extensions='html', default_for_string=True),
    loader = PackageLoader('package', 'templates')
)

templates = Jinja2Templates(directory="templates")

return templates.TemplateResponse("index.html", {"request": request})

env.from_string()

async def get_string(request:Request)-> str:
    return templates.TemplateResponse("index.html")






# app.mount("/static", StaticFiles(directory="static"), name="static")

# templates = Jinja2Templates(directory="templates")

# @app.get("/item/{id}")
# async def item_read(request: Request, id: str):
#     return templates.TemplateResponse("item.html", {"request": request, "id": id})