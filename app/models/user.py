from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

# like_fast_forward = db.Table(
#     "like_fast_forward",
#     db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
#     db.Column("fast_forward_id", db.Integer, db.ForeignKey(add_prefix_for_prod("fastForwards.id")), primary_key=True)
# )

# like_comment = db.Table(
#     "like_comment",
#     db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
#     db.Column("comment_id", db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), primary_key=True)
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False, unique=True)
    last_name = db.Column(db.String(40), nullable=False, unique=True)
    bio = db.Column(db.String(255), nullable=True, unique=True)
    image_url = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    follows = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic",
    )

    # liked = db.relationship(
    #     "FastForward",
    #     secondary=like_fast_forward,
    #     primaryjoin=(like_comment.c.user_id == id),
    #     secondaryjoin=(like_comment.c.comment_id == id),
    #     lazy='dynamic',
    #     back_populates = "liked_fast_forward_user"
    # )

    # liked_comment = db.relationship(
    #     "Comment",
    #     secondary=like_comment,
    #     primaryjoin=(like_fast_forward.c.user_id == id),
    #     secondaryjoin=(like_fast_forward.c.fast_forward_id == id),
    #     lazy='dynamic',
    #     back_populates = "liked_comment_user"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'bio': self.bio,
            'image_url': self.image_url,
            'username': self.username,
            'email': self.email,
        }
