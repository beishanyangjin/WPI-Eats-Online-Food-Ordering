from pydantic import BaseModel

class Request(BaseModel):
    uid: str
    token: str


class Page(BaseModel):
    page: int = 0
    page_size: int = 10
