import sys
import os
import uuid
from pydantic import BaseModel
from flask import url_for, request, Response 
from model.user import RegisterRequest     
from model.http import HttpResponse
from model.base import Page, Request
from flask_sqlalchemy import SQLAlchemy 
from flask_login import login_user, LoginManager, login_required
from flask_pydantic import validate
from werkzeug.security import generate_password_hash, check_password_hash
from db import user_dao
from datetime import datetime, timedelta
from controller import verify_token


@validate()
def register(body: RegisterRequest):
    try:
        if body.password != body.confirm_password: 
            return HttpResponse(error="confirmed password is not correct.")

        if user_dao.get_user_by_email(body.email):
            return HttpResponse(error="Email already exists.")
        
        return HttpResponse(code=200, error='success', data=data) 
    except Exception as e:
        print('\n xxx server error: ', e)
        return HttpResponse(code=500, error="Server Error.")



