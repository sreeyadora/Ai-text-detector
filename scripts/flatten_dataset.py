import pandas as pd

# Load original dataset
df = pd.read_csv("backup_before_retraining/dataset_original.csv")

rows = []

for _, row in df.iterrows():

    # -------- Human text --------
    if pd.notna(row["human_text"]) and str(row["human_text"]).strip():
        rows.append({
            "text": row["human_text"],
            "label": "Human",
            "source": row.get("topic", "unknown"),
            "length_type": row["text_length"]
        })

    # -------- AI generated text --------
    if pd.notna(row["ai_generated_text"]) and str(row["ai_generated_text"]).strip():
        rows.append({
            "text": row["ai_generated_text"],
            "label": "AI",
            "source": row.get("model_used_for_ai_generation", "ai"),
            "length_type": row["text_length"]
        })

    # -------- LLM rewritten text --------
    if pd.notna(row["llm_rewritten_human_text"]) and str(row["llm_rewritten_human_text"]).strip():
        rows.append({
            "text": row["llm_rewritten_human_text"],
            "label": "LLM-Rewritten",
            "source": row.get("rewrite_prompt", "rewrite"),
            "length_type": row["text_length"]
        })

# Create flattened dataset
flat_df = pd.DataFrame(rows)

# Save
flat_df.to_csv("dataset_flat.csv", index=False)

print("✅ Flattening complete")
print("Total rows:", len(flat_df))
print("\nLabel distribution:")
print(flat_df["label"].value_counts())
