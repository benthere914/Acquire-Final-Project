from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    options = ['All Categories','Antiques','Art','Baby','Books','Business & Industrial',
    'Cameras & Photo','Clothing, Shoes, & Accessories','Coins & Paper Money','Collectibles',
    'Computers/Tablets & Networking','Consumer Electronics','Crafts','Dolls & Bears','DVDs & Movies',
    'Entertainment Memorabillia','Gift Cards & Coupons','Health & Beauty','Home & Garden','Jewely & Watches',
    'Music','Musical Instruments & Gear','Pet Supplies','Pottery & Glass','Sporting Goods','Sports Memorabillia',
    'Stamps','Tickets & Experiences','Toys & hobbies','Travel','Video Games & Consoles','Everything Else']
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
