import sqlite3
import os
from datetime import datetime

# Préparer la date de référence
cutoff_date = datetime(2024, 7, 4)

# Chemin vers la base de données
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, '../Database', 'database_factory.db')

def delete_images_after_date(db_path, date_limit):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Assure-toi que le champ s'appelle bien 'created_at'
    # et qu'il est stocké au format ISO (YYYY-MM-DD)
    cursor.execute("""
        DELETE FROM Images
        WHERE DATE(upload_date) > DATE(?)
    """, (date_limit.strftime('%Y-%m-%d'),))

    deleted_rows = cursor.rowcount
    conn.commit()
    conn.close()

    print(f"{deleted_rows} images supprimées après le {date_limit.strftime('%Y-%m-%d')}.")

# Exécution
delete_images_after_date(DB_PATH, cutoff_date)
