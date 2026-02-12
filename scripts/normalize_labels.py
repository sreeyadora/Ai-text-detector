import pandas as pd

# Load dataset
df = pd.read_csv("backup_before_retraining/dataset_original.csv")

# Normalize labels
label_map = {
    "human": "Human",
    "ai": "AI",
    "rewritten": "LLM-Rewritten"
}

df["label"] = df["label"].map(label_map)

# Sanity check
if df["label"].isna().any():
    raise ValueError("❌ Unknown labels found after mapping")

# Save normalized dataset
df.to_csv("dataset_normalized.csv", index=False)

print("✅ Labels normalized")
print(df["label"].value_counts())
