from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def render_static_html():
    pics = os.listdir('static/img/')
    return render_template('index.html', name='Jan Kowalski', pics=pics)

#@app.route('/about')
#def about():
#    return render_template('about.html', title='About')

if __name__ == "__main__":
    app.run(debug==True)
