from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql://avnadmin:AVNS_myh4KEHQDIUsSCYtKUu@pmf-alumni-db-pmf-alumni.j.aivencloud.com:23186/defaultdb?sslmode=require"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
