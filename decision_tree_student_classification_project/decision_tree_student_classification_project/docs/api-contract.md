# API Contract

## POST /api/auth/login
Request:
```json
{"username":"admin","password":"password"}
```

## POST /api/datasets
Upload dataset CSV penelitian/implementasi.

## GET /api/datasets
Mengambil daftar dataset.

## POST /api/models/train
Memulai pemodelan C4.5 atau Random Forest.

```json
{
  "dataset_id": 1,
  "algorithm": "C4.5",
  "validation": "random_10_fold"
}
```

## GET /api/models/{id}/evaluation
Mengambil confusion matrix dan metrik evaluasi.

## GET /api/models/{id}/rules
Mengambil rule IF-THEN dari model C4.5.

## POST /api/predictions/single
Melakukan Single Record Test.

```json
{
  "model_id": 1,
  "jumlah_sesi": 44,
  "nilai_rata_rata": 95,
  "kelas_actual": "A"
}
```

Response:
```json
{
  "predicted_class": "A",
  "actual_class": "A",
  "match": true
}
```

## POST /api/predictions/csv
Melakukan Multi Record Test dari CSV dan mengembalikan hasil per record.
