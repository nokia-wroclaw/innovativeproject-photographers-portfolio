from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.route.auth import auth_route

from src.database import SessionLocal, engine
from src import models

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

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)