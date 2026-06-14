# software-engineering-compfest
# SEAPEDIA - Technical Challenge COMPFEST

SEAPEDIA adalah sebuah platform simulasi e-commerce multi-role terintegrasi yang dirancang untuk memenuhi seluruh kriteria penilaian *Technical Challenge*. Aplikasi ini dibangun menggunakan arsitektur front-end murni yang responsif dan memanfaatkan penanganan data berbasis state untuk mensimulasikan alur bisnis e-commerce yang kompleks secara real-time.

## 🔗 Live Demo / Deployment
Aplikasi ini telah dideploy secara publik dan dapat diuji coba secara langsung melalui tautan berikut:
👉 **https://mar4fluctus.github.io/software-engineering-compfest/**

---

## 💻 Panduan Menjalankan Proyek Secara Lokal (Setup & Run)

Aplikasi ini dirancang menggunakan arsitektur *Client-Side* murni agar memenuhi kriteria **"Works on Any Machine"** tanpa memerlukan instalasi dependensi atau *runtime environment* (seperti Node.js/Docker) yang rumit.

1. Hubungkan perangkat ke internet (untuk memuat pustaka Tailwind CSS via CDN).
2. Unduh atau clone repositori ini ke komputer Anda.
3. Buka file `index.html` langsung menggunakan browser pilihan Anda, atau jalankan melalui ekstensi **Live Server** di VS Code untuk pengalaman simulasi terbaik.

### 🔐 Autentikasi Akun Admin & Setup Khusus
Tidak diperlukan setup basis data atau migrasi akun khusus untuk mengakses hak akses tertinggi. Di portal login halaman utama (`index.html`), Anda cukup memasukkan nama pengguna bebas, lalu **memilih opsi role "ADMIN"** pada menu dropdown yang tersedia untuk langsung masuk ke pusat kendali sistem.

---

## 🛡️ Security Notes & Architecture Hardening

Aplikasi ini menerapkan beberapa pendekatan taktis untuk mensimulasikan dan menangani aspek keamanan data pada lapisan front-end:

* **XSS (Cross-Site Scripting) Protection:** Setiap input tekstual dari pengguna (seperti penambahan produk baru oleh Seller atau pengisian ulasan publik) disaring secara ketat sebelum dirender ke dalam DOM menggunakan fungsi enkapsulasi karakter khusus (`escapeHTML()`). Fungsi ini otomatis mengubah karakter sensitif seperti `<`, `>`, dan `&` menjadi entitas HTML aman.
* **SQL Injection Handling:** Karena sistem ini menggunakan arsitektur penyimpanan data lokal browser dan tidak mengeksekusi sintaks *Raw SQL Query* ke database relasional tradisional, platform ini secara inheren **100% kebal** terhadap serangan eksploitasi SQLi.
* **Input Validation:** Form transaksi dilengkapi dengan validasi logika mendasar seperti pembatasan nilai saldo, sterilisasi spasi kosong (*trimming*), serta pencegahan transaksi dengan keranjang kosong.
* **Session Behavior & Role-Based Access Control (RBAC):** Status login pengguna diatur memanfaatkan token penanda pada `localStorage.getItem("seapedia_active_role")`. Saat halaman `dashboard.html` dimuat, skrip utama akan memeriksa token tersebut dan secara ketat menyembunyikan atau menampilkan komponen antarmuka yang hanya menjadi hak akses peran bersangkutan (Buyer/Seller/Driver/Admin).

---

## 📄 API Documentation

Sesuai dengan pendekatan pengembangan fungsionalitas front-end terintegrasi berbasis state lokal, platform ini mengandalkan pemanfaatan struktur objek data terpadu (JSON) yang disimpan di dalam memori browser sebagai pengganti REST API eksternal tradisional.

Berikut adalah visualisasi skema penukaran struktur data state utama yang berjalan di balik layar:

| State Key (Local Storage) | Tipe Data | Deskripsi / Fungsi Alur Bisnis |
| :--- | :--- | :--- |
| `seapedia_cart` | Array [Object] | Menampung data antrean produk yang siap dicheckout oleh Buyer. |
| `seapedia_active_role` | String | Menyimpan token identitas peran aktif untuk pembatasan hak akses dasbor. |
| `seapedia_total_revenue`| Number | Kas data finansial platform yang dipantau langsung oleh Admin (*Gross Revenue*). |
| `seapedia_delivery_status`| String | Penanda siklus logistik pelacakan kurir yang dikelola oleh Driver. |

---

## 🚀 Fitur Utama Berdasarkan Level Penilaian

* **Level 1 (Marketplace & Multi-Role):** Autentikasi 4 peran berbeda dalam satu portal tunggal beserta sistem ulasan rating produk.
* **Level 2 (Seller Experience):** Manajemen inventori toko melalui form penambahan katalog produk baru.
* **Level 3 & 4 (Wallet, Voucher, & Checkout):** Simulasi dompet digital Seacash, kalkulasi kupon diskon 10%, penyesuaian biaya kurir, serta pengenaan biaya **PPN wajib sebesar 12%**.
* **Level 5 (Driver Workflow):** Sistem pelacakan kurir untuk mengubah status pengantaran hingga pesanan selesai diterima.
* **Level 6 & 7 (Admin Dashboard & SLA Overdue):** Dasbor omset finansial real-time yang dilengkapi tombol akselerasi waktu simulasi SLA Overdue (*Auto-Refund* otomatis jika pengiriman hangus).
