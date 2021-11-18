from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item, ItemPhoto

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
