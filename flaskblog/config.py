import os


class Config:
    SECRET_KEY = '1234567890'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'flask6564@gmail.com'
    MAIL_PASSWORD = 'flask#blog'
