import sqlite3
from flask import Flask, render_template, request, redirect, url_for, g, flash
from flask_mail import Mail, Message

DATABASE = '../Database/database.sql'  # Adjust path as needed

app = Flask(__name__)
app.secret_key = 'your-very-secret-key'  # Use a strong, random value in production

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/explorer')
def explorer():
    db = get_db()
    cur = db.execute('SELECT file_path, label, upload_date FROM image_features')
    images = [
        {
            'filename': row['file_path'],
            'label': row['label'],
            'upload_date': row['upload_date'] if 'upload_date' in row.keys() else None
        }
        for row in cur.fetchall()
    ]
    return render_template('explorer.html', images=images)

@app.route('/')
def home():
    return redirect(url_for('map'))

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

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

@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    try:
        msg = Message(
            subject=f"Message de {name} via Trash Map",
            recipients=['trashmapflaskemailer@gmail.com'],  # Ton adresse de réception
            body=f"Nom: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        flash("Votre message a bien été envoyé. Merci !", "success")
    except Exception as e:
        flash(f"Erreur lors de l’envoi : {str(e)}", "danger")

    return redirect(url_for('contact'))


app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # ou autre (ex : smtp.mailgun.org)
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'trashmapflaskemailer@gmail.com'
app.config['MAIL_PASSWORD'] = 'xtbk quwl kfob ldef'
app.config['MAIL_DEFAULT_SENDER'] = ('Trash Map', 'trashmapflaskemailer@gmail.com')

mail = Mail(app)

if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)
