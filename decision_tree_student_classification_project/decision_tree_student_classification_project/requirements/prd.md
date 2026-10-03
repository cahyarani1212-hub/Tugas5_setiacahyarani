# Product Requirements Document (PRD)

## 1. Ringkasan Produk
Aplikasi klasifikasi berbasis web untuk membantu pengelompokan peserta didik berdasarkan data pengerjaan quiz online. Aplikasi mengadopsi pendekatan CRISP-DM dan menyediakan pemodelan Decision Tree, khususnya C4.5, yang menjadi dasar rule pada tahap deployment.

## 2. Masalah
Pengelompokan peserta didik secara tradisional dapat dilakukan hanya dengan mengurutkan nilai akhir. Pendekatan tersebut menggunakan satu atribut. Penelitian mengusulkan penggunaan lebih dari satu atribut, yaitu nilai rata-rata dan jumlah sesi pengerjaan quiz, agar pengelompokan lebih komprehensif.

## 3. Tujuan Produk
- Mengelompokkan peserta didik ke kelas A, B, C, atau D.
- Menggunakan `NILAI_RATA-RATA` dan `JUMLAH_SESI` sebagai atribut klasifikasi.
- Menyediakan proses data preparation, modelling, evaluation, dan deployment yang selaras dengan CRISP-DM.
- Membandingkan C4.5 dan Random Forest pada proses evaluasi.
- Menerapkan rule C4.5 untuk klasifikasi single record dan multi-record CSV.

## 4. Target Pengguna
- Admin/pengelola data peserta didik.
- Peneliti/mahasiswa yang melakukan eksperimen klasifikasi.
- Pengelola program pendidikan yang membutuhkan pengelompokan peserta didik.

## 5. Fitur Utama
### Must Have
- Login sederhana untuk admin.
- Import dataset CSV.
- Validasi struktur dataset.
- Menampilkan atribut peserta didik.
- Data preparation.
- Training C4.5 dan Random Forest.
- Random 10-fold cross-validation.
- Confusion matrix dan accuracy.
- Menampilkan rule C4.5.
- Single Record Test.
- Multi Record Test melalui CSV.
- Menampilkan prediksi dan indikator TRUE/FALSE terhadap kelas aktual.

### Should Have
- Riwayat model dan hasil evaluasi.
- Dashboard ringkasan hasil.
- Export hasil klasifikasi.

## 6. Non-Functional Requirements
- Antarmuka mudah digunakan.
- Validasi input dataset.
- Proses klasifikasi konsisten dengan rule model.
- Data tersimpan secara terstruktur.
- API menggunakan JSON untuk operasi aplikasi.

## 7. Catatan sumber
Jurnal menyatakan aplikasi deployment menggunakan model dan rule C4.5. Dataset mentah lengkap tidak dipublikasikan dalam artikel yang tersedia sehingga sistem tidak boleh mengklaim memiliki data asli penelitian tanpa sumber tambahan.
