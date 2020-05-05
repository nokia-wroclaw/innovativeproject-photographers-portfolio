from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.route.auth import auth_route
import os
from src.database import SessionLocal, engine
from src import models
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_route)

@app.get("/")
async def root():
    return {"message": " Moze dziala"}


@app.post("/editor")
async def render(request: Request):
    template = Jinja2Templates({"request": Request})
    return template

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)