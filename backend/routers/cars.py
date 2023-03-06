from typing import List, Optional, Any
from pydantic import Required
from fastapi import APIRouter, Request, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from bson.json_util import dumps as bson_dumps, ObjectId
from models import CarBase, CarSave, CarUpdate


router = APIRouter()

# Alternative to deal with mongo ObjectId, but this approach is counterintuitive and Field(_id) is beta functionality.
# https://docs.pydantic.dev/usage/models/#field-with-dynamic-default-value
# from bson import ObjectId
# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate
#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid objectid")
#         return ObjectId(v)
#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")
# class MongoBaseModel(BaseModel):
#     id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
#     class Config:
#         json_encoders = {ObjectId: str}



# https://restfulapi.net/resource-naming/   I often entangle with naming before, it's right now with the conventions..
@router.get('/', description="List all cars", response_description="response_description")
async def list_cars(request: Request,
                    min_price: int = 0,
                    max_price: int = 100000,
                    # Optional is depreciated  https://fastapi.tiangolo.com/python-types/?h=optional#using-union-or-optional
                    # brand: Optional[str] = None
                    brand: str | None = '',
                    page: int = 1,
                    page_size: int = 20,
                    ) -> List[CarSave]:
    skip = (page-1)*page_size

    query = {'price': {'$lt': max_price, '$gt': min_price}}
    if brand:
        query['brand'] = brand

    full_query = request.app.db['cars'].find(query).sort([('_id', -1), ('year', -1), ]).skip(skip).limit(page_size)
    # return [CarBase(**{'_id':'63d115eeb38f6b8206acf9df', 'brand': 'Fiat', 'make': 'Doblo', 'year': 2016, 'price': 7300,
    #      'km': 134000, 'cm3': 1248})]
    results = [CarSave(**car) for car in full_query]
    return results


@router.get('/{id}', description="Get a car")
async def get_car(id: str,
                  request: Request
                  ):
    query = {'_id': ObjectId(id)}
    car = request.app.db['cars'].find_one(query)
    if car:
        return CarBase(**car)
    else:
        raise HTTPException(status_code=404, detail=f'can not find car {id}')


@router.post('/', description="Add a new car")
async def create_car(request: Request, car: CarBase = Body(...)):
    car = jsonable_encoder(car)
    car['_id'] = ObjectId(car['_id'])
    new_car = request.app.db['cars'].insert_one(car)
    created_car = request.app.db['cars'].find_one(
        {'_id': new_car.inserted_id}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=bson_dumps(created_car))


# replace put, partially update patch
# str(ObjectId('58c8979e0da3ef6363ccb8de'))
@router.patch('/{id}',
              description="Update car price")
def update_car(id: str,
               request: Request,
               # Body() https://stackoverflow.com/questions/56996170/what-is-body-from-fastapi-import-body
               # https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request-when-sending-json-data
               car: CarUpdate = Body(...)
               ):
    # db.collection.update(<filter>, <update>, <options>)         exclude_unset {id:'abc', price:None} -> {'id':'abc'}
    request.app.db['cars'].update_one({'_id': ObjectId(id)}, {'$set': car.dict(exclude_unset=True)})
    if car := request.app.db['cars'].find_one({'_id': ObjectId(id)}):
        return CarBase(**car)
    else:
        raise HTTPException(status_code=404, detail=f'Car with {id} not found')


@router.delete('/{id}', description="delete a car")
def delete_car(id: str, request: Request):
    deleted_result = request.app.db['cars'].delete_one({'_id': ObjectId(id)})
    if deleted_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content=None)
    else:
        raise HTTPException(status_code=404, detail=f'Car with {id} not found')