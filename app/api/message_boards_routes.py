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
        for message in messages:
            messages[message]['author'] = User.query.get(messages[message]['authorId']).to_dict()
        return jsonify(messages)
    else:
        return {'message': 'invalid request'}

@message_boards_routes.route('/<int:message_board_id>', methods=['Delete'])
@login_required
def delete_message_board(message_board_id):
    messages = Message.query.filter(Message.messageBoardId == message_board_id).delete()
    message_board = MessageBoard.query.filter(MessageBoard.id == message_board_id).delete()
    db.session.commit()
    return jsonify({'message': 'success'})

@message_boards_routes.route('/<int:message_board_id>', methods=['PUT'])
@login_required
def update_message_board(message_board_id):
    body = request.get_json()
    if 0 < len(body['title']) < 50 :
        message_board = MessageBoard.query.get(message_board_id)
        message_board.title = body['title']
        db.session.commit()
        return jsonify({'message': 'success'})
    else:
        return {'bad message': 'bad message'}, 401
