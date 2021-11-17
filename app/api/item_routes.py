from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Item, ItemPhoto

item_routes = Blueprint('items', __name__)


@item_routes.route('/top')
# @login_required
def top_items():
    print('got here *************')
    items = Item.query.limit(12).all()
    output = {}
    for item in items:
        temp = item.to_dict()
        temp['photos'] = [photo.to_dict() for photo in item.item_photos]
        output[temp['id']] = (temp)

    return jsonify(output)


@item_routes.route('/<int:id>')
# @login_required
def get_item(id):
    print('got here *************')
    item = Item.query.get(id)
    output = {}
    temp = item.to_dict()
    temp['photos'] = [photo.to_dict() for photo in item.item_photos]
    output[temp['id']] = (temp)

    return jsonify(output)
