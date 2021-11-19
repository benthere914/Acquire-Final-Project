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
        db.session.add(Message(messageBoardId=message_boards[0].to_dict()['id'], authorId=body['authorId'], message=body['message'], createdAt=datetime.now()))
        db.session.commit()
        return {'messageBoardId': message_boards[0].to_dict()['id']}
    if len(message_boards) == 0:
        message_board = MessageBoard(sellerId=body['sellerId'], potentialBuyerId=body['buyerId'])
        db.session.add(message_board)
        db.session.commit()
        db.session.add(Message(messageBoardId=message_board.id, authorId=body['authorId'], message=body['message'], createdAt=datetime.now()))
        db.session.commit()
        return {'messageBoardId': message_board.id}
