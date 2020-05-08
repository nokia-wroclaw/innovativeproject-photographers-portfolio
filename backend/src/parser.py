from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, meta, exceptions
from inspect import getmembers, isfunction
from cgi import escape
import json
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

#     dummy_values = ['a', 'b', 'c']
#     values = {}
#     if bool(int(Request.form['dummy_value'])):
#         vars_to_fill = meta.find_undeclared_variables(jinja2_env.parse(Request.form['template']))

#         for v in vars_to_fill:
#             values[v] = choice(dummy_values)
#     else:
#         if Request.form['input_type'] == "json":
#             try:
#                 values = json.loads(Request.form['values'])
#             except ValueError as e:
#                 return "Value error in JSON: {0}".format(e)
#         # elif Request.form['input_type'] == "yaml":
#         #     return "Value error in YAML: {0}".format(e)
#         else:
#             return "Undefined input_type: {0}".format(Request.form['input_type'])

#     try:
#         rendered_jinja2_tpl = jinja2_tpl.render(values)
#     except (exceptions.TemplateRuntimeError, ValueError, TypeError) as e:
#         return "Error in your values input filed: {0}".format(e)

#     if bool(int(Request.form['showwhitespaces'])):
#         rendered_jinja2_tpl = rendered_jinja2_tpl.replace(' ', u'.')
#     return escape(rendered_jinja2_tpl).replace('\n', '<br />')

# if __name__ == "__main__":
#      import uvicorn
#      uvicorn.run(app, host="0.0.0.0", port=8000)