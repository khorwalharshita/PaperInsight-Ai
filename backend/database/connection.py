from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://paperuser:PaperInsight2026@localhost:3306/paperinsight"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

try:
    connection = engine.connect()
    print("MySQL connected successfully!")
    connection.close()
except Exception as e:
    print("MySQL connection failed:", e)