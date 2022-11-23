from flask_sqlalchemy import SQLAlchemy
from .db import db, add_prefix_for_prod, environment, SCHEMA


class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id")))
    user = db.relationship("User", back_populates="comments")
    fast_forwards = db.relationship("FastForwards", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'User': self.user.to_dict()
        }
