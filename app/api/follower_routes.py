from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User
import json

followers_routes = Blueprint("followers", __name__)

# I am able to follow other users
@followers_routes.route("", methods=["POST"])
@login_required
def follow():
    # pass in follower and followed id's from frontend
    # use those parameters on lines 27 and 28 instead
    req_body = request.json
    user_followed = User.query.get(req_body["followed_id"])
    user_follower = User.query.get(req_body["follower_id"])
    user_follower.following.append(user_followed)
    print("another weird data thing", user_follower)
    db.session.commit()
    updated_following = user_follower.following.all()
    users = {}
    for i in range(len(updated_following)):
        users[updated_following[i].id]=updated_following[i].to_dict()
    return users

#  I am able to unfollow other users
@followers_routes.route("", methods=["DELETE"])
@login_required
def unfollow():
    req_body = json.loads(request.data)
    user_follower = User.query.get(req_body['follower_id'])
    user_followed = User.query.get(req_body["followed_id"])
    user_follower.following.remove(user_followed)
    db.session.commit()
    updated_following = user_follower.following.all()
    print('updated list of who I follow', updated_following)
    users = {}
    for i in range(len(updated_following)):
        users[updated_following[i].id]=updated_following[i].to_dict()
    return users
