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

@app.post("/files")
async def create_files(file: bytes = File(...)):
    return{ "file_size": len(file)}

@app.post("/uploadfiles")
async def create_upload_files(file: UploadFile = File(...)):
    filen = file.filename
    with open("./user/files/"+ filen, 'wb') as f:
        f.write(file.file.read())
        f.close
    return{ "filename": file.filename}

templates = Jinja2Templates(directory='./user/files/')

@app.get("/editor")
async def redner(filename, request: Request):
    return templates.TemplateResponse(
        filename, {"request": request, "name": "Jan Kowalski"}
    )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)