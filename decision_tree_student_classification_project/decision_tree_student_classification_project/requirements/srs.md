# Software Requirements Specification (SRS)

## 1. Functional Requirements

### FR-01 Login
Sistem menyediakan autentikasi pengguna berwenang.

### FR-02 Dataset
Admin dapat mengunggah dataset pengerjaan quiz online dalam format CSV.

### FR-03 Validasi Dataset
Sistem memeriksa keberadaan atribut `ID_SISWA`, `NAMA_SISWA`, `JUMLAH_SESI`, `NILAI_RATA-RATA`, dan `KELAS` sesuai struktur yang dijelaskan jurnal.

### FR-04 Data Preparation
Sistem menyiapkan dataset agar sesuai untuk pemodelan klasifikasi dan menangani data yang dapat mengganggu proses sesuai aturan implementasi.

### FR-05 Modelling
Sistem dapat membentuk model Decision Tree C4.5 dan Random Forest dengan atribut `JUMLAH_SESI` dan `NILAI_RATA-RATA`.

### FR-06 Validation
Sistem menggunakan random 10-fold cross-validation untuk pengujian model.

### FR-07 Evaluation
Sistem menampilkan confusion matrix dan accuracy serta dapat menampilkan precision/recall per kelas jika dihitung dari confusion matrix.

### FR-08 Knowledge/Rules
Sistem menampilkan pohon keputusan dan rule IF-THEN C4.5 yang digunakan pada deployment.

### FR-09 Single Record Test
Admin dapat memasukkan nilai, jumlah sesi, dan kelas aktual untuk pengujian satu record.

### FR-10 Multi Record Test
Admin dapat mengunggah CSV untuk menguji banyak record sekaligus.

### FR-11 Prediction Result
Sistem menampilkan kelas prediksi dan status TRUE/FALSE dibandingkan kelas pada dataset.

## 2. Business Rules
- Atribut klasifikasi utama adalah `NILAI_RATA-RATA` dan `JUMLAH_SESI`.
- Kelas target terdiri dari A, B, C, dan D.
- Model deployment yang dirujuk penelitian adalah C4.5.
- Rule harus berasal dari model C4.5 yang telah dievaluasi.
- Untuk pengujian multi-record, struktur CSV harus sesuai atribut model.

## 3. Data Requirements
Entitas utama:
- users
- datasets
- dataset_rows
- models
- evaluations
- decision_rules
- predictions

## 4. Acceptance Criteria
Sistem dianggap memenuhi kebutuhan apabila dataset dapat dimuat, model C4.5/RF dapat dievaluasi dengan 10-fold cross-validation, rule C4.5 dapat ditampilkan, dan single/multi record dapat diklasifikasikan menggunakan rule deployment.
