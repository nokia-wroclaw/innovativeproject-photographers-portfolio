from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from src.route.auth import auth_route
import os
from src.database import SessionLocal, engine
from src import models
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()
templates = Jinja2Templates(directory='./user/files/')

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

@app.post("/api/v1/editor")
async def renderPOST(userInput:str = Form(...)):
    file = open(os.path.join('./user/files','index.html'), 'w')
    file.write(userInput)
    file.close()
    return{ "index.html"}


@app.get("/api/v1/editor")
async def renderGET(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski"}
    )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)