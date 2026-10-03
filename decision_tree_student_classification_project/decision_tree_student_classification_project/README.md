# Decision Tree Student Classification Project

## Deskripsi
Proyek ini merupakan rancangan aplikasi web yang mengadaptasi penelitian **Implementasi Algoritma Decision Tree Untuk Klasifikasi Data Peserta Didik** karya Imam Sutoyo (2018). Sistem ditujukan untuk mengelompokkan peserta didik berdasarkan data pengerjaan quiz online menggunakan atribut **JUMLAH_SESI** dan **NILAI_RATA-RATA**.

## Topik
**Implementasi Algoritma Decision Tree untuk Klasifikasi Data Peserta Didik**

## Sumber utama
Sutoyo, I. (2018), *Implementasi Algoritma Decision Tree Untuk Klasifikasi Data Peserta Didik*, Jurnal PILAR Nusa Mandiri Vol. 14 No. 2, September 2018.

## Metodologi dan algoritma
- Metodologi: CRISP-DM.
- Algoritma yang diuji: Decision Tree C4.5 dan Random Forest.
- Validasi: random 10-fold cross-validation.
- Metrik utama yang dilaporkan: accuracy.
- Deployment: rule/model C4.5 digunakan sebagai dasar aplikasi klasifikasi.

## Data penelitian
Dataset berasal dari pengerjaan evaluasi/quiz secara online pada peserta didik tingkat pendidikan tinggi. Atribut yang dijelaskan jurnal:
- `ID_SISWA`: identitas numerik unik.
- `NAMA_SISWA`: nama peserta didik.
- `JUMLAH_SESI`: jumlah sesi pengerjaan quiz online.
- `NILAI_RATA-RATA`: nilai rata-rata seluruh sesi pengerjaan.
- `KELAS`: A, B, C, atau D.

Jurnal menyatakan `JUMLAH_SESI` minimal 0 dan maksimal 50, serta `NILAI_RATA-RATA` 0–100. Namun, salah satu rule C4.5 yang dilaporkan memakai ambang `SESI > 58.5`; hal ini dipertahankan sebagai catatan sumber dan tidak dianggap sebagai spesifikasi data baru.

## Hasil yang dilaporkan
Confusion matrix C4.5 berjumlah 123 record dan menghasilkan 119 prediksi benar, sehingga perhitungan akurasi pada bagian hasil adalah **96,73%**. Random Forest menghasilkan 117/123 atau **95,13%**. Bagian kesimpulan jurnal menulis C4.5 **97,63%**, sehingga terdapat perbedaan internal yang perlu diverifikasi pada sumber/dataset asli.

## Alur utama
Data quiz online → data understanding → data preparation → pemodelan C4.5/RF → 10-fold cross-validation → evaluasi → rule C4.5 → klasifikasi single record atau multi-record CSV.

## Batasan
Jurnal tidak menyertakan dataset mentah lengkap pada artikel yang tersedia. Karena itu, proyek ini mendefinisikan struktur dataset berdasarkan atribut yang dijelaskan, tetapi tidak mengarang isi dataset mentah.
