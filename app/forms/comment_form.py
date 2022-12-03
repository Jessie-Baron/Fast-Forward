from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def body_is_not_empty(form, field):
    body = field.data
    if body == "":
        print("error")
        raise ValidationError("Can't submit an empty comment field")

def body_is_not_too_long(form, field):
    body = field.data
    if len(body) >= 500:
        print("error")
        raise ValidationError("Character limit exceeded")


class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), body_is_not_empty, body_is_not_too_long])
