import re
from flask_wtf import FlaskForm

from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import email_validator


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError(' - Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError(' - Username is already in use.')

def long_enough(form, field):
    data = field.data
    if len(data) < 5:
        raise ValidationError(' - Must be at least 5 characters')

def short_enough(form, field):
    if len(field.data) > 20:
        raise ValidationError(' - Must be no more than 20 characters')

def password_long_enough(form, field):
    if len(field.data) < 8:
        raise ValidationError(' - Must be at least 8 characters')

def password_short_enough(form, field):
    if len(field.data) > 25:
        raise ValidationError(' - Must be at most 25 characters')

def password_contains_letter(form, field):
    if not bool(re.search('[a-z,A-Z]', field.data)):
        raise ValidationError(' - Must have at least 1 letter')

def password_contains_number(form, field):
    if not bool(re.search('[0-9]', field.data)):
        raise ValidationError(' - Must have at least 1 number')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message=' - This field is required.'), username_exists, long_enough, short_enough])
    email = StringField('email', validators=[DataRequired(message=' - This field is required.'), user_exists, Email(), long_enough])
    icon = StringField('icon')
    password = StringField('password', validators=[DataRequired(message=' - This field is required.'), password_long_enough, password_contains_letter, password_contains_number])
