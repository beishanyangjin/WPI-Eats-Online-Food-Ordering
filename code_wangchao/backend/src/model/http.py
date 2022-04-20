import json
from json import JSONEncoder
from pydantic import BaseModel
from typing import Optional, List, Union


class Request(BaseModel):
    uid: str
    token: str



class HttpResponse(BaseModel):
    code: int = 400 
    error: str
    data: Union[BaseModel, List[BaseModel]] = None 
