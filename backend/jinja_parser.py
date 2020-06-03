from fastapi import FastAPI
from starlette.requests import Request
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from jinja2 import Environment, FileSystemLoader, PackageLoader, select_autoescape



@app.get("/api/v1/editor")
async def get_string(request: Request)->str:
    env = Environment(
    autoescape=select_autoescape(enabled_extensions='html', default_for_string=True),
    loader = PackageLoader('package', 'templates'),
    lstrip_blocks=True
    )
    template = env.from_string("{{foo.items()|list}}")
    return  template