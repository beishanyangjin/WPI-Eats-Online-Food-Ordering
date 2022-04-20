import json
from typing import Union, Optional, List
from db import rwdb as db
from flask_login import UserMixin 
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash
from model.base import Page, Request
from datetime import datetime

class User(db.Model):
    __tablename__ = 'User'

    uid = db.Column(db.String, primary_key=True)
    username = db.Column(db.String)
    hashed_password = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    avatar = db.Column(db.String)
    user_type = db.Column(db.SmallInteger)
    token = db.Column(db.String)
    token_date = db.Column(db.String)

    # @property
    # def password(self):
    #     raise AttributeError('`password` is not a readable attribute')

    # @password.setter
    # def password(self, password):
    #     self.hashed_password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.hashed_password, password)



class RegisterRequest(BaseModel):
    email: str
    password: str

