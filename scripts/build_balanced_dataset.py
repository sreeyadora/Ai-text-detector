import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FIX = BASE_DIR / "data_fix"

records = []

def load_texts(label, bucket):
    path = DATA_FIX / label / f"{bucket}.txt"
    if not path.exists():
        print(f"⚠️ Missing file: {path}")
        return

    with open(path, encoding="utf-8") as f:
        for line in f:
            text = line.strip()
            if text:
                records.append({
                    "text": text,
                    "label": label.capitalize().replace("Rewritten", "LLM-Rewritten"),
                    "bucket": bucket,
                    "word_count": len(text.split())
                })

for label in ["human", "ai", "rewritten"]:
    for bucket in ["short", "medium", "long"]:
        load_texts(label, bucket)

df = pd.DataFrame(records)

print("\n📊 Dataset summary:")
print(df.groupby(["bucket", "label"]).size().unstack(fill_value=0))

print("\n🔢 Total samples:", len(df))

OUTPUT = BASE_DIR / "dataset_balanced.csv"
df.to_csv(OUTPUT, index=False)

print(f"\n✅ Saved balanced dataset to: {OUTPUT.resolve()}")
