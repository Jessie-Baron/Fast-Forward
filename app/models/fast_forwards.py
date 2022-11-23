from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class FastForwards(db.Model):
    __tablename__ = 'fastForwards'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    caption = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", lazy='joined', back_populates="fastForwards")
    comments = db.relationship("Comment", cascade="all,delete", back_populates="fastForwards")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.title,
            'caption': self.body,
            'user_id': self.user_id,
            'User': self.user.to_dict(),
            'Comments': [comment.to_dict() for comment in self.comments]
        }
