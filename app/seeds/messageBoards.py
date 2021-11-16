from app.models import db, MessageBoard



# Adds a demo user, you can add other users here if you want
def seed_message_boards():

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)


    db.session.add(MessageBoard(sellerId=1, potentialBuyerId=2))
    db.session.add(MessageBoard(sellerId=1, potentialBuyerId=3))
    db.session.add(MessageBoard(sellerId=2, potentialBuyerId=1))
    db.session.add(MessageBoard(sellerId=2, potentialBuyerId=3))
    db.session.add(MessageBoard(sellerId=3, potentialBuyerId=1))
    db.session.add(MessageBoard(sellerId=3, potentialBuyerId=2))
    db.session.add(MessageBoard(sellerId=1, potentialBuyerId=2))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_message_boards():
    db.session.execute('TRUNCATE message_boards RESTART IDENTITY CASCADE;')
    db.session.commit()
