from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from src.route.auth import auth_route
import os
from src.database import SessionLocal, engine
from src import models
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

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

# def generate_html_response():
#     with open("./user/files/index.html", "r") as myfile:
#         data = myfile.read().replace('\n', ' ')
#     return HTMLResponse(content = data, status_code=200)


@app.get("/api/v1/editor")
async def renderGET(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski"}
    )
# async def read_items():
#     return generate_html_response()

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)