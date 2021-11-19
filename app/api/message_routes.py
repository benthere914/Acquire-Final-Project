import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, MessageBoard
from datetime import date

message_routes = Blueprint('message', __name__)


@message_routes.route('/')
def send_message():
    body = request.get_json()
    print(body)
    return {'message': 'got here'}
