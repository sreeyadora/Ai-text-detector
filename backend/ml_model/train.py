import pandas as pd
import numpy as np
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack, csr_matrix

from src.features.stylometric import StylometricExtractor

# ==================================================
# Paths (LOCKED & CORRECT)
# ==================================================

BASE_DIR = Path(__file__).resolve().parent.parent          # backend/
PROJECT_ROOT = BASE_DIR.parent                             # ai-text-detector/
DATA_PATH = PROJECT_ROOT / "dataset_balanced.csv"          # ✅ FIXED

MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

print("📁 Saving models to:", MODEL_DIR.resolve())
print("📄 Training dataset:", DATA_PATH.resolve())

# ==================================================
# Load dataset
# ==================================================

df = pd.read_csv(DATA_PATH)

print("\nDataset loaded:", df.shape)
print(df["label"].value_counts())

# ==================================================
# Encode labels
# ==================================================

label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df["label"])

joblib.dump(label_encoder, MODEL_DIR / "label_encoder.pkl")

# ==================================================
# Stylometric features
# ==================================================

stylometric_extractor = StylometricExtractor()

X_style_dense = np.array([
    list(stylometric_extractor.extract_features(text).values())
    for text in df["text"]
])

X_style = csr_matrix(X_style_dense)

print("Stylometric feature shape:", X_style.shape)

# ==================================================
# TF-IDF features (CLEAN & CONTROLLED)
# ==================================================

tfidf = TfidfVectorizer(
    ngram_range=(1, 3),
    max_features=20000,     # ✅ reduced
    min_df=3,
    stop_words="english"
)

X_tfidf = tfidf.fit_transform(df["text"])

joblib.dump(tfidf, MODEL_DIR / "tfidf_vectorizer.pkl")

print("TF-IDF feature shape:", X_tfidf.shape)

# ==================================================
# Combine features
# ==================================================

X = hstack([X_tfidf, X_style])

print("Final feature matrix shape:", X.shape)

# ==================================================
# Train / validation split
# ==================================================

X_train, X_val, y_train, y_val = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ==================================================
# Model
# ==================================================

model = RandomForestClassifier(
    n_estimators=400,
    min_samples_leaf=2,
    class_weight="balanced",
    n_jobs=-1,
    random_state=42
)

model.fit(X_train, y_train)

# ==================================================
# Evaluation
# ==================================================

y_pred = model.predict(X_val)

print("\n📊 Classification Report:\n")
print(classification_report(
    y_val,
    y_pred,
    target_names=label_encoder.classes_
))

# ==================================================
# Save model
# ==================================================

joblib.dump(model, MODEL_DIR / "text_origin_model.pkl")

print("\n✅ FINAL TRAINING COMPLETE")
print("📦 Files saved:")
print(" - text_origin_model.pkl")
print(" - tfidf_vectorizer.pkl")
print(" - label_encoder.pkl")
