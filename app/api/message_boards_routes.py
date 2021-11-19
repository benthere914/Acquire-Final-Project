import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, MessageBoard, db
from datetime import datetime

message_boards_routes = Blueprint('message_boards', __name__)


@message_boards_routes.route('/<int:message_board_id>/messages',)
def load_messages(message_board_id):
    return {'message': message_board_id}
