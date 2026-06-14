# software-engineering-compfest
# SEAPEDIA - Technical Challenge COMPFEST

SEAPEDIA adalah sebuah platform simulasi e-commerce multi-role terintegrasi yang dirancang untuk memenuhi kriteria penilaian *Technical Challenge*. Aplikasi ini dibangun menggunakan arsitektur front-end modern yang responsif dan memanfaatkan penanganan data berbasis state untuk mensimulasikan alur bisnis e-commerce yang kompleks secara real-time. 
(Aplikasi ini menggunakan pendekatan arsitektur Front-End murni dengan LocalStorage sebagai penanganan state data terintegrasi antar-role, sehingga tidak memerlukan REST API eksternal terpisah)

## 🔗 Live Demo
Aplikasi ini telah dideploy secara publik dan dapat diuji coba secara langsung melalui tautan berikut:
👉 https://mar4fluctus.github.io/software-engineering-compfest/

---

## 🚀 Fitur Utama Berdasarkan Level Penilaian

Aplikasi ini telah menyelesaikan seluruh rangkaian tantangan dari **Level 1 hingga Level 7** dengan rincian implementasi fitur sebagai berikut:

### 📑 Level 1: Public Marketplace, Authentication, and Reviews
* **Landing Page & Katalog:** Tampilan utama yang dinamis untuk menampilkan daftar produk yang tersedia di ekosistem SEAPEDIA.
* **Sistem Autentikasi Multi-Role:** Fitur masuk (*login*) yang memisahkan hak akses dan tampilan dasbor secara ketat untuk 4 peran berbeda: **Buyer, Seller, Driver, dan Admin**.
* **Public Review System:** Sistem ulasan interaktif yang memungkinkan pengguna memberikan rating skala 1-5 beserta komentar pada produk.

### 🏪 Level 2: Building the Seller Experience
* **Manajemen Toko:** Dasbor khusus bagi Seller untuk memantau status toko.
* **CRUD Produk:** Seller dapat menambah, memasang, dan memperbarui detail produk baru (Nama, Harga, Deskripsi) agar langsung masuk ke katalog utama.

### 🛍️ Level 3: Buyer Wallet, Cart, and Checkout
* **Seacash Digital Wallet:** Simulasi dompet digital untuk melacak saldo pembeli selama bertransaksi.
* **Kalkulasi Checkout Akurat:** Keranjang belanja otomatis menghitung:
  * *Subtotal Produk*
  * *Pilihan Metode Pengiriman* (Regular, Next Day, Instant) dengan ongkos kirim dinamis.
  * *Pajak PPN 12%* sesuai dengan regulasi terbaru yang dihitung otomatis setelah potongan harga.

### 💸 Level 4: Discounts and Order Processing
* **Sistem Voucher Promo:** Fitur klaim kode promo global (`SEAPEDIA10`) yang otomatis memotong subtotal belanjaan sebesar 10% sebelum dikenakan pajak.
* **Order State Tracking:** Mengubah status pesanan dari keranjang menjadi *Sedang Dikemas* dan diteruskan ke sistem pengiriman setelah pembayaran sukses.

### 🛵 Level 5: Delivery and Driver Workflow
* **Driver Portal:** Dasbor khusus kurir untuk memantau pesanan yang masuk ke sistem dengan status *Menunggu Kurir*.
* **Status Delivery Update:** Driver dapat mengambil kerjaan pengantaran (status berubah menjadi *Sedang Diantar*) hingga menyelesaikan pengiriman (*Paket Diterima*).

### ⏳ Level 6: Admin Monitoring and Overdue Handling
* **Platform Analytics Center:** Panel khusus Admin untuk memantau total pendapatan kotor (*Gross Platform Revenue*) dari seluruh transaksi sukses di platform.
* **SLA Overdue Control (Simulasi Batal Otomatis):** Fitur tombol *"⏩ Maju ke Hari Berikutnya"* untuk mensimulasikan batas waktu pengiriman yang kedaluwarsa. Jika diaktifkan, sistem secara otomatis membatalkan pesanan menggantung dan melakukan *Auto-Refund* dana ke pembeli.

### 🛡️ Level 7: Security Hardening and Finalization
* **XSS Protection (Sanitasi Input):** Implementasi fungsi enkapsulasi karakter khusus (`escapeHTML`) untuk menyaring input teks pada form produk dan ulasan, mencegah injeksi skrip JavaScript berbahaya (Cross-Site Scripting).
* **System Log Tracking:** Monitor konsol internal pada dasbor admin untuk melacak stabilitas status database dan log transaksi masuk.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

* **Form & Struktur:** HTML5 (Semantic Elements)
* **Desain & UI Layout:** Tailwind CSS (Responsive Utilities & Flexbox/Grid)
* **Logika Bisnis & State Management:** Vanilla JavaScript (ES6+) dengan sinkronisasi data antar-halaman memanfaatkan browser `localStorage`.

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Jika ingin menguji proyek ini langsung di komputer lokal, ikuti langkah berikut:
1. Klik tombol **Code** di repositori ini, lalu pilih **Download ZIP** (atau gunakan perintah `git clone`).
2. Ekstrak file ZIP tersebut di komputer kamu.
3. Buka file `index.html` menggunakan browser pilihanmu, atau jalankan melalui ekstensi **Live Server** di VS Code untuk pengalaman simulasi terbaik.
