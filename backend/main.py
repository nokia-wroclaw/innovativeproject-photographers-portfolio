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


@app.get("/editor")
async def home(request: Request):
    pics = os.listdir("static/img/jan/")
    page = templates.TemplateResponse(
        "index.html", {"request": request, "name": "Jan Kowalski", "pics": pics}
    )
    return page

@app.post("/contact")

    async def heal(self, username: str) -> None:
        logging.info("%s is healing.", username)
        player = self.players_data[username]
        player.heals += 1
        player.endgame_time += (
            10 + len(self.usernames) * randint(1, player.level) / 2  # nosec
        )
        await self.players[username].send_json(
            {"code": "heal", "time_left": self.get_time_left(username)}
        )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)