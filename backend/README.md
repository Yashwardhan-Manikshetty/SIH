FastAPI backend scaffold for Farmwise Kisan Sathi
==================================================

Files created:
- backend/main.py        (FastAPI app, sqlite persistence, detection/chat endpoints)
- backend/requirements.txt

How to run (from project root or backend dir):
1. Create a virtualenv (recommended)
   python -m venv .venv
   source .venv/bin/activate   # Linux / macOS
   .venv\Scripts\activate    # Windows PowerShell

2. Install requirements
   pip install -r backend/requirements.txt

3. Run server
   uvicorn backend.main:app --reload --port 8000

API endpoints:
- GET /                 -> health check
- POST /detect          -> accepts image file upload (form-data) -> returns simulated detection
- POST /chat            -> accepts JSON {message: str} -> returns simple reply
- GET /history/detections -> list recent detection records
- GET /history/chats   -> list recent chat messages
- POST /preferences    -> save user preferences (JSON)
- GET /preferences     -> list saved preferences

Notes:
- This scaffold uses SQLite (backend.db) to persist simple records.
- The detection endpoint currently returns a simulated result; you can replace the placeholder with real model inference later.
