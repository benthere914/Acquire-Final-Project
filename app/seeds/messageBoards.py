from app.models import db, MessageBoard, message_board



# Adds a demo user, you can add other users here if you want
def seed_message_boards():
    for i in range(1, 18):
        for j in range(1, 18):
            if (i != j):
                db.session.add(MessageBoard(sellerId=i, potentialBuyerId=j))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_message_boards():
    db.session.execute('TRUNCATE message_boards RESTART IDENTITY CASCADE;')
    db.session.commit()
