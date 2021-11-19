import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, MessageBoard, db
from datetime import datetime

message_boards_routes = Blueprint('message_boards', __name__)


@message_boards_routes.route('/<int:message_board_id>/messages',)
@login_required
def load_messages(message_board_id):
    if any(MessageBoard.query.filter(message_board_id == message_board_id).all()):
        messages = {message.to_dict()['id']: message.to_dict() for message in Message.query.filter(Message.messageBoardId == message_board_id)}
        return jsonify(messages)
    else:
        return {'message': 'invalid request'}
