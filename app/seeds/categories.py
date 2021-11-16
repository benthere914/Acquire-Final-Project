from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    electronics = Category(name='electronics')
    clothes = Category(name='clothes')
    sporting_goods = Category(name='sporting_goods')
    collectables = Category(name='collectables')
    toys = Category(name='toys')
    misc = Category(name='misc')

    db.session.add(electronics)
    db.session.add(clothes)
    db.session.add(sporting_goods)
    db.session.add(collectables)
    db.session.add(toys)
    db.session.add(misc)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
