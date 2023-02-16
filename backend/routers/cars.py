from typing import List, Optional
from pydantic import Required
from fastapi import APIRouter, Request, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from bson.json_util import dumps, ObjectId
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
@router.get("/", description="List all cars", response_description="response_description")
async def list_cars(request: Request,
                    min_price: int = 0,
                    max_price: int = 100000,
                    # Optional is depreciated  https://fastapi.tiangolo.com/python-types/?h=optional#using-union-or-optional
                    # brand: Optional[str] = None
                    brand: str | None = None,
                    page: int = 1,
                    ) -> List[CarSave]:
    PER_PAGE = 25
    skip = (page-1)*PER_PAGE

    query = {'price': {'$lt': max_price, '$gt': min_price}}
    if brand:
        query['brand'] = brand

    full_query = request.app.db['cars'].find(query).sort('_id', 1).skip(skip).limit(PER_PAGE)
    # for car in full_query:
    #     print(car)
    results = [CarSave(**car) for car in full_query]
    return results


@router.post("/", description="Add a new car")
async def create_car(request: Request, car: CarBase = Body(...)):
    car = jsonable_encoder(car)
    new_car = request.app.db['cars'].insert_one(car)
    created_car = request.app.db['cars'].find_one(
        {'_id': new_car.inserted_id}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=dumps(created_car))


# replace put, partially update patch
# str(ObjectId('58c8979e0da3ef6363ccb8de'))
@router.patch("/{_id}",
              description="Update car price")
def update_car(_id: str,
               request: Request,
               # Body() https://stackoverflow.com/questions/56996170/what-is-body-from-fastapi-import-body
               car: CarUpdate = Body(...)
               ):
    # db.collection.update(<filter>, <update>, <options>)         exclude_unset {id:'abc', price:None} -> {'id':'abc'}
    request.app.mongodb['cars'].update_one({'_id': _id}, {'$set': car.dict(exclude_unset=True)})
    if car := request.app.db['cars'].find_one({'_id': _id}):
        return CarBase(**car)
    else:
        raise HTTPException(status_code=404, detail=f"Car with {_id} not found")


@router.delete('/{id}', description="delete a car")
def delete_car(id: str, request: Request):
    deleted_result = request.app.db['cars'].delete_one({'_id': id})
    if deleted_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail=f"Car with {id} not found")