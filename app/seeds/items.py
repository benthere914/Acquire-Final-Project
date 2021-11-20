from app.models import db, Item
from faker import Faker
from datetime import date
import random
fake = Faker()

conditions = ['used', 'new', 'refurbished']

# Adds a demo user, you can add other users here if you want
def seed_items():
    for i in range(1, 3):
        for j in range(1, 29):
            db.session.add(Item(categoryId=j, sellerId=random.choice([_ for _ in range(1, 24)]), name=fake.sentence(), description=fake.sentence(), dateListed=date.today(), price=(10 * j * i), discount=0, condition=random.choice(conditions), count=i+j ))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
