import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Message, MessageBoard, db
from datetime import datetime

message_routes = Blueprint('message', __name__)


@message_routes.route('/', methods=['POST'])
def send_message():
    body = request.get_json()
    message_boards = MessageBoard.query.filter(MessageBoard.sellerId == body['sellerId']).filter(MessageBoard.potentialBuyerId == body['buyerId']).all()
    if len(message_boards) == 1:
        message_boards[0].title = body['itemSelected']
        db.session.add(Message(messageBoardId=message_boards[0].to_dict()['id'], authorId=body['authorId'], message=body['message'], createdAt=datetime.now()))
        db.session.commit()
        return {'messageBoardId': message_boards[0].to_dict()['id']}
    if len(message_boards) == 0:
        message_board = MessageBoard(sellerId=body['sellerId'], potentialBuyerId=body['buyerId'], title=body['itemSelected'])
        db.session.add(message_board)
        db.session.commit()
        db.session.add(Message(messageBoardId=message_board.id, authorId=body['authorId'], message=body['message'], createdAt=datetime.now()))
        db.session.commit()
        return {'messageBoardId': message_board.id}

@message_routes.route('/<int:messageId>', methods=['PUT'])
def update_message(messageId):
    body = request.get_json()
    message = Message.query.get(messageId)
    if body['message'] == '':
        Message.query.filter(Message.id == messageId).delete()
    else:
        message.message = body['message']

    db.session.commit()
    return {'message': 'success'}


@message_routes.route('/<int:messageId>', methods=['DELETE'])
def delete_message(messageId):
    Message.query.filter(Message.id == messageId).delete()
    db.session.commit()
    return {'message': 'success'}
