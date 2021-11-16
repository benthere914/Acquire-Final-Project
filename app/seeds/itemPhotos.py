from app.models import db, Item, ItemPhoto
from faker import Faker

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_item_photos():
    for i in range(1, len([item for item in Item.query.all()]) + 1):
        db.session.add(ItemPhoto(itemId=i, photoUrl=fake.image_url()))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_item_photos():
    db.session.execute('TRUNCATE item_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
