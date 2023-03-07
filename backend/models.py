from bson import ObjectId
from pydantic import BaseModel, Field, Required


class MyObjectId(ObjectId):
    """ Deal with mongodb _id: ObjectId """
    # pydantic model assume filed start with _ as hidden field, can't get field directly, so need an alias.
    # rewrite pydantic BaseModel method to achieve a validator for ObjectId type when get/set field.
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        # insert an object already has _id field
        field_schema.update(type='string')


class CarBase(BaseModel):
    id: MyObjectId = Field(default_factory=MyObjectId, alias='_id')
    # brand: str | None = None
    # brand: Optional[str]
    brand: str = Field(..., title="brand", description="description of brand", min_length=2)
    make: str = Field(Required)
    year: int
    price: int
    km: int
    cm3: int

    # ObjectId => str when get mongodb _id column
    class Config:
        # allow_population_by_field_name = True
        # arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CarSave(CarBase):
    pass


class CarUpdate(BaseModel):
    # for receive request json body, str
    price: int | None


