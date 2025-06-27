CREATE TABLE Users (
    username TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password INTEGER NOT NULL,
    nb_pic INTEGER DEFAULT 0,
    role  ENUM('admin', 'user') DEFAULT 'user' NOT NULL,
    points Real DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
