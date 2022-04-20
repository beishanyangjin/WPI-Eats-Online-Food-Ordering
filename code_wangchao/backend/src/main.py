from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from routers.user import router_user
import config 
from db import rwdb as db
from model.user import User

def after_request(response):
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers['Content-Type'] = 'application/json'
    return response

def create_app():
    app = Flask(__name__)
    app.after_request(after_request)
    app.config['SECRET_KEY'] = config.SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = config.db_uri 
    app.config['SQLALCHEMY_ECHO'] = True
    # app.config.from_object('config')
    db.init_app(app)

    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.register_blueprint(router_user, url_prefix='/user')


    return app 


app = create_app() 

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=config.DEBUG)
