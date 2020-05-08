from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, meta, exceptions
from inspect import getmembers, isfunction
# from cgi import escape
import json
import yaml
import logging
import logging.handlers


app = FastAPI()
templates = Jinja2Templates(directory="./user/files")

# w sumie przepisany kod, niekoniecznie zmieniony
def get_custom_filters():
    import jinja2.filters
    custom_filter = {}
    for m in getmembers(jinja2.filters):
        if m[0].startswith('filter_') and isfunction(m[1]):
            filer_name = m[0][7:]
            custom_filter[filer_name] = m[1]
    return custom_filter

@app.get("/")
async def home(request):
    return templates.TemplateResponse('index.html', custom_filter=get_custom_filters())

@app.post("/convert")
async def convert():
# async def convert(request: Request):
    jinja2_env = Environment()

     #load custom filters
    custom_filter = get_custom_filters()
    jinja2_env.filters.update(custom_filter)

#     #load the template
    try:
        jinja2_env = jinja2_env.from_string(Request.form['template']) #error: object is not subscriptable
    except (exceptions.TemplateSyntaxError, exceptions.TemplateError) as e:
        return "Syntax error in jinja2 template: {0}".format(e)
