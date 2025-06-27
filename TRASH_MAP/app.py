from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('map'))

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/explorer')
def explorer():
    # if you need dynamic images:
    # images = Image.query.all()
    # return render_template('explorer.html', images=images)
    return render_template('explorer.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')


if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)
