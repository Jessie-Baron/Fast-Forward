from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# ================================users followers and following routes ==================================

# get all users I am following
@user_routes.route("/<int:id>/following")
@login_required
def following(id):
    user = User.query.get(id)
    following = user.following.all()
    users = {}
    for i in range(len(following)):
        users[user.following[i].id]=user.following[i].to_dict()
    return users

# get all users who follow me
@user_routes.route("/<int:id>/followers")
@login_required
def followers(id):
    user = User.query.get(id)
    followers = user.followers.all()
    users = {}
    for i in range(len(followers)):
        users[users.following[i].id] = user.followers[i].to_dict()
    return users
