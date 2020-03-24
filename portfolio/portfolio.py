from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

@app.route('/')
def home():
    pics = os.listdir('static/img/')
    return render_template('index.html', name='Jan Kowalski', pics=pics)

@app.route("/about")
def about():
    return render_template('about.html', title='About', name='Jan Kowalski')

@app.route("/contact")
def contact():
    return render_template('contact.html', title='Contact', name='Jan Kowalski')

if __name__ == "__main__":
    app.run(debug==True)
