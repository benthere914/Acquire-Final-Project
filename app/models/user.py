from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    icon = db.Column(db.Text, nullable=False)
    
    items = db.relationship('Item', back_populates='seller')
    message_boards_ = db.relationship('MessageBoard', foreign_keys='MessageBoard.potentialBuyerId', back_populates='buyer')
    message_boards = db.relationship('MessageBoard',foreign_keys='MessageBoard.sellerId' , back_populates='seller')
    messages = db.relationship('Message', back_populates='author')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'icon': self.icon
        }
