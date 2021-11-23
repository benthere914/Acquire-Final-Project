from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, MessageBoard, db, Category
from datetime import datetime

options_routes = Blueprint('options', __name__)


@options_routes.route('',)
def load_options():
    return {'options': [option.to_dict()['name'] for option in Category.query.all()]}
