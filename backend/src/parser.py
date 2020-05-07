from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, meta, exceptions
from inspect import getmembers, isfunction
from cgi import escape
import json
import yaml
import logging
import logging.handlers


app = FastAPI()

def gunwo():
    import jinja2.filters