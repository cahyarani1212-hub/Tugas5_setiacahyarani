# Low Level Design (LLD)

## 1. Modul Dataset
Tanggung jawab:
- upload CSV
- validasi kolom
- membaca baris data
- menyimpan dataset
- menampilkan struktur atribut

Atribut sumber:
`ID_SISWA`, `NAMA_SISWA`, `JUMLAH_SESI`, `NILAI_RATA-RATA`, `KELAS`.

## 2. Modul Data Preparation
Tahapan mengikuti CRISP-DM:
1. pemeriksaan kualitas data
2. pembersihan/penyiapan data
3. penyesuaian format
4. penentuan fitur dan target
5. penyediaan data untuk modelling

Fitur model yang disebut jurnal adalah `JUMLAH_SESI` dan `NILAI_RATA-RATA`; target adalah `KELAS`.

## 3. Modul C4.5
Input:
- `JUMLAH_SESI`
- `NILAI_RATA-RATA`
- `KELAS`

Output:
- pohon keputusan
- rule IF-THEN
- prediksi kelas

Rule yang dilaporkan jurnal:
```text
if NILAI <= 82.5 -> D
else if NILAI > 94.5 -> A
else if NILAI <= 89.5 -> C
else if NILAI > 90.5 -> B
else if SESI > 58.5 -> B
else -> C
```

Catatan: jurnal menyatakan JUMLAH_SESI maksimum 50, tetapi rule menggunakan 58.5. Kontradiksi ini dipertahankan sebagai catatan verifikasi sumber.

## 4. Modul Random Forest
Random Forest dibentuk sebagai model pembanding. Setiap pohon menggunakan beberapa atribut yang dipilih secara acak dan keputusan akhir ditentukan secara dominan/voting.

## 5. Modul Evaluation
Menghasilkan:
- confusion matrix
- accuracy
- precision per kelas
- recall per kelas
- perbandingan C4.5 dan Random Forest

Validasi: random 10-fold cross-validation.

## 6. Modul Prediction
### Single Record
Input: nilai, jumlah sesi, kelas aktual.
Output: kelas prediksi dan TRUE/FALSE.

### Multi Record
Input: CSV.
Output: tabel hasil prediksi per record.

## 7. Confusion Matrix Sumber
C4.5:
```text
              True A  True B  True C  True D
Pred A           29       1       0       0
Pred B            0      29       2       0
Pred C            0       0      28       1
Pred D            0       0       0      33
```
Total record = 123; prediksi benar = 119; accuracy per perhitungan bagian hasil = 96.73%.

Random Forest:
```text
              True A  True B  True C  True D
Pred A           28       1       0       0
Pred B            1      28       2       0
Pred C            0       1      28       1
Pred D            0       0       0      33
```
Total record = 123; prediksi benar = 117; accuracy = 95.13%.
