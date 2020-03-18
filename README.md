# innovativeproject-photographers-portfolio
There is a problem with templates loading. To fix it you need change in portfolio.py this line:
app = Flask(__name__)
to
app = Flask(__name__, template_folder='your/template-folder/path')
