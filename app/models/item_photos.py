from .db import db

class  ItemPhoto(db.Model):
    __tablename__ = 'item_photos'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False, unique=False)
    photoUrl = db.Column(db.Text, nullable=False)

    item = db.relationship('Item', back_populates='item_photos')

    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.itemId,
            'photoUrl': self.photoUrl
        }
