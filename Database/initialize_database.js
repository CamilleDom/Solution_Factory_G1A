const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

const db = new sqlite3.Database('./database_factory.db');

db.serialize(() => {
  // Créer la table Users
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    username TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nb_pic INTEGER DEFAULT 0,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    points REAL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

  // Créer la table Images
  db.run(`CREATE TABLE IF NOT EXISTS Images (
    file_path TEXT PRIMARY KEY,
    label TEXT,
    width INTEGER,
    height INTEGER,
    file_size_kb REAL,
    avg_r REAL,
    avg_g REAL,
    avg_b REAL,
    contrast REAL,
    canny_edge_count REAL,
    sobel_edge_count REAL,
    center_edge_count REAL,
    surround_edge_count REAL,

    -- Gray histogram
    gray_hist_0 REAL, gray_hist_1 REAL, gray_hist_2 REAL, gray_hist_3 REAL, gray_hist_4 REAL,
    gray_hist_5 REAL, gray_hist_6 REAL, gray_hist_7 REAL, gray_hist_8 REAL, gray_hist_9 REAL,
    gray_hist_10 REAL, gray_hist_11 REAL, gray_hist_12 REAL, gray_hist_13 REAL, gray_hist_14 REAL,
    gray_hist_15 REAL, gray_hist_16 REAL, gray_hist_17 REAL, gray_hist_18 REAL, gray_hist_19 REAL,

    -- Luminance histogram
    lum_hist_0 REAL, lum_hist_1 REAL, lum_hist_2 REAL, lum_hist_3 REAL, lum_hist_4 REAL,
    lum_hist_5 REAL, lum_hist_6 REAL, lum_hist_7 REAL, lum_hist_8 REAL, lum_hist_9 REAL,
    lum_hist_10 REAL, lum_hist_11 REAL, lum_hist_12 REAL, lum_hist_13 REAL, lum_hist_14 REAL,
    lum_hist_15 REAL, lum_hist_16 REAL, lum_hist_17 REAL, lum_hist_18 REAL, lum_hist_19 REAL,

    -- HOG features
    hog_0 REAL, hog_1 REAL, hog_2 REAL, hog_3 REAL, hog_4 REAL, hog_5 REAL, hog_6 REAL, hog_7 REAL, hog_8 REAL, hog_9 REAL,
    hog_10 REAL, hog_11 REAL, hog_12 REAL, hog_13 REAL, hog_14 REAL, hog_15 REAL, hog_16 REAL, hog_17 REAL, hog_18 REAL, hog_19 REAL,
    hog_20 REAL, hog_21 REAL, hog_22 REAL, hog_23 REAL, hog_24 REAL, hog_25 REAL, hog_26 REAL, hog_27 REAL, hog_28 REAL, hog_29 REAL,
    hog_30 REAL, hog_31 REAL, hog_32 REAL, hog_33 REAL, hog_34 REAL, hog_35 REAL, hog_36 REAL, hog_37 REAL, hog_38 REAL, hog_39 REAL,
    hog_40 REAL, hog_41 REAL, hog_42 REAL, hog_43 REAL, hog_44 REAL, hog_45 REAL, hog_46 REAL, hog_47 REAL, hog_48 REAL, hog_49 REAL,

    -- LBP features
    lbp_0 REAL, lbp_1 REAL, lbp_2 REAL, lbp_3 REAL, lbp_4 REAL,
    lbp_5 REAL , lbp_6 REAL, lbp_7 REAL, lbp_8 REAL, lbp_9 REAL,

    -- Autres
    brightness REAL,true_label TEXT,auto_label TEXT
  );`);

  // Indexes pour optimiser les recherches
  db.run(`CREATE INDEX IF NOT EXISTS idx_label ON Images(label);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_contrast ON Images(contrast);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_canny_edge_count ON Images(canny_edge_count);`);

  // Préparer la requête d’insertion
let insertImageStmt = db.prepare(`INSERT INTO Images 
(file_path,
    label ,
    width ,
    height ,
    file_size_kb ,
    avg_r ,
    avg_g ,
    avg_b ,
    contrast ,
    canny_edge_count ,
    sobel_edge_count ,
    center_edge_count ,
    surround_edge_count ,
    gray_hist_0 , gray_hist_1 , gray_hist_2 , gray_hist_3 , gray_hist_4 ,
    gray_hist_5 , gray_hist_6 , gray_hist_7 , gray_hist_8 , gray_hist_9 ,
    gray_hist_10 , gray_hist_11 , gray_hist_12 , gray_hist_13 , gray_hist_14 ,
    gray_hist_15 , gray_hist_16 , gray_hist_17 , gray_hist_18 , gray_hist_19 ,
    lum_hist_0 , lum_hist_1 , lum_hist_2 , lum_hist_3 , lum_hist_4 ,
    lum_hist_5 , lum_hist_6 , lum_hist_7 , lum_hist_8 , lum_hist_9 ,
    lum_hist_10 , lum_hist_11 , lum_hist_12 , lum_hist_13 , lum_hist_14 ,
    lum_hist_15 , lum_hist_16 , lum_hist_17 , lum_hist_18 , lum_hist_19 ,
    hog_0 , hog_1 , hog_2 , hog_3 , hog_4 , hog_5 , hog_6 , hog_7 , hog_8 , hog_9 ,
    hog_10 , hog_11 , hog_12 , hog_13 , hog_14 , hog_15 , hog_16 , hog_17 , hog_18 , hog_19 ,
    hog_20 , hog_21 , hog_22 , hog_23 , hog_24 , hog_25 , hog_26 , hog_27 , hog_28 , hog_29 ,
    hog_30 , hog_31 , hog_32 , hog_33 , hog_34 , hog_35 , hog_36 , hog_37 , hog_38 , hog_39 ,
    hog_40 , hog_41 , hog_42 , hog_43 , hog_44 , hog_45 , hog_46 , hog_47 , hog_48 , hog_49 ,
    lbp_0 , lbp_1 , lbp_2 , lbp_3 , lbp_4 ,
    lbp_5  , lbp_6 , lbp_7 , lbp_8 , lbp_9, brightness ,true_label ,auto_label )
VALUES (
 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
)`);

let insertUserStmt = db.prepare(`INSERT INTO Users 
(username, email, password, nb_pic, role, points, created_at)
VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`);


// Suivi des imports terminés
  let doneCount = 0;
  function checkDone() {
    doneCount++;
    if (doneCount === 2) {
      console.log("✅ Import terminé !");
      db.close();
    }
  }

// Lire le fichier CSV
fs.createReadStream('../Without ML/features_with_enhanced_pattern_labels.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Insérer chaque ligne dans la table Users
    insertImageStmt.run(
        row.file,
        row.label,
        parseInt(row.width),
        parseInt(row.height),
        parseFloat(row.file_size_kb),
        parseFloat(row.avg_r),
        parseFloat(row.avg_g),
        parseFloat(row.avg_b),
        parseFloat(row.contrast),
        parseFloat(row.canny_edge_count),
        parseFloat(row.sobel_edge_count),
        parseFloat(row.center_edge_count),
        parseFloat(row.surround_edge_count),
        parseFloat(row.gray_hist_0),
        parseFloat(row.gray_hist_1),
        parseFloat(row.gray_hist_2),
        parseFloat(row.gray_hist_3),
        parseFloat(row.gray_hist_4),
        parseFloat(row.gray_hist_5),
        parseFloat(row.gray_hist_6),
        parseFloat(row.gray_hist_7),
        parseFloat(row.gray_hist_8),
        parseFloat(row.gray_hist_9),
        parseFloat(row.gray_hist_10),
        parseFloat(row.gray_hist_11),
        parseFloat(row.gray_hist_12),
        parseFloat(row.gray_hist_13),
        parseFloat(row.gray_hist_14),
        parseFloat(row.gray_hist_15),
        parseFloat(row.gray_hist_16),
        parseFloat(row.gray_hist_17),
        parseFloat(row.gray_hist_18),
        parseFloat(row.gray_hist_19),
        parseFloat(row.lum_hist_0),
        parseFloat(row.lum_hist_1),
        parseFloat(row.lum_hist_2),
        parseFloat(row.lum_hist_3),
        parseFloat(row.lum_hist_4),
        parseFloat(row.lum_hist_5),
        parseFloat(row.lum_hist_6),
        parseFloat(row.lum_hist_7),
        parseFloat(row.lum_hist_8),
        parseFloat(row.lum_hist_9),
        parseFloat(row.lum_hist_10),
        parseFloat(row.lum_hist_11),
        parseFloat(row.lum_hist_12),
        parseFloat(row.lum_hist_13),
        parseFloat(row.lum_hist_14),
        parseFloat(row.lum_hist_15),
        parseFloat(row.lum_hist_16),
        parseFloat(row.lum_hist_17),
        parseFloat(row.lum_hist_18),
        parseFloat(row.lum_hist_19),
        parseFloat(row.hog_0),
        parseFloat(row.hog_1),
        parseFloat(row.hog_2),
        parseFloat(row.hog_3),
        parseFloat(row.hog_4),
        parseFloat(row.hog_5),
        parseFloat(row.hog_6),
        parseFloat(row.hog_7),
        parseFloat(row.hog_8),
        parseFloat(row.hog_9),
        parseFloat(row.hog_10),
        parseFloat(row.hog_11),
        parseFloat(row.hog_12),
        parseFloat(row.hog_13),
        parseFloat(row.hog_14),
        parseFloat(row.hog_15),
        parseFloat(row.hog_16),
        parseFloat(row.hog_17),
        parseFloat(row.hog_18),
        parseFloat(row.hog_19),
        parseFloat(row.hog_20),
        parseFloat(row.hog_21),
        parseFloat(row.hog_22),
        parseFloat(row.hog_23),
        parseFloat(row.hog_24),
        parseFloat(row.hog_25),
        parseFloat(row.hog_26),
        parseFloat(row.hog_27),
        parseFloat(row.hog_28),
        parseFloat(row.hog_29),
        parseFloat(row.hog_30),
        parseFloat(row.hog_31),
        parseFloat(row.hog_32),
        parseFloat(row.hog_33),
        parseFloat(row.hog_34),
        parseFloat(row.hog_35),
        parseFloat(row.hog_36),
        parseFloat(row.hog_37),
        parseFloat(row.hog_38),
        parseFloat(row.hog_39),
        parseFloat(row.hog_40),
        parseFloat(row.hog_41),
        parseFloat(row.hog_42),
        parseFloat(row.hog_43),
        parseFloat(row.hog_44),
        parseFloat(row.hog_45),
        parseFloat(row.hog_46),
        parseFloat(row.hog_47),
        parseFloat(row.hog_48),
        parseFloat(row.hog_49),
        parseFloat(row.lbp_0),
        parseFloat(row.lbp_1),
        parseFloat(row.lbp_2),
        parseFloat(row.lbp_3),
        parseFloat(row.lbp_4),
        parseFloat(row.lbp_5),
        parseFloat(row.lbp_6),
        parseFloat(row.lbp_7),
        parseFloat(row.lbp_8),
        parseFloat(row.lbp_9),
        parseFloat(row.brightness),
        row.true_label,
        row.auto_label
    , (err) => {
  if (err && err.code === 'SQLITE_CONSTRAINT') {
    console.warn(`⚠️ Doublon ignoré : ${row.file}`);
  } else if (err) {
    console.error(err);
  }
});

  })
  .on('end', () => {
      insertImageStmt.finalize();
      checkDone();
    });



// Lire le fichier CSV
fs.createReadStream('./users.csv')

  .pipe(csv())
  .on('data', (row) => {
    // Insérer chaque ligne dans la table Users
    insertUserStmt.run(
        row.username,
        row.email,
        row.password,
        parseInt(row.nb_pic),
        row.role,
        parseFloat(row.points)
    );

    
  })
  .on('end', () => {
      insertUserStmt.finalize();
      checkDone();
    });
});


    