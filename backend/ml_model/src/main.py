from fastapi import FastAPI

app = FastAPI(title="AI Text Detector API")

@app.get("/")
def root():
    return {"message": "AI Text Detector Backend Running 🚀"}
