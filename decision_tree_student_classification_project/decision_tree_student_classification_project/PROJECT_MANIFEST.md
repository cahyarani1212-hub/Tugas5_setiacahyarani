# Project Manifest

Generated as a document/software-project adaptation of the journal:
**Implementasi Algoritma Decision Tree Untuk Klasifikasi Data Peserta Didik** — Imam Sutoyo, Jurnal PILAR Nusa Mandiri Vol. 14 No. 2, September 2018.

The folder structure mirrors the supplied project example: requirements, docs, functional/use-cases, functional/user-stories, prompt-log, and references.

## Source fidelity notes
- The research uses CRISP-DM and compares Decision Tree C4.5 with Random Forest using random 10-fold cross-validation.
- The deployment prototype uses the C4.5 model/rules for classification.
- The journal contains an internal accuracy discrepancy for C4.5: the confusion-matrix calculation is 96.73%, while the conclusion states 97.63%. Both are preserved and flagged rather than silently reconciled.
- The journal describes JUMLAH_SESI as 0–50, while one learned rule uses SESI > 58.5. This source inconsistency is also flagged.
