from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment
from app.models import db, User
from app.forms import CommentForm

comments_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@comments_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fix_comment(id):
    """
    Query for a single comment and edit that comment
    """
    comment = Comment.query.get(id)
    if current_user.id == comment.user_id:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            comment.body = form.data['body']
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@comments_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_comment(id):
    """
    Query for all comments for a story and returns them in a list of dictionaries
    """
    comment = Comment.query.get(id)
    print(current_user.id == comment.user_id)
    if current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Deleted'}
    return {'errors': ['Unauthorized']}
