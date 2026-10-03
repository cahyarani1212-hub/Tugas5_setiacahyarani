# Use Cases

## UC-01 Login
**Aktor:** Admin  
**Tujuan:** Masuk ke aplikasi.

Alur:
1. Admin membuka halaman login.
2. Admin mengisi username dan password.
3. Sistem memvalidasi kredensial.
4. Sistem menampilkan dashboard.

## UC-02 Upload Dataset
**Aktor:** Admin  
**Tujuan:** Menambahkan dataset quiz online.

Alur:
1. Admin memilih file CSV.
2. Sistem memvalidasi struktur kolom.
3. Sistem menyimpan dataset.
4. Dataset muncul pada daftar.

## UC-03 Data Preparation
**Aktor:** Admin  
**Tujuan:** Menyiapkan data untuk modelling.

Alur:
1. Admin memilih dataset.
2. Sistem memeriksa kualitas data.
3. Sistem menyiapkan atribut `JUMLAH_SESI` dan `NILAI_RATA-RATA`.
4. Sistem menetapkan `KELAS` sebagai target.

## UC-04 Training Model
**Aktor:** Admin  
**Tujuan:** Membentuk model C4.5 atau Random Forest.

Alur:
1. Admin memilih algoritma.
2. Sistem menjalankan proses modelling.
3. Sistem menghasilkan model.
4. Sistem menyimpan model.

## UC-05 Evaluasi Model
**Aktor:** Admin  
**Tujuan:** Mengukur kinerja model.

Alur:
1. Sistem menjalankan random 10-fold cross-validation.
2. Sistem menghasilkan confusion matrix.
3. Sistem menghitung accuracy.
4. Sistem menampilkan hasil evaluasi.

## UC-06 Lihat Knowledge/Rules
**Aktor:** Admin  
**Tujuan:** Melihat pohon keputusan dan rule C4.5.

Alur:
1. Admin memilih model C4.5.
2. Sistem menampilkan struktur tree.
3. Sistem menampilkan rule IF-THEN.

## UC-07 Single Record Test
**Aktor:** Admin  
**Tujuan:** Menguji satu peserta didik.

Alur:
1. Admin memasukkan nilai.
2. Admin memasukkan jumlah sesi.
3. Admin memasukkan kelas aktual jika tersedia.
4. Sistem menerapkan rule C4.5.
5. Sistem menampilkan kelas prediksi dan TRUE/FALSE.

## UC-08 Multi Record Test
**Aktor:** Admin  
**Tujuan:** Menguji banyak record dari CSV.

Alur:
1. Admin memilih CSV.
2. Sistem membaca record.
3. Sistem menerapkan rule pada setiap record.
4. Sistem menampilkan hasil klasifikasi.
