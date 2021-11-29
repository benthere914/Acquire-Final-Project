from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Item, ItemPhoto, db, MessageBoard, Message
import re
from sqlalchemy import or_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    if id:
        user = User.query.get(id)
        return user.to_dict()

@user_routes.route('/<int:id>/items')
def user_items(id):
    if id:
        items = Item.query.filter(Item.sellerId == id).all()
        output = {}
        for item in items:
            temp = item.to_dict()
            temp['photos'] = [photo.to_dict() for photo in item.item_photos]
            output[temp['id']] = (temp)
        return jsonify(output)



@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def update_data(userId):
    body = request.get_json()
    password = data = 'good'
    user = User.query.get(userId)
    emailRegex = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
    passwordRegex = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'



    if (not 'password' in body):
        password = 'must enter password'

    if (not( ('username' in body and len(body['username']) > 0) or ('email' in body and len(body['email']) > 0) or ('newPassword' in body and len(body['newPassword']) > 0) or ('newIcon' in body and len(body['newIcon']) > 0))):
        data = 'must fill out all fields'

    if (not user.check_password(body['password'])):
        password = 'Invalid password'

    if (user.username == 'Demo' or user.username == 'demo'):
        password = 'Cannot edit this user'
        data = 'Cannot edit this user'
    if 'username' in body:
        if any(User.query.filter(User.username == body['username']).all()):
                data = 'Username taken'
    if ('email' in body):
        if any(User.query.filter(User.email == body['email']).all()):
                data = 'Email taken'
        elif not bool(re.search(emailRegex, body["email"])):
            data = 'invalid email'

    if ('newPassword' in body):
        if not bool(re.search(passwordRegex, body["newPassword"])):
            data = 'new password must contain at least 8 characters, 1 letter, number and special character'

    if 'good' == password == data:

        if ('username' in body):
            user.username = body['username']

        if ('email' in body):
            user.email = body['email']

        if ('newPassword' in body):
            user.password = body['newPassword']

        if ('newIcon' in body):
            user.icon = body['newIcon']

        # db.session.add(user)
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': True, 'errorData': {'password': password, 'data': data}}


@user_routes.route('/<int:userId>', methods=['DELETE'])
@login_required
def delete_user(userId):
    user = User.query.get(userId)
    if (user.username == 'Demo' or user.username == 'demo'):
        return {"message": "Cannot delete this user"}
    body = request.get_json()
    items = [item.to_dict() for item in Item.query.filter(Item.sellerId == user.id).all()]
    for item in items:
        ItemPhoto.query.filter(ItemPhoto.itemId == item['id']).delete()
    Item.query.filter(Item.sellerId == user.id).delete()


    if (user.check_password(body["password"])):
        db.session.delete(user)
        db.session.commit()
        return {"message":"Success"}
    else:
        return {"message":"Incorrect Password"}


@user_routes.route('/<int:userId>/buyerMessageBoards')
@login_required
def get_buyer_message_boards(userId):
    boards = {board.to_dict()['id']:board.to_dict() for board in MessageBoard.query.filter(MessageBoard.potentialBuyerId == userId).all()}
    for board in boards:
        boards[board]['last_message'] = Message.query.filter(or_(Message.authorId == boards[board]['sellerId'], Message.authorId == boards[board]['potentialBuyerId'])).filter(Message.messageBoardId == board).order_by(Message.createdAt.desc()).first().to_dict()
        boards[board]['messages'] = {message.to_dict()['id']: message.to_dict() for message in Message.query.filter(Message.messageBoardId == board)}
        boards[board]['user'] = User.query.filter(User.id != userId).filter(or_(User.id == boards[board]['sellerId'], User.id == boards[board]['potentialBuyerId'])).first().to_dict()
    return jsonify(boards)

@user_routes.route('/<int:userId>/sellerMessageBoards')
@login_required
def get_seller_message_boards(userId):
    boards = {board.to_dict()['id']:board.to_dict() for board in MessageBoard.query.filter(MessageBoard.sellerId == userId).all()}
    for board in boards:
        boards[board]['last_message'] = Message.query.filter(or_(Message.authorId == boards[board]['sellerId'], Message.authorId == boards[board]['potentialBuyerId'])).filter(Message.messageBoardId == board).order_by(Message.createdAt.desc()).first().to_dict()
        boards[board]['messages'] = {message.to_dict()['id']: message.to_dict() for message in Message.query.filter(Message.messageBoardId == board)}
        boards[board]['user'] = User.query.filter(User.id != userId).filter(or_(User.id == boards[board]['sellerId'], User.id == boards[board]['potentialBuyerId'])).first().to_dict()
    return jsonify(boards)
