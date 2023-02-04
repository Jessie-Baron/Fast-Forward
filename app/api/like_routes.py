from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import LikePost
from app.models import db, User


likes_routes = Blueprint('likes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@likes_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_like(id):
    """
    Query for all likes for a story and returns them in a list of dictionaries
    """
    like = LikePost.query.filter_by( fast_forward_id=id, user_id=current_user.id).first()
    if current_user.id == like.user_id:
        db.session.delete(like)
        db.session.commit()
        return {'message': 'Deleted'}
    return {'errors': ['Unauthorized']}
