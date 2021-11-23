import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy.orm import query_expression
from sqlalchemy.sql.expression import false, true
from werkzeug.wrappers.request import PlainRequest
from app.models import User, Item, ItemPhoto, Category, category, db
from datetime import date
from sqlalchemy import or_

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

@item_routes.route('/search/<string:category>/<string:query>')
def search_items(category, query):
    query = query.split(' ')
    output = {}
    allItems = []
    selected_category = Category.query.filter(Category.name == category).first()
    if (any(query) and query[0] != '$$all$$'):
        for word in query:
            items_by_name = Item.query.filter(Item.name.ilike(f'%{word}%')).filter(Item not in allItems).filter(or_(Item.category == selected_category, selected_category.to_dict()['name'] == 'All Categories')).all()
            allItems.extend(items_by_name)
            items_by_description = Item.query.filter(Item.description.ilike(f'%{word}%')).filter(Item not in allItems).filter(or_(Item.category == selected_category, selected_category.to_dict()['name'] == 'All Categories')).all()
            allItems.extend(items_by_description)
    else:
        if (query[0] == '$$all$$' and len(query) == 1 and selected_category.to_dict()['name'] == 'All Categories'):
            allItems = Item.query.all()
        else:
            allItems = Item.query.filter(Item.category == selected_category).all()

    for item in allItems:
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
    good_title = False
    good_price = False
    good_description = False
    good_quantity = False
    print('*****************')
    print('*****************')
    print('*****************')
    print('*****************')
    print('*****************')
    print('*****************')
    print('*****************')
    print('*****************')

    print(body)
    print(8 < len(body['title']) <  35)
    if (8 < len(body['title']) < 35) and isinstance(body['title'], str):
        good_title = True
    if (0 <= body['price'] <= 5000 and isinstance(body['price'], int) and not '.' in str(body['price'])):
        good_price = True
    if (8 < len(body['description']) < 500) and isinstance(body['description'], str):
        good_description = True
    if (1 <= body['quantity'] <= 20 and isinstance(body['quantity'], int) and not '.' in str(body['quantity'])):
        good_quantity = True
    print(good_title)
    if (good_title and good_price and good_description and good_quantity):
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

    output = {}
    if not good_price:
        output['price'] = ' - Must be an integer between 0 and 5000'
    if not good_title:
        output['title'] = ' - Must be between 8 and 35 characters'
    if not good_description:
        output['description'] = ' - Must be between 8 and 500 characters'
    if not good_quantity:
        output['quantity'] = ' - Must be and integer between 1 and 20'
    return jsonify(output), 401



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
