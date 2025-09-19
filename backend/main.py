from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os, uuid, json, datetime, requests
from dotenv import load_dotenv

from sqlmodel import SQLModel, Field, create_engine, Session, select

# ==============================
# Database Setup
# ==============================
DATABASE_URL = "sqlite:///./backend.db"
engine = create_engine(DATABASE_URL, echo=False)

class Detection(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    disease: str
    confidence: float
    timestamp: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

class Preference(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    selected_district: Optional[str] = None
    selected_crops: Optional[str] = None  # comma separated
    notifications: Optional[str] = None   # JSON string

class ChatMessage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    message: str
    reply: str
    timestamp: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

# ==============================
# App Initialization
# ==============================
app = FastAPI(title="Farmwise Kisan Sathi API (FastAPI)")

# Load environment variables (API keys etc.)
load_dotenv()
API_KEY = os.getenv("TOMORROW_API_KEY")

# Enable CORS for frontend (Vite runs on port 5173 by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],  # dev setup
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    os.makedirs("./uploads", exist_ok=True)

# ==============================
# Root
# ==============================
@app.get("/")
def root():
    return {"message": "Farmwise Kisan Sathi API - FastAPI backend is running."}

# ==============================
# Detection Endpoint
# ==============================
@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    """
    Accepts an image file and returns a simulated disease detection result.
    Saves the file to ./uploads and stores the result into SQLite DB.
    """
    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty file")

    ext = os.path.splitext(file.filename)[1] or ".jpg"
    uid = f"{uuid.uuid4()}{ext}"
    dest = os.path.join("uploads", uid)
    with open(dest, "wb") as fh:
        fh.write(contents)

    # Simulate analysis result (replace with real ML model inference later)
    disease = "Leaf Blight"
    confidence = 0.92

    with Session(engine) as session:
        det = Detection(filename=uid, disease=disease, confidence=confidence)
        session.add(det)
        session.commit()
        session.refresh(det)
        return {
            "id": det.id,
            "filename": det.filename,
            "disease": det.disease,
            "confidence": det.confidence,
            "timestamp": det.timestamp.isoformat()
        }

# ==============================
# Chat Endpoint
# ==============================
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    """
    Simple echo chatbot endpoint. Replace logic with real chatbot/LLM integration later.
    """
    message = req.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Empty message")

    # Very simple rule-based reply (placeholder)
    reply = f"Received: {message} — (this is a placeholder reply from backend)"
    with Session(engine) as session:
        chat = ChatMessage(message=message, reply=reply)
        session.add(chat)
        session.commit()
        session.refresh(chat)
    return {"reply": reply, "id": chat.id, "timestamp": chat.timestamp.isoformat()}

# ==============================
# History Endpoints
# ==============================
@app.get("/history/detections")
def list_detections(limit: int = 50):
    with Session(engine) as session:
        stmt = select(Detection).order_by(Detection.timestamp.desc()).limit(limit)
        results = session.exec(stmt).all()
        return results

@app.get("/history/chats")
def list_chats(limit: int = 50):
    with Session(engine) as session:
        stmt = select(ChatMessage).order_by(ChatMessage.timestamp.desc()).limit(limit)
        results = session.exec(stmt).all()
        return results

# ==============================
# Preferences Endpoints
# ==============================
class PreferenceIn(BaseModel):
    selected_district: Optional[str] = None
    selected_crops: Optional[List[str]] = None
    notifications: Optional[dict] = None

@app.post("/preferences")
def set_preferences(p: PreferenceIn):
    with Session(engine) as session:
        row = Preference(
            selected_district=p.selected_district,
            selected_crops=",".join(p.selected_crops) if p.selected_crops else None,
            notifications=json.dumps(p.notifications) if p.notifications else None
        )
        session.add(row)
        session.commit()
        session.refresh(row)
        return row

@app.get("/preferences")
def get_preferences(limit: int = 20):
    with Session(engine) as session:
        stmt = select(Preference).order_by(Preference.id.desc()).limit(limit)
        return session.exec(stmt).all()

# ==============================
# Weather Endpoint (Tomorrow.io)
# ==============================
@app.get("/weather")
def get_weather(lat: float = 19.9975, lon: float = 73.7898):
    """
    Fetch weather forecast (daily) from Tomorrow.io API.
    """
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not set")

    url = (
        f"https://api.tomorrow.io/v4/weather/forecast"
        f"?location={lat},{lon}&timesteps=daily&units=metric&apikey={API_KEY}"
    )

    headers = {"accept": "application/json"}

    try:
        r = requests.get(url, headers=headers, timeout=10)
        r.raise_for_status()
        return r.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))
