from .db import db

class MessageBoard(db.Model):
    __tablename__ = 'message_boards'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    sellerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=False)
    potentialBuyerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=False)

    seller = db.relationship('User', back_populates='message_boards', foreign_keys=[sellerId])
    buyer = db.relationship('User', back_populates='message_boards_', foreign_keys=[potentialBuyerId])
    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.sellerId,
            'potentialBuyerId': self.potentialBuyerId,
        }
