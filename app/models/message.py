from .db import db

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    messageBoardId = db.Column(db.Integer, db.ForeignKey('message_boards.id'), nullable=False)
    authorId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(2000), nullable=False)
    createdAt = db.Column(db.DateTime(), nullable=False)

    message_board = db.relationship('MessageBoard', back_populates='messages')
    author = db.relationship('User', back_populates='messages')
