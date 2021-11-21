from app.models import db, Item
from faker import Faker
from datetime import date
import random
fake = Faker()

conditions = ['used', 'new', 'refurbished']
def name_(i, j):
    if i == 1:
        if j <= 10:
            return 'Antique Clock'
        elif j <= 20:
            return 'Antique Lamp'
        elif j <= 30:
            return 'Antique Vase'
    elif i == 2:
        return 'book'
    elif i == 3:
        if j <= 10:
            return 'DSLR Camera'
        elif j <= 20:
            return 'Silver Camera'
        elif j <= 30:
            return 'Film Camera'
    elif i == 4:
        if j <= 10:
            return 'Blue Shirt'
        elif j <= 20:
            return 'Khaki pants'
        elif j <= 30:
            return 'Converse'
    elif i == 5:
        if j <= 10:
            return 'Collectible Toy Blue Car'
        elif j <= 20:
            return 'Toy Red Truck'
        elif j <= 30:
            return 'Collectible Toy Blue Car'
    elif i == 6:
        if j <= 10:
            return 'Dell Laptop'
        elif j <= 20:
            return 'Modern Desktop'
        elif j <= 30:
            return 'Ipad'
    elif i == 7:
        if j <= 10:
            return 'Iphone'
        elif j <= 20:
            return 'Stylus'
        elif j <= 30:
            return 'Phone Case'
    elif i == 8:
        if j <= 10:
            return 'Television'
        elif j <= 20:
            return 'Projector'
        elif j <= 30:
            return 'Monitor'
    elif i == 9:
        if j <= 10:
            return 'Guitar'
        elif j <= 20:
            return 'Trumpet'
        elif j <= 30:
            return 'Drum Kit'
    elif i == 10:
        if j <= 10:
            return 'Dog Bowl'
        elif j <= 20:
            return 'Cat Climbing Tree'
        elif j <= 30:
            return 'Dog Leash'
    elif i == 11:
        if j <= 10:
            return 'Basketball'
        elif j <= 20:
            return 'Tennis'
        elif j <= 30:
            return 'Football'
    elif i == 12:
        if j <= 10:
            return 'Board Game'
        elif j <= 20:
            return 'Legos'
        elif j <= 30:
            return 'Poker Set'
    elif i == 13:
        if j <= 10:
            return 'Xbox'
        if j <= 20:
            return 'Nintendo Switch'
        if j <= 30:
            return 'Playstation'
# Adds a demo user, you can add other users here if you want
def seed_items():
    for i in range(1, 14):
        for j in range(1, 31):
            db.session.add(Item(categoryId=i, sellerId=random.choice([_ for _ in range(1, 11)]), name=name_(i, j), description=fake.sentence(), dateListed=date.today(), price=(10 * j * i), discount=0, condition=random.choice(conditions), count=i+j ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
