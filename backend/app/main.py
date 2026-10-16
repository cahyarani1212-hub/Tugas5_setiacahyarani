
from io import StringIO

import pandas as pd
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

app = FastAPI(
    title="Decision Tree Student Classification API",
    version="1.0.0",
    description="Prototype klasifikasi peserta didik"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
dataset = None
model = None
evaluation = None
features = ["JUMLAH_SESI", "NILAI_RATA-RATA"]
target = "KELAS"


class StudentInput(BaseModel):
    jumlah_sesi: float = Field(ge=0)
    nilai_rata_rata: float = Field(ge=0, le=100)


@app.get("/")
def home():
    return {
        "message": "Decision Tree Student Classification API",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/datasets/upload")
async def upload_dataset(file: UploadFile = File(...)):
    global dataset, model, evaluation

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(400, "File harus berformat CSV")

    content = await file.read()

    try:
        df = pd.read_csv(StringIO(content.decode("utf-8-sig")))
    except Exception:
        raise HTTPException(400, "CSV tidak dapat dibaca")

    missing = set(features + [target]) - set(df.columns)
    if missing:
        raise HTTPException(
            400,
            {"message": "Kolom wajib tidak tersedia",
             "missing_columns": sorted(missing)}
        )

    if df.empty:
        raise HTTPException(400, "Dataset tidak boleh kosong")

    df = df[features + [target]].copy()

    for col in features:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.dropna()

    if len(df) < 5:
        raise HTTPException(
            400, "Minimal 5 baris data valid untuk prototype ini"
        )

    if df[target].nunique() < 2:
        raise HTTPException(
            400, "Dataset harus memiliki minimal 2 kelas"
        )

    dataset = df
    model = None
    evaluation = None

    return {
        "message": "Dataset berhasil dimuat",
        "rows": len(df),
        "columns": list(df.columns)
    }


@app.get("/api/datasets")
def get_dataset():
    if dataset is None:
        return {"items": [], "total": 0}

    return {
        "items": dataset.head(20).to_dict(orient="records"),
        "total": len(dataset)
    }


@app.post("/api/models/train")
def train_model():
    global model, evaluation

    if dataset is None:
        raise HTTPException(400, "Unggah dataset terlebih dahulu")

    X = dataset[features]
    y = dataset[target]

    try:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
    except ValueError as exc:
        raise HTTPException(
            400, f"Data tidak cukup untuk membagi kelas: {exc}"
        )

    trained_model = DecisionTreeClassifier(random_state=42)
    trained_model.fit(X_train, y_train)

    predictions = trained_model.predict(X_test)
    score = accuracy_score(y_test, predictions)

    model = trained_model
    evaluation = {
        "accuracy": round(float(score), 4),
        "test_rows": len(y_test),
        "features": features,
        "target": target
    }

    return {
        "message": "Model Decision Tree berhasil dilatih",
        **evaluation
    }


@app.get("/api/models/evaluation")
def get_evaluation():
    if evaluation is None:
        raise HTTPException(404, "Evaluasi belum tersedia; latih model dahulu")
    return evaluation


@app.post("/api/predictions/single")
def predict_student(student: StudentInput):
    if model is None:
        raise HTTPException(400, "Latih model terlebih dahulu")

    row = pd.DataFrame([{
        "JUMLAH_SESI": student.jumlah_sesi,
        "NILAI_RATA-RATA": student.nilai_rata_rata
    }])

    prediction = model.predict(row)[0]

    return {
        "predicted_class": str(prediction),
        "input": student.model_dump()
    }
