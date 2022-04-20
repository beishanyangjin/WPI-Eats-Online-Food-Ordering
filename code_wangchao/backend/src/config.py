import os

SECRET_KEY = os.urandom(32)

basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

db_host = 'localhost'
db_username = 'admin'
db_pass = 'password'
db_name = 'app'
db_port = 3306
db_timeout = '3s'
db_write_timeout = '3s'
db_read_timeout = '3s'
db_max_life_time = '3s'
db_max_idle = 5 
db_max_conn = 100

db_uri_pattern = "mysql+pymysql://%s:%s@%s:%d/%s?charset=UTF8MB4"
db_uri = db_uri_pattern % (db_username, db_pass, db_host, db_port, db_name)

# print('db config: %s' % db_uri)
