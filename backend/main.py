from fastapi import FastAPI, Request, File, UploadFile
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
async def render(text:str):
    file = open(os.path.join('./user/files','index.html'), 'w')
    file.write(text)
    file.close()
    return{ "index.html"}

templates = Jinja2Templates(directory='./user/files/')

@app.get("/editor")
async def redner(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski"}
    )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)