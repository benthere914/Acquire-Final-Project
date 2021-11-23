from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    options = [
        'All Categories',
        'Antiques',
        'Books',
        'Cameras & Photo',
        'Clothing, & Shoes',
        'Collectibles',
        'Computers & Tables',
        'Phones and Accessories',
        'Electronics',
        'Musical Instruments',
        'Pet Supplies',
        'Sporting Goods',
        'Toys & Hobbies',
        'Game Consoles'
    ]
    # 13 categories
    for option in options:
        db.session.add(Category(name=option))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
