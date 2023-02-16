import uvicorn
from dotenv import load_dotenv, dotenv_values
from pymongo import MongoClient
from fastapi import FastAPI, Request, Body, status
from fastapi.middleware.cors import CORSMiddleware

from routers.cars import router as cars_router


config = dotenv_values('.env')
origins = [
    'http://localhost',
    'http://localhost:3000',
]

app = FastAPI()

# not elegant verses django.  I don't like .env file
app.add_middleware(
    CORSMiddleware,
    allow_origin=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event('startup')
def start_db_client():
    app.mongo_client = MongoClient(config['DB_URL'])
    # usage: request.app.db['collection_name'].find(query).sort()
    app.db = app.mongo_client.get_database(config['DB_NAME'])


@app.on_event('shutdown')
def shutdown_db_client():
    app.mongo_client.close()


app.include_router(cars_router, prefix="/cars", tags=["cars"])


if __name__ == '__main__':
    uvicorn.run(app="app:app", reload=True, port=8000, log_level='debug')
