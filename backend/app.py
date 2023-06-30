import uvicorn
from pymongo import MongoClient
from fastapi import FastAPI, Request, Body, status
from fastapi.middleware.cors import CORSMiddleware
from config import MONGO

from routers.cars import router as cars_router


app = FastAPI()

# Router first level registration
app.include_router(cars_router, prefix="/cars", tags=["cars"])

# CORS
# https://www.w3cschool.cn/fastapi/fastapi-1ewy3ld2.html
origins = [
    'http://0.0.0.0',
    'http://0.0.0.0:3000',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# database connection handler.  haven't found a connection pool solution
@app.on_event('startup')
def start_db_client():
    app.mongo_client = MongoClient(f"mongodb://{MONGO['HOST']}:{MONGO['PORT']}/{MONGO['DBNAME']}")
    # usage: request.app.db['collection_name'].find(query).sort()
    app.db = app.mongo_client.get_database(MONGO['DBNAME'])


@app.on_event('shutdown')
def shutdown_db_client():
    app.mongo_client.close()



if __name__ == '__main__':
    # terminal> uvicorn app:app --host 0.0.0.0 --port 8000 --log-level=debug
    # testing server
    uvicorn.run(app="app:app", reload=True, host='127.0.0.1', port=8000, log_level='debug')
