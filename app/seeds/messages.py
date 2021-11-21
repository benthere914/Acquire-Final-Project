from app.models import db, Message, MessageBoard
from faker import Faker
from datetime import date

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_messages():
    for i in [board.to_dict() for board in MessageBoard.query.all()]:
        for j in range(1, 20):
            if j % 2 == 0:
                db.session.add(Message(messageBoardId = i['id'], authorId=i['sellerId'], message=fake.sentence(), createdAt=date.today()))
            else:
                db.session.add(Message(messageBoardId = i['id'], authorId=i['potentialBuyerId'], message=fake.sentence(), createdAt=date.today()))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
