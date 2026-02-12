🧠 OriginAI — AI vs Human Text Detection Platform
Know the true origin of every text.

🧠 Multi-Class AI Text Detection System that classifies text as Human-Written, AI-Generated, or LLM-Rewritten using Stylometry + Machine Learning + SHAP Explainability. Built with FastAPI & Next.js.

OriginAI is a full-stack AI detection platform that classifies whether a given piece of text is:

🧑 Human-Written

🤖 AI-Generated

✍️ LLM-Rewritten

The system uses a hybrid approach combining stylometric features, machine learning models, and explainable AI (SHAP) to provide transparent and interpretable predictions.

This project was developed as a final-year research-oriented system with an interactive web dashboard, analysis history, transparency features, and real-time predictions.

✨ Key Features

🔍 Hybrid AI Detection — Stylometry + ML Classifiers

📊 Confidence Scores — Probabilistic Predictions

🧠 Explainable AI — SHAP-based Word Importance

⚡ Instant Results — Real-time Inference

📂 Text & File Upload Support

🕘 Analysis History Dashboard

🎨 Theme Switching (Light/Dark Mode)

🌐 Modern Web UI with Next.js

🚀 FastAPI Backend

🖥️ System Architecture

'''
Frontend (Next.js)
        |
        v
FastAPI Backend
        |
        v
Hybrid Detection Engine
 ├─ Stylometric Feature Extractor
 ├─ TF-IDF / Embeddings
 ├─ ML Classifiers
 └─ SHAP Explainer
        |
        v
Prediction + Confidence Scores
'''


📸 Screenshots

Create a folder in your repository:
/screenshots/

🏠 Landing Page
![Landing Page][WhatsApp Image 2026-01-18 at 3 25 29 PM (1)](https://github.com/user-attachments/assets/e2724abb-cd0b-4cc4-bf41-6e17f12299d0)

🤔 Why OriginAI?
![Why OriginAI][WhatsApp Image 2026-01-18 at 3 25 49 PM (1)](https://github.com/user-attachments/assets/cf21162a-57d0-4e48-b570-d30e3c6638b1)

📊 Analysis Dashboard
![Dashboard][WhatsApp Image 2026-01-18 at 3 26 19 PM (1)](https://github.com/user-attachments/assets/cf1f37c7-3e99-486a-bc8d-dd0edf6317a5)

⚙️ Settings Page
![Settings][WhatsApp Image 2026-01-18 at 3 26 41 PM (1)](https://github.com/user-attachments/assets/1061eac1-a368-4629-a481-d056d3c70392)

🕘 History Tracking
![History][WhatsApp Image 2026-01-18 at 3 27 08 PM (1)](https://github.com/user-attachments/assets/9ad7e1d4-e5e5-4fbb-baed-1ece4fe87307)

🧍 Human Prediction Output
![Human Result][WhatsApp Image 2026-01-18 at 3 29 10 PM](https://github.com/user-attachments/assets/442e896f-93cd-41fc-a288-741a687e83a5)

🤖 AI Prediction Output
![AI Result][WhatsApp Image 2026-01-18 at 3 29 48 PM](https://github.com/user-attachments/assets/afad791d-21b1-4ff7-8f4e-7948f775095b)

✍️ LLM-Rewritten Detection
![LLM Rewrite][WhatsApp Image 2026-01-18 at 3 31 28 PM](https://github.com/user-attachments/assets/b8f6d44c-e704-418d-9397-da9d940597be)

🛠️ Tech Stack

🎨 Frontend

Next.js (App Router)

TailwindCSS

Framer Motion

⚙️ Backend

FastAPI

Python

🧠 ML / NLP

Scikit-learn

Pandas / NumPy

SHAP

NLTK / SpaCy

📂 Dataset Pipeline
| File                   | Description                  |
| ---------------------- | ---------------------------- |
| human_chat.csv         | Raw Human Messages           |
| ai_chat.csv            | Raw AI Responses             |
| dataset_final.csv      | Combined Dataset             |
| dataset_balanced.csv   | Balanced Multi-Class Dataset |
| dataset_normalized.csv | Final Modeling Dataset       |

🔄 Detection Pipeline

Input Text
   |
Cleaning & Tokenization
   |
Stylometric Feature Extraction
   |
TF-IDF / Embeddings
   |
Hybrid ML Models
   |
SHAP Explanation
   |
Prediction + Probabilities

🚀 Running the Project Locally

1️⃣ Clone Repository
git clone https://github.com/your-username/originai.git
cd originai

2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:
👉 http://127.0.0.1:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:
👉 http://localhost:3000

📊 Outputs Provided

🔎 Classification Output

AI vs Human vs LLM-Rewrite Probability

Multi-Class Confidence Score

🧠 SHAP Explainability

Word Importance Contribution

Transparent Decision Insight

📈 Stylometric Metrics
Word Count

Average Sentence Length

Lexical Diversity

POS Tag Ratios

Flesch Reading Ease

Capital & Digit Ratio

📈 Research Scope

AI Authorship Attribution

Stylometry in NLP

Explainable Machine Learning

AI Transparency

Academic Integrity Tools

🔮 Future Enhancements
Transformer Models (BERT / RoBERTa)

Multilingual Detection

User Authentication

Cloud Deployment (AWS / GCP)

PDF Batch Uploads

Chrome Extension

Larger & Diverse Dataset

🎓 Academic Use
This project was developed for:

Final Year Engineering Project

NLP Research

IEEE Student Conference Submission

AI Explainability Demonstrations

👩‍💻 Author
Sreeya Dora
B.Tech — Artificial Intelligence & Machine Learning

📜 License
This project is intended for academic and research purposes only.














