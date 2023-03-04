import uvicorn
from dotenv import load_dotenv, dotenv_values
from pymongo import MongoClient
from fastapi import FastAPI, Request, Body, status
from fastapi.middleware.cors import CORSMiddleware

from routers.cars import router as cars_router


app = FastAPI()

# Router first level registration
app.include_router(cars_router, prefix="/cars", tags=["cars"])

# Load config. not elegant verses django.  I don't like .env file
config = dotenv_values('.env')
# CORS
origins = [
    'http://localhost',
    'http://localhost:3000',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# database connection handler.  haven't found a connection pool solution
@app.on_event('startup')
def start_db_client():
    app.mongo_client = MongoClient(config['DB_URL'])
    # usage: request.app.db['collection_name'].find(query).sort()
    app.db = app.mongo_client.get_database(config['DB_NAME'])


@app.on_event('shutdown')
def shutdown_db_client():
    app.mongo_client.close()



if __name__ == '__main__':
    # testing server
    uvicorn.run(app="app:app", reload=True, port=8000, log_level='debug')
