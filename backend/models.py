from pydantic import BaseModel, Field, Required


class CarBase(BaseModel):
    # brand: str | None = None
    # brand: Optional[str]
    brand: str = Field(Required, title="brand", description="description of brand", min_length=3)
    make: str = Field(Required)
    year: int
    price: int
    km: int
    cm3: int


class CarSave(BaseModel):
    pass


class CarUpdate(BaseModel):
    price: int | None