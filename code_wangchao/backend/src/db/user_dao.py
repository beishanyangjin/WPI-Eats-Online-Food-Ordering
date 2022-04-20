from pydantic import PathNotExistsError
from sqlalchemy.dialects.mysql import insert as insertD
from sqlalchemy import update, insert, delete, text, and_, or_ 
from model.user import User
from . import rwdb
from datetime import datetime

def get_user_by_email(email: str):
    return User.query.filter_by(email=email).first()



