from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import FastForward, db, Comment, User
from flask_login import login_required, current_user
from app.forms import FastForwardForm
from app.forms import CommentForm

fast_forward_routes = Blueprint('fastForwards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@fast_forward_routes.route('')
def get_fast_forward():
    data = FastForward.query.all()
    print("this is the data", data)
    return {fast_forward.to_dict()['id']: fast_forward.to_dict() for fast_forward in data}

@fast_forward_routes.route('/<int:id>')
def get_fast_forward_details(id):
    data = FastForward.query.get(id)
    return data.to_dict()


@fast_forward_routes.route('', methods=['POST'])
@login_required
def post_fast_forward():
    form = FastForwardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fast_forward = fast_forward(title=form.data['title'],
                    body=form.data['body'],
                    user_id=current_user.id
                    )
        db.session.add(fast_forward)
        db.session.commit()
        return fast_forward.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@fast_forward_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_fast_forward(id):
    fast_forward = fast_forward.query.get(id)
    if current_user.id == fast_forward.user_id:
        form = FastForwardForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            fast_forward.title = form.data['title']
            fast_forward.body = form.data['body']
            db.session.add(fast_forward)
            db.session.commit()
            return fast_forward.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}


@fast_forward_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_fast_forward(id):
    fast_forward = fast_forward.query.get(id)
    print(fast_forward)
    print(id)
    if current_user.id == fast_forward.user_id:
        db.session.delete(fast_forward)
        db.session.commit()
        return {"data": "Deleted"}
    return {'errors': ['Unauthorized']}

# @fast_forward_routes.route('/<int:id>/comments')
# @login_required
# def get_comments(id):
#     """
#     Query for all comments for a fast_forward and returns them in a list of dictionaries
#     """
#     fast_forward = fast_forward.query.get(id)
#     comments = Comment.query.get(fast_forward.id)
#     print(comments)
#     return comments.to_dict()


@fast_forward_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):
    """
    Posts a comment to a fast_forward
    """
    form = CommentForm()
    print(request)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    print(form.errors)
    print(form.validate_on_submit())
    if form.validate_on_submit():
        comment = Comment(body=form.data['body'],
                      user_id=current_user.id,
                      fast_forward_id=id)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
