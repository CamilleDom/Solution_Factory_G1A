const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');


const db = new sqlite3.Database('./database_factory.db');

db.serialize(() => {
  ///////////////////////////////////////// Create de tables //////////////////////////////////

  db.run(`DROP TABLE IF EXISTS Features_Pics;`);
  db.run(`DROP TABLE IF EXISTS Images;`);
  db.run(`DROP TABLE IF EXISTS Users;`);
  db.run(`CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nb_pic INTEGER DEFAULT 0,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'anonyme')) DEFAULT 'user',
    points REAL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

  
  db.run(`CREATE TABLE Images (
    file_path TEXT UNIQUE PRIMARY KEY,
    label TEXT NOT NULL CHECK(label IN ('clean', 'dirty','unknown')) default 'unknown',
    true_label TEXT NOT NULL CHECK(true_label IN ('clean', 'dirty','unknown')),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username TEXT NOT NULL,
    localisation TEXT default 'unknown',
    description TEXT default 'no description',
    Quizz TEXT NOT NULL CHECK(Quizz IN ('clean', 'dirty','pachyderm')) default 'pachyderm',
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
  );`);

    db.run(`CREATE TABLE Features_Pics (
    file_path TEXT UNIQUE PRIMARY KEY,
    label TEXT CHECK(label IN ('clean', 'dirty','unknown')) NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    aspect_ratio REAL NOT NULL,
    file_size_kb REAL NOT NULL,
    avg_r REAL NOT NULL,
    var_r REAL NOT NULL,
    skew_r REAL NOT NULL,
    avg_g REAL NOT NULL,
    var_g REAL NOT NULL,
    skew_g REAL NOT NULL,
    avg_b REAL NOT NULL,
    var_b REAL NOT NULL,
    skew_b REAL NOT NULL,
    h_hist_0 INTEGER NOT NULL,
    h_hist_1 INTEGER NOT NULL,
    h_hist_2 INTEGER NOT NULL,
    h_hist_3 INTEGER NOT NULL,
    h_hist_4 INTEGER NOT NULL,
    h_hist_5 INTEGER NOT NULL,
    h_hist_6 INTEGER NOT NULL,
    h_hist_7 INTEGER NOT NULL,
    h_hist_8 INTEGER NOT NULL,
    h_hist_9 INTEGER NOT NULL,
    h_hist_10 INTEGER NOT NULL,
    h_hist_11 INTEGER NOT NULL,
    h_hist_12 INTEGER NOT NULL,
    h_hist_13 INTEGER NOT NULL,
    h_hist_14 INTEGER NOT NULL,
    h_hist_15 INTEGER NOT NULL,
    h_hist_16 INTEGER NOT NULL,
    h_hist_17 INTEGER NOT NULL,
    h_hist_18 INTEGER NOT NULL,
    h_hist_19 INTEGER NOT NULL,
    s_hist_0 INTEGER NOT NULL,
    s_hist_1 INTEGER NOT NULL,
    s_hist_2 INTEGER NOT NULL,
    s_hist_3 INTEGER NOT NULL,
    s_hist_4 INTEGER NOT NULL,
    s_hist_5 INTEGER NOT NULL,
    s_hist_6 INTEGER NOT NULL,
    s_hist_7 INTEGER NOT NULL,
    s_hist_8 INTEGER NOT NULL,
    s_hist_9 INTEGER NOT NULL,
    s_hist_10 INTEGER NOT NULL,
    s_hist_11 INTEGER NOT NULL,
    s_hist_12 INTEGER NOT NULL,
    s_hist_13 INTEGER NOT NULL,
    s_hist_14 INTEGER NOT NULL,
    s_hist_15 INTEGER NOT NULL,
    s_hist_16 INTEGER NOT NULL,
    s_hist_17 INTEGER NOT NULL,
    s_hist_18 INTEGER NOT NULL,
    s_hist_19 INTEGER NOT NULL,
    v_hist_0 INTEGER NOT NULL,
    v_hist_1 INTEGER NOT NULL,
    v_hist_2 INTEGER NOT NULL,
    v_hist_3 INTEGER NOT NULL,
    v_hist_4 INTEGER NOT NULL,
    v_hist_5 INTEGER NOT NULL,
    v_hist_6 INTEGER NOT NULL,
    v_hist_7 INTEGER NOT NULL,
    v_hist_8 INTEGER NOT NULL,
    v_hist_9 INTEGER NOT NULL,
    v_hist_10 INTEGER NOT NULL,
    v_hist_11 INTEGER NOT NULL,
    v_hist_12 INTEGER NOT NULL,
    v_hist_13 INTEGER NOT NULL,
    v_hist_14 INTEGER NOT NULL,
    v_hist_15 INTEGER NOT NULL,
    v_hist_16 INTEGER NOT NULL,
    v_hist_17 INTEGER NOT NULL,
    v_hist_18 INTEGER NOT NULL,
    v_hist_19 INTEGER NOT NULL,
    gray_hist_0 INTEGER NOT NULL,
    gray_hist_1 INTEGER NOT NULL,
    gray_hist_2 INTEGER NOT NULL,
    gray_hist_3 INTEGER NOT NULL,
    gray_hist_4 INTEGER NOT NULL,
    gray_hist_5 INTEGER NOT NULL,
    gray_hist_6 INTEGER NOT NULL,
    gray_hist_7 INTEGER NOT NULL,
    gray_hist_8 INTEGER NOT NULL,
    gray_hist_9 INTEGER NOT NULL,
    gray_hist_10 INTEGER NOT NULL,
    gray_hist_11 INTEGER NOT NULL,
    gray_hist_12 INTEGER NOT NULL,
    gray_hist_13 INTEGER NOT NULL,
    gray_hist_14 INTEGER NOT NULL,
    gray_hist_15 INTEGER NOT NULL,
    gray_hist_16 INTEGER NOT NULL,
    gray_hist_17 INTEGER NOT NULL,
    gray_hist_18 INTEGER NOT NULL,
    gray_hist_19 INTEGER NOT NULL,
    lum_hist_0 INTEGER NOT NULL,
    lum_hist_1 INTEGER NOT NULL,
    lum_hist_2 INTEGER NOT NULL,
    lum_hist_3 INTEGER NOT NULL,
    lum_hist_4 INTEGER NOT NULL,
    lum_hist_5 INTEGER NOT NULL,
    lum_hist_6 INTEGER NOT NULL,
    lum_hist_7 INTEGER NOT NULL,
    lum_hist_8 INTEGER NOT NULL,
    lum_hist_9 INTEGER NOT NULL,
    lum_hist_10 INTEGER NOT NULL,
    lum_hist_11 INTEGER NOT NULL,
    lum_hist_12 INTEGER NOT NULL,
    lum_hist_13 INTEGER NOT NULL,
    lum_hist_14 INTEGER NOT NULL,
    lum_hist_15 INTEGER NOT NULL,
    lum_hist_16 INTEGER NOT NULL,
    lum_hist_17 INTEGER NOT NULL,
    lum_hist_18 INTEGER NOT NULL,
    lum_hist_19 INTEGER NOT NULL,
    contrast INTEGER NOT NULL,
    laplacian_var REAL NOT NULL,
    canny_count INTEGER NOT NULL,
    sobel_count INTEGER NOT NULL,
    edge_density REAL NOT NULL,
    center_edge INTEGER NOT NULL,
    surround_edge INTEGER NOT NULL,
    hog_0 REAL NOT NULL,
    hog_1 REAL NOT NULL,
    hog_2 REAL NOT NULL,
    hog_3 REAL NOT NULL,
    hog_4 REAL NOT NULL,
    hog_5 REAL NOT NULL,
    hog_6 REAL NOT NULL,
    hog_7 REAL NOT NULL,
    hog_8 REAL NOT NULL,
    hog_9 REAL NOT NULL,
    hog_10 REAL NOT NULL,
    hog_11 REAL NOT NULL,
    hog_12 REAL NOT NULL,
    hog_13 REAL NOT NULL,
    hog_14 REAL NOT NULL,
    hog_15 REAL NOT NULL,
    hog_16 REAL NOT NULL,
    hog_17 REAL NOT NULL,
    hog_18 REAL NOT NULL,
    hog_19 REAL NOT NULL,
    hog_20 REAL NOT NULL,
    hog_21 REAL NOT NULL,
    hog_22 REAL NOT NULL,
    hog_23 REAL NOT NULL,
    hog_24 REAL NOT NULL,
    hog_25 REAL NOT NULL,
    hog_26 REAL NOT NULL,
    hog_27 REAL NOT NULL,
    hog_28 REAL NOT NULL,
    hog_29 REAL NOT NULL,
    hog_30 REAL NOT NULL,
    hog_31 REAL NOT NULL,
    hog_32 REAL NOT NULL,
    hog_33 REAL NOT NULL,
    hog_34 REAL NOT NULL,
    hog_35 REAL NOT NULL,
    hog_36 REAL NOT NULL,
    hog_37 REAL NOT NULL,
    hog_38 REAL NOT NULL,
    hog_39 REAL NOT NULL,
    hog_40 REAL NOT NULL,
    hog_41 REAL NOT NULL,
    hog_42 REAL NOT NULL,
    hog_43 REAL NOT NULL,
    hog_44 REAL NOT NULL,
    hog_45 REAL NOT NULL,
    hog_46 REAL NOT NULL,
    hog_47 REAL NOT NULL,
    hog_48 REAL NOT NULL,
    hog_49 REAL NOT NULL,
    lbp_0 REAL NOT NULL,
    lbp_1 REAL NOT NULL,
    lbp_2 REAL NOT NULL,
    lbp_3 REAL NOT NULL,
    lbp_4 REAL NOT NULL,
    lbp_5 REAL NOT NULL,
    lbp_6 REAL NOT NULL,
    lbp_7 REAL NOT NULL,
    lbp_8 REAL NOT NULL,
    lbp_9 REAL NOT NULL,
    glcm_contrast REAL NOT NULL,
    glcm_dissimilarity REAL NOT NULL,
    glcm_homogeneity REAL NOT NULL,
    glcm_energy REAL NOT NULL,
    glcm_correlation REAL NOT NULL,
    glcm_ASM REAL NOT NULL,
    fft_energy REAL NOT NULL,
    orb_keypoints INTEGER NOT NULL,
    blob_count INTEGER NOT NULL,
    FOREIGN KEY (file_path) REFERENCES Images(file_path) ON DELETE CASCADE
  );`);

  /////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////// Prepare les requêtes //////////////////////////////////
  const insertImageStmt = db.prepare(`INSERT INTO Images 
    (file_path, true_label, username)
    VALUES (?, ?, ?)`);

  const insertUserStmt = db.prepare(`INSERT INTO Users 
    (username, email, password, nb_pic, role, points, created_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`);

  const insertFeatureStmt = db.prepare(`INSERT INTO Features_Pics 
    (file_path,  label,  width,  height,  aspect_ratio,  file_size_kb,  avg_r,  var_r,  skew_r,  avg_g,  var_g,  skew_g,  avg_b,  var_b,  skew_b,  h_hist_0,  h_hist_1,  h_hist_2,  h_hist_3,  h_hist_4,  h_hist_5,  h_hist_6,  h_hist_7,  h_hist_8,  h_hist_9,  h_hist_10,  h_hist_11,  h_hist_12,  h_hist_13,  h_hist_14,  h_hist_15,  h_hist_16,  h_hist_17,  h_hist_18,  h_hist_19,  s_hist_0,  s_hist_1,  s_hist_2,  s_hist_3,  s_hist_4,  s_hist_5,  s_hist_6,  s_hist_7,  s_hist_8,  s_hist_9,  s_hist_10,  s_hist_11,  s_hist_12,  s_hist_13,  s_hist_14,  s_hist_15,  s_hist_16,  s_hist_17,  s_hist_18,  s_hist_19,  v_hist_0,  v_hist_1,  v_hist_2,  v_hist_3,  v_hist_4,  v_hist_5,  v_hist_6,  v_hist_7,  v_hist_8,  v_hist_9,  v_hist_10,  v_hist_11,  v_hist_12,  v_hist_13,  v_hist_14,  v_hist_15,  v_hist_16,  v_hist_17,  v_hist_18,  v_hist_19,  gray_hist_0,  gray_hist_1,  gray_hist_2,  gray_hist_3,  gray_hist_4,  gray_hist_5,  gray_hist_6,  gray_hist_7,  gray_hist_8,  gray_hist_9,  gray_hist_10,  gray_hist_11,  gray_hist_12,  gray_hist_13,  gray_hist_14,  gray_hist_15,  gray_hist_16,  gray_hist_17,  gray_hist_18,  gray_hist_19,  lum_hist_0,  lum_hist_1,  lum_hist_2,  lum_hist_3,  lum_hist_4,  lum_hist_5,  lum_hist_6,  lum_hist_7,  lum_hist_8,  lum_hist_9,  lum_hist_10,  lum_hist_11,  lum_hist_12,  lum_hist_13,  lum_hist_14,  lum_hist_15,  lum_hist_16,  lum_hist_17,  lum_hist_18,  lum_hist_19,  contrast,  laplacian_var,  canny_count,  sobel_count,  edge_density,  center_edge,  surround_edge,  hog_0,  hog_1,  hog_2,  hog_3,  hog_4,  hog_5,  hog_6,  hog_7,  hog_8,  hog_9,  hog_10,  hog_11,  hog_12,  hog_13,  hog_14,  hog_15,  hog_16,  hog_17,  hog_18,  hog_19,  hog_20,  hog_21,  hog_22,  hog_23,  hog_24,  hog_25,  hog_26,  hog_27,  hog_28,  hog_29,  hog_30,  hog_31,  hog_32,  hog_33,  hog_34,  hog_35,  hog_36,  hog_37,  hog_38,  hog_39,  hog_40,  hog_41,  hog_42,  hog_43,  hog_44,  hog_45,  hog_46,  hog_47,  hog_48,  hog_49,  lbp_0,  lbp_1,  lbp_2,  lbp_3,  lbp_4,  lbp_5,  lbp_6,  lbp_7,  lbp_8,  lbp_9,  glcm_contrast,  glcm_dissimilarity,  glcm_homogeneity,  glcm_energy,  glcm_correlation,  glcm_ASM,  fft_energy,  orb_keypoints,  blob_count)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);


  /////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////// Function  //////////////////////////////////
  let doneCount = 0;

  function checkDone() {
    doneCount++;
    if (doneCount === 2) {
      console.log("✅ Import terminé !");
      db.all("SELECT COUNT(*) AS count FROM Images", (_, rows) => {
        console.log(`🖼️ Total images insérées : ${rows[0].count}`);
      });
      db.all("SELECT COUNT(*) AS count FROM Users", (_, rows) => {
        console.log(`👤 Total utilisateurs insérés : ${rows[0].count}`);
      });
      db.all("SELECT COUNT(*) AS count FROM Features_Pics", (_, rows) => {
        console.log(`🔍 Total caractéristiques d'images insérées : ${rows[0].count}`);
      });
      db.close();
    }
  }

  async function hashPassword(password) {
    return await bcrypt.hash(password,5);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////// Importer les données //////////////////////////////////


  fs.createReadStream('../uploaded_image_features.csv')
    .pipe(csv())
    .on('data', (row) => {
      insertImageStmt.run(
        row.file,
        row.label,
        'anonymous',
        (err) => {
          if (err && err.code === 'SQLITE_CONSTRAINT') {
            console.error('❌ Erreur image :', err.message);
        }}
      );
    })
    .on('end', () => {
      insertImageStmt.finalize();
      checkDone();
    });


  // Importer les utilisateurs

  const usersToInsert = [];

  fs.createReadStream('./users.csv')
    .pipe(csv())
    .on('data', (row) => {
    usersToInsert.push(row);
    })  
    .on('end', async () => {
    for (const row of usersToInsert) {
      try {
        const hash = await hashPassword(row.password);
        insertUserStmt.run(
          row.username,
          row.email,
          hash,
          parseInt(row.nb_pic),
          row.role,
          parseFloat(row.points),
          (err) => {
            if (err) {
              console.error(`❌ Erreur utilisateur : ${row.username}`, err.message);
            }
          }
        );
      } catch (error) {
        console.error('Error hashing password for user:', row.username, error);
      }
    }
    insertUserStmt.finalize();
    checkDone();
  });

  // Importer les caractéristiques des images
  fs.createReadStream('../uploaded_image_features.csv')
    .pipe(csv())
    .on('data', (row) => {
      insertFeatureStmt.run( 
        row.file,
        row.label,
        parseInt(row.width),
        parseInt(row.height),
        parseFloat(row.aspect_ratio),
        parseFloat(row.file_size_kb),
        parseFloat(row.avg_r),
        parseFloat(row.var_r),
        parseFloat(row.skew_r),
        parseFloat(row.avg_g),
        parseFloat(row.var_g),
        parseFloat(row.skew_g),
        parseFloat(row.avg_b),
        parseFloat(row.var_b),
        parseFloat(row.skew_b),
        parseInt(row.h_hist_0),
        parseInt(row.h_hist_1),
        parseInt(row.h_hist_2),
        parseInt(row.h_hist_3),
        parseInt(row.h_hist_4),
        parseInt(row.h_hist_5),
        parseInt(row.h_hist_6),
        parseInt(row.h_hist_7),
        parseInt(row.h_hist_8),
        parseInt(row.h_hist_9),
        parseInt(row.h_hist_10),
        parseInt(row.h_hist_11),
        parseInt(row.h_hist_12),
        parseInt(row.h_hist_13),
        parseInt(row.h_hist_14),
        parseInt(row.h_hist_15),
        parseInt(row.h_hist_16),
        parseInt(row.h_hist_17),
        parseInt(row.h_hist_18),
        parseInt(row.h_hist_19),
        parseInt(row.s_hist_0),
        parseInt(row.s_hist_1),
        parseInt(row.s_hist_2),
        parseInt(row.s_hist_3),
        parseInt(row.s_hist_4),
        parseInt(row.s_hist_5),
        parseInt(row.s_hist_6),
        parseInt(row.s_hist_7),
        parseInt(row.s_hist_8),
        parseInt(row.s_hist_9),
        parseInt(row.s_hist_10),
        parseInt(row.s_hist_11),
        parseInt(row.s_hist_12),
        parseInt(row.s_hist_13),
        parseInt(row.s_hist_14),
        parseInt(row.s_hist_15),
        parseInt(row.s_hist_16),
        parseInt(row.s_hist_17),
        parseInt(row.s_hist_18),
        parseInt(row.s_hist_19),
        parseInt(row.v_hist_0),
        parseInt(row.v_hist_1),
        parseInt(row.v_hist_2),
        parseInt(row.v_hist_3),
        parseInt(row.v_hist_4),
        parseInt(row.v_hist_5),
        parseInt(row.v_hist_6),
        parseInt(row.v_hist_7),
        parseInt(row.v_hist_8),
        parseInt(row.v_hist_9),
        parseInt(row.v_hist_10),
        parseInt(row.v_hist_11),
        parseInt(row.v_hist_12),
        parseInt(row.v_hist_13),
        parseInt(row.v_hist_14),
        parseInt(row.v_hist_15),
        parseInt(row.v_hist_16),
        parseInt(row.v_hist_17),
        parseInt(row.v_hist_18),
        parseInt(row.v_hist_19),
        parseInt(row.gray_hist_0),
        parseInt(row.gray_hist_1),
        parseInt(row.gray_hist_2),
        parseInt(row.gray_hist_3),
        parseInt(row.gray_hist_4),
        parseInt(row.gray_hist_5),
        parseInt(row.gray_hist_6),
        parseInt(row.gray_hist_7),
        parseInt(row.gray_hist_8),
        parseInt(row.gray_hist_9),
        parseInt(row.gray_hist_10),
        parseInt(row.gray_hist_11),
        parseInt(row.gray_hist_12),
        parseInt(row.gray_hist_13),
        parseInt(row.gray_hist_14),
        parseInt(row.gray_hist_15),
        parseInt(row.gray_hist_16),
        parseInt(row.gray_hist_17),
        parseInt(row.gray_hist_18),
        parseInt(row.gray_hist_19),
        parseInt(row.lum_hist_0),
        parseInt(row.lum_hist_1),
        parseInt(row.lum_hist_2),
        parseInt(row.lum_hist_3),
        parseInt(row.lum_hist_4),
        parseInt(row.lum_hist_5),
        parseInt(row.lum_hist_6),
        parseInt(row.lum_hist_7),
        parseInt(row.lum_hist_8),
        parseInt(row.lum_hist_9),
        parseInt(row.lum_hist_10),
        parseInt(row.lum_hist_11),
        parseInt(row.lum_hist_12),
        parseInt(row.lum_hist_13),
        parseInt(row.lum_hist_14),
        parseInt(row.lum_hist_15),
        parseInt(row.lum_hist_16),
        parseInt(row.lum_hist_17),
        parseInt(row.lum_hist_18),
        parseInt(row.lum_hist_19),
        parseInt(row.contrast),
        parseFloat(row.laplacian_var),
        parseInt(row.canny_count),
        parseInt(row.sobel_count),
        parseFloat(row.edge_density),
        parseInt(row.center_edge),
        parseInt(row.surround_edge),
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
        parseFloat(row.glcm_contrast),
        parseFloat(row.glcm_dissimilarity),
        parseFloat(row.glcm_homogeneity),
        parseFloat(row.glcm_energy),
        parseFloat(row.glcm_correlation),
        parseFloat(row.glcm_ASM),
        parseFloat(row.fft_energy),
        parseInt(row.orb_keypoints),
        parseInt(row.blob_count),
        (err) => {
          if (err) {
            console.error(`❌ Erreur caractéristiques image : ${row.file}`, err.message);
          }
        }
        );
    })
    .on('end', () => {
      insertFeatureStmt.finalize();
      checkDone();
    });

});
///////////////////////////////////////////////////////////////////////////////////////////////
