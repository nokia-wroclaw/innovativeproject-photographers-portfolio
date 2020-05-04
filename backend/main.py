from fastapi import FastAPI
from src.route.auth import auth_route

from src.database import SessionLocal, engine
from src import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_route)

@app.get("/")
async def root():
    return {"message": " Moze dziala"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)