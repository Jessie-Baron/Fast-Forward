from flask_sqlalchemy import SQLAlchemy
from .db import db, add_prefix_for_prod, environment, SCHEMA

class LikePost(db.Model):
    __tablename__ = 'likePosts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    fast_forward_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("fastForwards.id")))
    user = db.relationship("User", backref="likePosts")
    fast_forwards = db.relationship("FastForward", backref="likePosts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'fast_forward_id': self.fast_forward_id,
            'User': self.user.to_dict()
        }
