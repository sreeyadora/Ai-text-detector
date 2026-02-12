import numpy as np
import joblib
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder

class HybridTextClassifier:
    """Hybrid model combining stylometric and transformer features"""

    def __init__(self):
        self.model = GradientBoostingClassifier(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()

    def fit(self, stylometric_features, transformer_features, labels):
        X = np.hstack([stylometric_features, transformer_features])
        y = self.label_encoder.fit_transform(labels)

        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        return self

    def predict(self, stylometric_features, transformer_features):
        X = np.hstack([stylometric_features, transformer_features])
        X_scaled = self.scaler.transform(X)
        preds = self.model.predict(X_scaled)
        return self.label_encoder.inverse_transform(preds)

    def predict_proba(self, stylometric_features, transformer_features):
        X = np.hstack([stylometric_features, transformer_features])
        X_scaled = self.scaler.transform(X)
        return self.model.predict_proba(X_scaled)

    def save(self, path_prefix):
        joblib.dump(self.model, f"{path_prefix}_model.pkl")
        joblib.dump(self.scaler, f"{path_prefix}_scaler.pkl")
        joblib.dump(self.label_encoder, f"{path_prefix}_encoder.pkl")

    def load(self, path_prefix):
        self.model = joblib.load(f"{path_prefix}_model.pkl")
        self.scaler = joblib.load(f"{path_prefix}_scaler.pkl")
        self.label_encoder = joblib.load(f"{path_prefix}_encoder.pkl")
