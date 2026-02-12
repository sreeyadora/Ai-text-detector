from fastapi import UploadFile
import pdfplumber
import docx

async def extract_text_from_file(file: UploadFile) -> str:
    filename = file.filename.lower()

    if filename.endswith(".txt"):
        content = await file.read()
        return content.decode("utf-8", errors="ignore")

    elif filename.endswith(".pdf"):
        text = ""
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text

    elif filename.endswith(".docx"):
        document = docx.Document(file.file)
        return "\n".join(p.text for p in document.paragraphs)

    else:
        raise ValueError("Unsupported file type")
