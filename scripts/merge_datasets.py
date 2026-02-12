import pandas as pd

# Load datasets
df_main = pd.read_csv("dataset_normalized.csv")
df_human_chat = pd.read_csv("human_chat.csv")
df_ai_chat = pd.read_csv("ai_chat.csv")

# Merge
final_df = pd.concat(
    [df_main, df_human_chat, df_ai_chat],
    ignore_index=True
)

# Shuffle (important to avoid ordering bias)
final_df = final_df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save final dataset
final_df.to_csv("dataset_final.csv", index=False)

print("✅ Final dataset created")
print("Total rows:", len(final_df))
print("\nLabel distribution:")
print(final_df["label"].value_counts())
