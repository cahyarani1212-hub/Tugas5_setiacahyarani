# Acceptance Criteria

## US-01
- Username dan password wajib diisi.
- Login gagal jika kredensial tidak sesuai.
- Login berhasil mengarahkan ke dashboard.

## US-02
- Sistem menerima CSV dengan struktur atribut yang sesuai.
- Sistem memvalidasi kolom utama.
- Dataset berhasil tersimpan setelah validasi.

## US-03
- `JUMLAH_SESI` dan `NILAI_RATA-RATA` tersedia sebagai fitur.
- `KELAS` tersedia sebagai target.
- Data siap digunakan untuk modelling.

## US-04
- C4.5 dapat dilatih.
- Random Forest dapat dilatih sebagai pembanding.
- Metode validasi tercatat sebagai random 10-fold cross-validation.

## US-05
- Sistem menampilkan confusion matrix.
- Sistem menampilkan accuracy.
- Sistem dapat menampilkan precision dan recall per kelas berdasarkan confusion matrix.

## US-06
- Model C4.5 dapat ditampilkan sebagai tree/rule.
- Rule IF-THEN dapat digunakan untuk deployment.

## US-07
- Input single record dapat diproses.
- Sistem menghasilkan kelas prediksi.
- Jika kelas aktual diberikan, sistem menampilkan TRUE jika sama dan FALSE jika berbeda.

## US-08
- CSV multi-record dapat diunggah.
- Sistem menghasilkan prediksi untuk setiap record.
- Ketidaksesuaian prediksi terhadap kelas aktual diberi status FALSE.
