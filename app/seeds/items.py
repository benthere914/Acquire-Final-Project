from app.models import db, Item
from faker import Faker
from datetime import date

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_items():
    for i in range(1, 4):
        for j in range(1, 7):
            db.session.add(Item(categoryId=j, sellerId=i, name=fake.name(), description=fake.sentence(), dateListed=date.today(), price=(10 * j * i)))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
