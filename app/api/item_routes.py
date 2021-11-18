import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Item, ItemPhoto, Category, db
from datetime import date

item_routes = Blueprint('items', __name__)


@item_routes.route('/top')
def top_items():
    items = Item.query.limit(12).all()
    output = {}
    for item in items:
        temp = item.to_dict()
        temp['photos'] = [photo.to_dict() for photo in item.item_photos]
        output[temp['id']] = (temp)

    return jsonify(output)


@item_routes.route('/<int:id>')
def get_item(id):
    item = Item.query.get(id)
    temp = item.to_dict()
    temp['photos'] = [photo.to_dict() for photo in item.item_photos]
    seller = User.query.get(temp['sellerId'])
    seller = seller.to_dict()
    temp['seller'] = seller
    category = Category.query.get(temp['categoryId']).to_dict()
    temp['category'] = category
    return jsonify(temp)


@item_routes.route('/', methods=['POST'])
def add_item():
    body = request.get_json()
    category_id = Category.query.filter(Category.name == body['category']['value']).first().to_dict()['id']
    item = Item(categoryId=category_id, sellerId=body['userId'], name=body['title'], description=body['description'], dateListed=date.today(), price=int(body['price']), discount=0, condition=body['condition']['value'], count=int(body['quantity']))
    db.session.add(item)
    db.session.commit()
    itemId = item.to_dict()['id']
    db.session.add(ItemPhoto(itemId=itemId, photoUrl=body['icon1']))
    db.session.add(ItemPhoto(itemId=itemId, photoUrl=body['icon2']))
    db.session.add(ItemPhoto(itemId=itemId, photoUrl=body['icon3']))
    db.session.commit()

    return jsonify({'message': 'success', 'id': item.to_dict()['id']})



@item_routes.route('/', methods=['PUT'])
def update_item():
    body = request.get_json()
    category_id = Category.query.filter(Category.name == body['category']).first().to_dict()['id']
    item = Item.query.get(body['id'])
    item.categoryId=category_id
    item.sellerId=body['userId']
    item.name=body['title']
    item.description=body['description']
    item.dateListed=date.today()
    item.price=int(body['price'])
    item.discount=0
    item.condition=body['condition']
    item.count=int(body['quantity'])
    db.session.commit()
    photo1 = ItemPhoto.query.get(body['photo1Id'])
    photo1.photoUrl=body['icon1']
    photo2 = ItemPhoto.query.get(body['photo2Id'])
    photo2.photoUrl=body['icon2']
    photo3 = ItemPhoto.query.get(body['photo3Id'])
    photo3.photoUrl=body['icon3']
    db.session.commit()
    return jsonify({'message': 'success', 'id': item.to_dict()['id']})

@item_routes.route('/<int:id>', methods=['DELETE'])
def delete_item(id):
    body = request.get_json()
    user = User.query.get(body['user']['id'])
    valid = user.check_password(body['password'])
    if valid:
        ItemPhoto.query.filter(ItemPhoto.itemId == id).delete()
        Item.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify({'message': 'success'})
