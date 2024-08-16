import psycopg2
import logging
from config import DATABASE

try:
    connection = psycopg2.connect(**DATABASE)
    cursor = connection.cursor()
except Exception as e:
    logging.error("Database connection failed: %s", e)
    raise Exception("Database connection failed")
