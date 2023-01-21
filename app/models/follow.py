from .db import db, environment, SCHEMA, add_prefix_for_prod

follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == 'production':
    follows.schema = SCHEMA
