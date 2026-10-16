FRONTEND WEB - DECISION TREE STUDENT CLASSIFICATION

Isi folder:
- index.html : struktur halaman
- style.css  : desain responsif
- app.js     : integrasi dengan backend FastAPI

CARA MENJALANKAN (Windows + VS Code)
1. Ekstrak folder frontend ke dalam folder proyek yang berisi folder backend.
   Contoh:
   decision_tree_student_classification_project/
     backend/
     frontend/
2. Jalankan backend di terminal pertama:
   cd backend
   python -m uvicorn app.main:app --reload
3. Pastikan backend tersedia di http://127.0.0.1:8000/health
4. Buka folder frontend di VS Code, klik kanan index.html lalu pilih
   "Open with Live Server" (jika ekstensi Live Server sudah terpasang).
5. Frontend biasanya terbuka di http://127.0.0.1:5500.
6. Jika browser menampilkan error CORS, ikuti instruksi di bawah.

CORS (hanya jika muncul error CORS)
Buka backend/app/main.py. Tambahkan import:
    from fastapi.middleware.cors import CORSMiddleware

Setelah baris app = FastAPI(...), tambahkan:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://127.0.0.1:5500",
            "http://localhost:5500",
        ],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

Simpan file. Uvicorn --reload biasanya memulai ulang backend otomatis.
Jika port Live Server berbeda, tambahkan origin yang muncul di browser.

Catatan:
- Dataset/model pada backend saat ini disimpan dalam memori dan akan hilang saat server dimulai ulang.
- Dataset demo 24 baris bersifat sintetis.
- Model adalah scikit-learn DecisionTreeClassifier, bukan implementasi C4.5 persis.
