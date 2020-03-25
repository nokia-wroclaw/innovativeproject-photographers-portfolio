from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, DateField, TextAreaField
from wtforms.validators import (DataRequired,
                                Email,
                                Length)


class ContactForm(FlaskForm):
    """Contact form."""

    person = StringField('Name', [
        DataRequired()])
    email = StringField('Email', [
        Email(message='Not a valid email address.'),
        DataRequired()])
    body = TextAreaField('Message', [
        DataRequired(),
        Length(min=4, message='Your message is too short.')])
    submit = SubmitField('Submit')