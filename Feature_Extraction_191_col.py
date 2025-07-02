import os
import cv2
import numpy as np
import pandas as pd
from PIL import Image
from skimage.feature import hog, local_binary_pattern, graycomatrix, graycoprops

# Global Parameters
LBP_RADIUS = 1
LBP_N_POINTS = 8 * LBP_RADIUS
LBP_METHOD = 'uniform'
LBP_N_BINS = LBP_N_POINTS + 2

HOG_PIXELS_PER_CELL = (8, 8)
HOG_CELLS_PER_BLOCK = (2, 2)
HOG_ORIENTATIONS = 9

GLCM_DISTANCES = [1, 2, 4]
GLCM_ANGLES = [0, np.pi/4, np.pi/2, 3*np.pi/4]
GLCM_PROPS = ['contrast', 'dissimilarity', 'homogeneity', 'energy', 'correlation', 'ASM']


def extract_features(img_path, label='unknown'):
    try:
        img = Image.open(img_path)
        w, h = img.size
        img_cv = cv2.imread(img_path)
        img_resized = cv2.resize(img_cv, (128, 128))
        area = w * h

        arr128 = np.array(img.resize((128,128)))
        gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
        hsv = cv2.cvtColor(img_resized, cv2.COLOR_BGR2HSV)

        feat = {
            'file': os.path.relpath(img_path),
            'label': label,
            'width': w,
            'height': h,
            'aspect_ratio': round(w/h, 3),
            'file_size_kb': round(os.path.getsize(img_path)/1024.0, 2),
        }

        for ch,name in enumerate(('r','g','b')):
            vals = arr128[:,:,ch].ravel().astype(np.float32)
            feat[f'avg_{name}']  = vals.mean()
            feat[f'var_{name}']  = vals.var()
            feat[f'skew_{name}'] = ((vals - vals.mean())**3).mean() / (vals.std()**3 + 1e-6)

        for i,ch in enumerate(('h','s','v')):
            hist = cv2.calcHist([hsv],[i],None,[256],[0,256]).flatten()[:20]
            for j,v in enumerate(hist):
                feat[f'{ch}_hist_{j}'] = int(v)

        ghist = cv2.calcHist([gray],[0],None,[256],[0,256]).flatten()[:20]
        for i,v in enumerate(ghist): feat[f'gray_hist_{i}'] = int(v)

        lum = (0.299*arr128[:,:,0] + 0.587*arr128[:,:,1] + 0.114*arr128[:,:,2]).astype(np.uint8)
        lhist = cv2.calcHist([lum],[0],None,[256],[0,256]).flatten()[:20]
        for i,v in enumerate(lhist): feat[f'lum_hist_{i}'] = int(v)

        feat['contrast'] = int(gray.max() - gray.min())
        lap = cv2.Laplacian(gray, cv2.CV_64F)
        feat['laplacian_var'] = float(lap.var())

        can = cv2.Canny(gray,100,200)
        can_cnt = int((can>0).sum())
        sobx= cv2.Sobel(gray,cv2.CV_64F,1,0,ksize=3)
        soby= cv2.Sobel(gray,cv2.CV_64F,0,1,ksize=3)
        sobm= np.sqrt(sobx**2 + soby**2).astype(np.uint8)
        sob_cnt = int((sobm>50).sum())

        feat['canny_count'] = can_cnt
        feat['sobel_count'] = sob_cnt
        feat['edge_density'] = can_cnt / (area + 1e-6)

        cx,cy,half = 64,64,32
        mask = np.zeros_like(gray, bool)
        mask[cy-half:cy+half,cx-half:cx+half]=True
        feat['center_edge'] = int((can[mask]>0).sum())
        feat['surround_edge'] = int((can[~mask]>0).sum())

        hf = hog(gray,
                 orientations=HOG_ORIENTATIONS,
                 pixels_per_cell=HOG_PIXELS_PER_CELL,
                 cells_per_block=HOG_CELLS_PER_BLOCK,
                 block_norm='L2-Hys',
                 feature_vector=True)[:50]
        for i,v in enumerate(hf): feat[f'hog_{i}'] = float(v)

        lbp = local_binary_pattern(gray, LBP_N_POINTS, LBP_RADIUS, method=LBP_METHOD)
        lh, _ = np.histogram(lbp.ravel(), bins=LBP_N_BINS, range=(0,LBP_N_BINS))
        lh = lh.astype(float)/ (lh.sum()+1e-6)
        for i,v in enumerate(lh[:20]): feat[f'lbp_{i}'] = float(v)

        glcm = graycomatrix(gray, distances=GLCM_DISTANCES, angles=GLCM_ANGLES,
                            symmetric=True, normed=True)
        for prop in GLCM_PROPS:
            val = graycoprops(glcm, prop).mean()
            feat[f'glcm_{prop}'] = float(val)

        f = np.fft.fft2(gray)
        fshift = np.fft.fftshift(f)
        mag = np.abs(fshift)
        feat['fft_energy'] = float(np.log1p(mag).sum())

        orb = cv2.ORB_create()
        kp = orb.detect(gray, None)
        feat['orb_keypoints'] = len(kp)

        detector = cv2.SimpleBlobDetector_create()
        blobs = detector.detect(gray)
        feat['blob_count'] = len(blobs)

        return feat

    except Exception as e:
        print(f"Error on {img_path}: {e}")
        return None


# === Function 1: Extract from training set ===
def extract_from_training_set(base_path='data/train', output_csv='features.csv'):
    categories = {
        'with_label/clean': 'clean',
        'with_label/dirty': 'dirty',
        'no_label': 'unknown'
    }
    features = []
    for rel_path, label in categories.items():
        full_dir = os.path.join(base_path, rel_path)
        for fname in os.listdir(full_dir):
            if fname.lower().endswith(('.jpg','.jpeg','.png')):
                img_path = os.path.join(full_dir, fname)
                feat = extract_features(img_path, label)
                if feat: features.append(feat)
    df = pd.DataFrame(features)
    df.to_csv(output_csv, index=False)
    print(f"Extracted {len(df)} features from training set -> {output_csv}")


# === Function 2: Extract from test set ===
def extract_from_test_set(test_path='data/test', output_csv='test_features.csv'):
    features = []
    for fname in os.listdir(test_path):
        if fname.lower().endswith(('.jpg','.jpeg','.png')):
            img_path = os.path.join(test_path, fname)
            feat = extract_features(img_path)
            if feat: features.append(feat)
    df = pd.DataFrame(features)
    df.to_csv(output_csv, index=False)
    print(f"Extracted {len(df)} features from test set -> {output_csv}")


# === Function 3: Extract from one uploaded image ===
def extract_single_image(img_path, output_csv='uploaded_image_features.csv'):
    feat = extract_features(img_path)
    if feat:
        df = pd.DataFrame([feat])
        if os.path.exists(output_csv):
            df_existing = pd.read_csv(output_csv)
            df_combined = pd.concat([df_existing, df], ignore_index=True)
            df_combined.to_csv(output_csv, index=False)
        else:
            df.to_csv(output_csv, index=False)
        print(f"Saved features for uploaded image to {output_csv}")
    else:
        print("No features extracted.")


extract_from_training_set()
extract_from_test_set()
#extract_single_image(r'C:\Users\shari\Downloads\image.jpg')