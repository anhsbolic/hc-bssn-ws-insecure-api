# Backend - Workshop Secure Coding Frontend

Backend aplikasi ini dibuat dengan **Express.js + PostgreSQL** dan sengaja didesain **tidak aman** untuk tujuan edukasi pada workshop secure coding frontend.

---

## **1. Fitur Backend (Insecure by Design)**

* Login API yang mengembalikan token tanpa HttpOnly.
* CRUD kedatangan tanpa validasi input & sanitasi.
* Approve / Reject kedatangan tanpa role check.
* Endpoint daftar user yang mengembalikan data sensitif.
* Hardcoded secret key JWT.

---

## **2. Prasyarat**

* Node.js >= 18
* NPM >= 8
* Docker & Docker Compose (untuk database)

---

## **3. Setup Database (Manual)**

Struktur database dan data awal sudah disiapkan dalam folder:

```
db/
 ├── schema/
 │    ├── user.sql
 │    └── arrival.sql
 └── seeders/
      └── arrival.sql
```

### **Buat Tabel**

Jalankan script di folder `db/schema` secara manual untuk membuat tabel:

### **Isi Data Awal**

Jalankan script seeder secara manual:

---

## **4. Install Dependencies**

```bash
cd backend
npm install
```

---

## **5. Jalankan Backend**

Mode development (auto-restart):

```bash
npm run dev
```

Backend akan berjalan di: `http://localhost:3000/api`

---

## **6. Catatan Penting**

* Aplikasi ini **tidak aman** dan **tidak boleh** digunakan di lingkungan produksi.
* Bug yang sengaja ditanam:

  * SQL Injection
  * Penyimpanan password plaintext
  * Hardcoded secret JWT
  * Exposed error message
* Digunakan untuk latihan patching pada workshop.

---

## **7. Lisensi**

Hak cipta © 2025 — Digunakan hanya untuk kepentingan workshop internal.
