from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class FastForwardForm(FlaskForm):
    caption = StringField('caption', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
