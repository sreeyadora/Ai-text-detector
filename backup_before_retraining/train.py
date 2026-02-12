import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from pathlib import Path

from src.features.stylometric import StylometricExtractor
from src.features.transformer import TransformerFeatureExtractor
from src.models.hybrid_model import HybridTextClassifier


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)


def train_model():
    print("📥 Loading dataset...")
    df = pd.read_csv(DATA_DIR / "dataset.csv")

    # Normalize labels
    label_map = {
        "ai": "ai_generated",
        "rewritten": "ai_rewritten",
        "human": "human"
    }
    df["label"] = df["label"].replace(label_map)

    print(f"Dataset size: {len(df)}")
    print("Label distribution:")
    print(df["label"].value_counts())

    # Encode labels
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(df["label"])

    # Feature extractors
    stylometric_extractor = StylometricExtractor()
    transformer_extractor = TransformerFeatureExtractor()

    print("\n🔍 Extracting stylometric features...")
    X_style = np.array([
        list(stylometric_extractor.extract_features(text).values())
        for text in df["text"]
    ])

    print("🤖 Extracting transformer embeddings...")
    X_trans = []
    for i, text in enumerate(df["text"]):
        if i % 100 == 0:
            print(f"Processed {i}/{len(df)}")
        X_trans.append(transformer_extractor.extract_features(text))
    X_trans = np.array(X_trans)

    # Train-test split
    (
        X_style_train,
        X_style_test,
        X_trans_train,
        X_trans_test,
        y_train,
        y_test,
    ) = train_test_split(
        X_style,
        X_trans,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    print("\n🧠 Training hybrid model...")
    model = HybridTextClassifier()
    model.fit(X_style_train, X_trans_train, y_train)

    preds = model.predict(X_style_test, X_trans_test)
    acc = np.mean(preds == y_test)
    print(f"\n✅ Test Accuracy: {acc:.4f}")

    print("\n💾 Saving model artifacts...")
    model.save(MODEL_DIR / "hybrid_model")
    label_encoder_path = MODEL_DIR / "label_encoder.pkl"

    import joblib
    joblib.dump(label_encoder, label_encoder_path)

    print("🎉 Training complete!")
    print(f"Saved to: {MODEL_DIR}")


if __name__ == "__main__":
    train_model()
