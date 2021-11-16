from enum import unique

from flask.scaffold import F
from .db import db

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False, unique=False)
    sellerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    dateListed = db.Column(db.DateTime(), nullable=False)
    price = db.Column(db.Float, nullable=False)

    category = db.relationship('Category', back_populates='items')
    seller = db.relationship('User', back_populates='items')
