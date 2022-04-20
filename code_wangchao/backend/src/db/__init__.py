from sqlalchemy.orm import sessionmaker, scoped_session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from threading import Thread
import config 

import os
import sys


dname = os.path.dirname(__file__)
sys.path.append(os.path.dirname(dname))


rwdb = SQLAlchemy()

# engine = create_engine(
#     config.db_uri,
#     max_overflow=0,
#     pool_size=config.db_max_conn,
#     pool_timeout=config.db_timeout,
#     pool_recycle=-1,
#     echo=config.DEBUG
# )
# 
# SessionFactory = sessionmaker(bind=engine)
# session = scoped_session(SessionFactory)
