import os
import sys
from functools import wraps 
from model.http import HttpResponse
from db import user_dao
from datetime import datetime, timedelta


dname = os.path.dirname(__file__)
sys.path.append(os.path.dirname(dname))



def verify_token(uid: str, token: str):
    if '' == token:
        print("token is invalid")
        return None, HttpResponse(error="token is invalid")
    user = user_dao.get_user_by_uid(uid)
    if not user:
        print('user does not exist.')
        return None, HttpResponse(error="user does not exist")
    if '' == user.token:
        print("user not login")
        return None, HttpResponse(error="user not login")
    if token != user.token or '' == user.token_date:
        return None, HttpResponse(error="token is invalid")
    expire_time = user.token_date + timedelta(7)
    print('token expire date: ', expire_time) 
    tn = datetime.now()
    if tn > expire_time:
        return None, HttpResponse(error="token expired, please login")
    return user, None

