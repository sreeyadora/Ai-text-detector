import sys
import numpy as np
import joblib
from pathlib import Path

# ==================================================
# Path setup: make ml_model importable
# ==================================================

BASE_DIR = Path(__file__).resolve().parent.parent
ML_MODEL_DIR = BASE_DIR / "ml_model"

if str(ML_MODEL_DIR) not in sys.path:
    sys.path.insert(0, str(ML_MODEL_DIR))

# ==================================================
# Imports from ml_model
# ==================================================

from src.features.stylometric import StylometricExtractor
from src.features.transformer import TransformerFeatureExtractor

# ==================================================
# Load trained artifacts
# ==================================================

MODEL_DIR = ML_MODEL_DIR / "models"

try:
    model = joblib.load(MODEL_DIR / "hybrid_model_model.pkl")
    scaler = joblib.load(MODEL_DIR / "hybrid_model_scaler.pkl")
except Exception as e:
    print("❌ MODEL LOAD ERROR:", e)
    model = None

# ==================================================
# Class mapping (fixed & documented)
# ==================================================

LABEL_MAP = {
    0: "Human",
    1: "AI",
    2: "LLM-Rewritten"
}

# ==================================================
# Feature extractors (stateless)
# ==================================================

stylometric_extractor = StylometricExtractor()
transformer_extractor = TransformerFeatureExtractor()

# ==================================================
# Internal feature builder
# ==================================================

def _build_features(text: str):
    """
    Extracts and combines stylometric and transformer features
    in the same order used during training.
    """
    style_features = stylometric_extractor.extract_features(text)
    X_style = np.array([list(style_features.values())])

    X_trans = np.array([
        transformer_extractor.extract_features(text)
    ])

    X = np.hstack([X_style, X_trans])
    return scaler.transform(X)

# ==================================================
# Core prediction (uncertainty-aware, publishable)
# ==================================================

def predict_text(text: str):
    """
    Predicts the origin of a short text sample.

    Returns:
    - Human
    - AI
    - LLM-Rewritten
    - Uncertain (when probabilities overlap or confidence is low)
    """

    if model is None or not text or not text.strip():
        return {
            "label": "error",
            "confidence": 0.0
        }

    # Feature extraction
    X_scaled = _build_features(text)

    # Class probabilities
    proba = model.predict_proba(X_scaled)[0]

    # Sort probabilities (descending)
    sorted_indices = np.argsort(proba)[::-1]
    best_idx = int(sorted_indices[0])
    second_idx = int(sorted_indices[1])

    p_max = float(proba[best_idx])
    p_second = float(proba[second_idx])

    # -------------------------------
    # Uncertainty-aware decision rule
    # -------------------------------
    # Rule 1: low absolute confidence
    # Rule 2: weak separation between top classes
    if p_max < 0.70 or (p_max - p_second) < 0.15:
        label = "Uncertain"
    else:
        label = LABEL_MAP.get(best_idx, "Unknown")

    return {
        "label": label,
        "class_id": best_idx,
        "confidence": round(p_max, 4)
    }

# ==================================================
# Long-text / file prediction (chunk + aggregation)
# ==================================================

def predict_long_text(text: str):
    """
    Predicts origin for long documents (PDF, DOCX, TXT)
    by chunking text and aggregating predictions.
    """

    words = text.split()

    # If text is short, use direct prediction
    if len(words) < 120:
        return predict_text(text)

    # Chunking
    chunks = []
    for i in range(0, len(words), 200):
        chunk = " ".join(words[i:i + 200])
        if len(chunk.split()) >= 60:
            chunks.append(chunk)

    if not chunks:
        return predict_text(text)

    labels = []
    confidences = []

    for chunk in chunks:
        result = predict_text(chunk)
        labels.append(result["label"])
        confidences.append(result["confidence"])

    # Majority vote (excluding errors)
    label_counts = {}
    for lbl in labels:
        label_counts[lbl] = label_counts.get(lbl, 0) + 1

    final_label = max(label_counts, key=label_counts.get)
    final_confidence = round(float(sum(confidences) / len(confidences)), 4)

    return {
        "label": final_label,
        "confidence": final_confidence
    }
