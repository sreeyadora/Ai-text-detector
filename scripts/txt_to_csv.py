import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FIX = BASE_DIR / "data_fix"

rows = []

for label in ["human", "ai", "rewritten"]:
    for bucket in ["short", "medium", "long"]:
        txt_path = DATA_FIX / label / f"{bucket}.txt"
        if not txt_path.exists():
            continue

        with open(txt_path, encoding="utf-8") as f:
            for line in f:
                text = line.strip()
                if text:
                    rows.append({
                        "text": text,
                        "label": label.capitalize().replace("Rewritten", "LLM-Rewritten"),
                        "bucket": bucket,
                        "word_count": len(text.split())
                    })

df = pd.DataFrame(rows)

output = BASE_DIR / "data_fix" / "raw_data_preview.csv"
df.to_csv(output, index=False)

print(f"✅ CSV created at: {output.resolve()}")
print(df.groupby(["bucket", "label"]).size())
