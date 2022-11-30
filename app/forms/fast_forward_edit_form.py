from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class FastForwardEditForm(FlaskForm):
    caption = StringField('caption', validators=[DataRequired()])
