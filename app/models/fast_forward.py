from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class FastForward(db.Model):
    __tablename__ = 'fastForwards'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    caption = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", lazy='joined', backref="fastForwards")
    comment = db.relationship("Comment", cascade="all,delete", backref="fastForwards")
    like_post = db.relationship("LikePost", cascade="all,delete", backref="fastForwards")

    # liked_fast_forward_user = db.relationship(
    #     "User",
    #     secondary=like_fast_forward,
    #     lazy='dynamic',
    #     back_populates = 'liked')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'caption': self.caption,
            'user_id': self.user_id,
            'User': self.user.to_dict(),
            'Comments': [comment.to_dict() for comment in self.comments],
            'LikePosts':[like_post.to_dict() for like_post in self.like_post]
        }
