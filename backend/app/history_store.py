from datetime import datetime

_HISTORY = []

def add_history(text, label, confidence):
    _HISTORY.insert(0, {
        "text_preview": text[:120] + "..." if len(text) > 120 else text,
        "label": label,
        "confidence": confidence,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M")
    })

def get_history():
    return _HISTORY
