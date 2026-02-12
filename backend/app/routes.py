from fastapi import APIRouter, UploadFile, File, HTTPException
from app.model import predict_text
from app.schemas import TextRequest
from app.history_store import get_history, add_history

from PyPDF2 import PdfReader
import docx

router = APIRouter(prefix="/api", tags=["Prediction"])

# HEALTH CHECK

@router.get("/health")
def health():
    return {"status": "ok"}

# TEXT PREDICTION (PRIMARY FLOW)

@router.post("/predict")
def predict(request: TextRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Text is empty"
        )

    result = predict_text(request.text)

    # Ensure keys exist
    result.setdefault("shap", [])
    result.setdefault("stylometry", {})

    # Save to history
    add_history(
        request.text,
        result["label"],
        result["confidence"]
    )

    return result


# FILE PREDICTION 
# NOTE:
# This endpoint is intentionally kept even though
# the frontend upload UI is removed.
# It demonstrates extensibility of the system.

@router.post("/predict-file")
async def predict_file(file: UploadFile = File(...)):
    filename = file.filename.lower()
    text = ""

    if filename.endswith(".txt"):
        content = await file.read()
        text = content.decode("utf-8", errors="ignore")

    elif filename.endswith(".pdf"):
        reader = PdfReader(file.file)
        pages = [p.extract_text() for p in reader.pages if p.extract_text()]
        text = " ".join(pages)

    elif filename.endswith(".docx"):
        doc = docx.Document(file.file)
        text = " ".join(p.text for p in doc.paragraphs if p.text)

    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in file"
        )

    result = predict_text(text)

    result.setdefault("shap", [])
    result.setdefault("stylometry", {})

    # Save to history
    add_history(
        text,
        result["label"],
        result["confidence"]
    )

    return result


# HISTORY
@router.get("/history")
def history():
    return get_history()
