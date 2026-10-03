from dataclasses import dataclass
from datetime import datetime
from typing import Any

@dataclass
class Dataset:
    id: int
    user_id: int
    name: str
    created_at: datetime

@dataclass
class DatasetRow:
    id: int
    dataset_id: int
    id_siswa: int
    nama_siswa: str
    jumlah_sesi: int
    nilai_rata_rata: float
    kelas: str

@dataclass
class Model:
    id: int
    dataset_id: int
    algorithm: str  # "C4.5" or "Random Forest"
    validation_method: str = "random_10_fold"
    status: str = "trained"

@dataclass
class Evaluation:
    model_id: int
    accuracy: float
    precision_by_class: dict
    recall_by_class: dict
    confusion_matrix: Any

@dataclass
class DecisionRule:
    model_id: int
    rule_order: int
    condition: str
    predicted_class: str

@dataclass
class Prediction:
    model_id: int
    id_siswa: int | None
    jumlah_sesi: float
    nilai_rata_rata: float
    actual_class: str | None
    predicted_class: str
    match_result: bool | None
