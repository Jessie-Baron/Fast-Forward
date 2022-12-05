from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

def caption_is_not_too_long(form, field):
    caption = field.data
    if len(caption) >= 2500:
        print("error")
        raise ValidationError("Character limit exceeded")


class FastForwardForm(FlaskForm):
    caption = StringField('caption', validators=[DataRequired(), caption_is_not_too_long])
    url = StringField('url', validators=[DataRequired()])
