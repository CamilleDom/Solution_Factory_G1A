CREATE TABLE image_features (
    file_path TEXT PRIMARY KEY,
    label TEXT,
    width INTEGER,
    height INTEGER,
    file_size_kb REAL,
    avg_r REAL,
    avg_g REAL,
    avg_b REAL,
    contrast REAL,
    canny_edge_count INTEGER,
    sobel_edge_count INTEGER,
    center_edge_count INTEGER,
    surround_edge_count INTEGER,

    -- Gray histogram
    gray_hist_0 INTEGER, gray_hist_1 INTEGER, gray_hist_2 INTEGER, gray_hist_3 INTEGER, gray_hist_4 INTEGER,
    gray_hist_5 INTEGER, gray_hist_6 INTEGER, gray_hist_7 INTEGER, gray_hist_8 INTEGER, gray_hist_9 INTEGER,
    gray_hist_10 INTEGER, gray_hist_11 INTEGER, gray_hist_12 INTEGER, gray_hist_13 INTEGER, gray_hist_14 INTEGER,
    gray_hist_15 INTEGER, gray_hist_16 INTEGER, gray_hist_17 INTEGER, gray_hist_18 INTEGER, gray_hist_19 INTEGER,

    -- Luminance histogram
    lum_hist_0 INTEGER, lum_hist_1 INTEGER, lum_hist_2 INTEGER, lum_hist_3 INTEGER, lum_hist_4 INTEGER,
    lum_hist_5 INTEGER, lum_hist_6 INTEGER, lum_hist_7 INTEGER, lum_hist_8 INTEGER, lum_hist_9 INTEGER,
    lum_hist_10 INTEGER, lum_hist_11 INTEGER, lum_hist_12 INTEGER, lum_hist_13 INTEGER, lum_hist_14 INTEGER,
    lum_hist_15 INTEGER, lum_hist_16 INTEGER, lum_hist_17 INTEGER, lum_hist_18 INTEGER, lum_hist_19 INTEGER,

    -- HOG features
    hog_0 REAL, hog_1 REAL, hog_2 REAL, hog_3 REAL, hog_4 REAL, hog_5 REAL, hog_6 REAL, hog_7 REAL, hog_8 REAL, hog_9 REAL,
    hog_10 REAL, hog_11 REAL, hog_12 REAL, hog_13 REAL, hog_14 REAL, hog_15 REAL, hog_16 REAL, hog_17 REAL, hog_18 REAL, hog_19 REAL,
    hog_20 REAL, hog_21 REAL, hog_22 REAL, hog_23 REAL, hog_24 REAL, hog_25 REAL, hog_26 REAL, hog_27 REAL, hog_28 REAL, hog_29 REAL,
    hog_30 REAL, hog_31 REAL, hog_32 REAL, hog_33 REAL, hog_34 REAL, hog_35 REAL, hog_36 REAL, hog_37 REAL, hog_38 REAL, hog_39 REAL,
    hog_40 REAL, hog_41 REAL, hog_42 REAL, hog_43 REAL, hog_44 REAL, hog_45 REAL, hog_46 REAL, hog_47 REAL, hog_48 REAL, hog_49 REAL,

    -- LBP features
    lbp_0 INTEGER, lbp_1 INTEGER, lbp_2 INTEGER, lbp_3 INTEGER, lbp_4 INTEGER,
    lbp_5 INTEGER, lbp_6 INTEGER, lbp_7 INTEGER, lbp_8 INTEGER, lbp_9 INTEGER
);

-- Indexes for performance
CREATE INDEX idx_label ON image_features(label);
CREATE INDEX idx_contrast ON image_features(contrast);
CREATE INDEX idx_canny_edge_count ON image_features(canny_edge_count);
