document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewList = document.getElementById("reviewList");

    // 1. Fungsi mengambil data review lama dari Local Storage biar gak ilang pas direfresh
    let savedReviews = JSON.parse(localStorage.getItem("seapedia_reviews")) || [];

    // 2. Fungsi untuk menampilkan seluruh review ke layar
    function renderReviews() {
        // Kita kosongkan dulu biar gak double, tapi sisakan review bawaan Budi jika kosong
        reviewList.innerHTML = "";
        
        if (savedReviews.length === 0) {
            reviewList.innerHTML = `
                <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                    <p class="font-bold text-gray-900 text-sm">Budi Hartono</p>
                    <p class="text-gray-600 text-sm mt-1">Aplikasi keren banget, UI-nya rapi dan gampang dipahami buat belanja!</p>
                </div>`;
            return;
        }

        savedReviews.forEach(function (item) {
            const reviewDiv = document.createElement("div");
            reviewDiv.className = "bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 animation-fade";
            reviewDiv.innerHTML = `
                <p class="font-bold text-gray-900 text-sm">${escapeHTML(item.name)}</p>
                <p class="text-gray-600 text-sm mt-1">${escapeHTML(item.text)}</p>
            `;
            reviewList.appendChild(reviewDiv);
        });
    }

    // 3. Fungsi mencegah serangan XSS sederhana (biar aman kayak standar COMPFEST!)
    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }

    // 4. Logika ketika form review diklik Submit
    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Mencegah halaman reload otomatis

        const nameInput = document.getElementById("reviewerName").value.trim();
        const textInput = document.getElementById("reviewText").value.trim();

        if (nameInput === "" || textInput === "") return;

        // Simpan review baru ke dalam array
        const newReview = {
            name: nameInput,
            text: textInput
        };
        savedReviews.push(newReview);

        // Amankan ke Local Storage laptop
        localStorage.setItem("seapedia_reviews", JSON.stringify(savedReviews));

        // Tampilkan ulang list review terbarunya
        renderReviews();

        // Bersihkan isi kolom input setelah kelar submit
        reviewForm.reset();
    });

    // Jalankan fungsi render di awal pas web pertama kali dibuka
    renderReviews();
});

// Fungsi interaktif untuk memilih role di halaman utama
function selectRole(roleName) {
    // 1. Ambil semua tombol yang memiliki class 'role-btn'
    const buttons = document.querySelectorAll('.role-btn');
    
    // 2. Kembalikan semua tombol ke desain normal (abu-abu)
    buttons.forEach(btn => {
        btn.classList.remove('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
        btn.classList.add('border-gray-200', 'text-gray-600', 'font-medium');
    });

    // 3. Berikan desain aktif (warna indigo) ke tombol yang sedang diklik
    const activeBtn = document.getElementById(`btn-${roleName}`);
    if (activeBtn) {
        activeBtn.classList.remove('border-gray-200', 'text-gray-600', 'font-medium');
        activeBtn.classList.add('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
    }

    // 4. Ubah teks petunjuk di atas form login secara dinamis
    const roleText = document.getElementById('selected-role-text');
    if (roleText) {
        roleText.textContent = roleName;
    }
}

// Variabel global untuk mencatat peran yang dipilih saat ini (bawaannya buyer)
let currentSelectedRole = 'buyer';
function selectRole(roleName) {
    // Simpan peran yang dipilih ke variabel global
    currentSelectedRole = roleName;

    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => {
        btn.classList.remove('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
        btn.classList.add('border-gray-200', 'text-gray-600', 'font-medium');
    });

    const activeBtn = document.getElementById(`btn-${roleName}`);
    if (activeBtn) {
        activeBtn.classList.remove('border-gray-200', 'text-gray-600', 'font-medium');
        activeBtn.classList.add('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
    }

    const roleText = document.getElementById('selected-role-text');
    if (roleText) {
        roleText.textContent = roleName;
    }
}
// Logika ketika form Login disubmit
    const authForm = document.getElementById("authForm");
    if (authForm) {
        authForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Cegah reload halaman biasa

            // Simpan peran aktif ke Local Storage agar bisa dibaca di halaman dashboard
            localStorage.setItem("seapedia_active_role", currentSelectedRole);

            // Alihkan halaman secara otomatis ke file dashboard
            window.location.href = "dashboard.html";
        });
    }

// Jalankan fungsi memuat produk kustom begitu halaman depan terbuka
document.addEventListener("DOMContentLoaded", function () {
    loadCustomProducts();
});

function loadCustomProducts() {
    const productsContainer = document.querySelector("#products .grid");
    if (!productsContainer) return;

    // Ambil list produk bikinan seller dari LocalStorage
    const customProducts = JSON.parse(localStorage.getItem("seapedia_custom_products")) || [];

    // Tampilkan setiap produk buatan seller ke dalam list katalog depan
    customProducts.forEach(product => {
        // Format mata uang rupiah ringkas
        const formattedPrice = parseInt(product.price).toLocaleString("id-ID");

        const productCard = document.createElement("div");
        productCard.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border-2 border-green-400";
        productCard.innerHTML = `
            <div class="h-48 bg-green-50 flex items-center justify-center text-green-500 font-bold text-sm">🏪 Toko Seller Aktif</div>
            <div class="p-5">
                <h4 class="font-bold text-lg text-gray-900">${escapeHTML(product.name)}</h4>
                <p class="text-gray-500 text-sm mt-1">${escapeHTML(product.desc)}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-green-600 font-bold text-lg">Rp ${formattedPrice}</span>
                    <span class="text-xs bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded">Produk Baru</span>
                </div>
            </div>
        `;
        // Masukkan kartu produk buatan seller ini ke barisan paling depan katalog
        productsContainer.insertBefore(productCard, productsContainer.firstChild);
    });
}
// Fungsi untuk memasukkan produk ke keranjang belanja milik Buyer
function addToCart(name, price) {
    // Ambil data keranjang lama atau bikin baru kalau masih kosong
    let cart = JSON.parse(localStorage.getItem("seapedia_cart")) || [];
    
    // Masukkan barang baru ke susunan keranjang
    cart.push({ name: name, price: parseInt(price) });
    
    // Simpan ke LocalStorage
    localStorage.setItem("seapedia_cart", JSON.stringify(cart));
    
    alert(`${name} berhasil ditambahkan ke keranjang belanja!`);
}

// Tindasan perbaikan untuk loadCustomProducts agar produk seller punya tombol beli juga
const originalLoadCustomProducts = loadCustomProducts;
loadCustomProducts = function() {
    const productsContainer = document.querySelector("#products .grid");
    if (!productsContainer) return;

    const customProducts = JSON.parse(localStorage.getItem("seapedia_custom_products")) || [];
    
    // Kita bersihkan dulu element buatan sebelumnya agar tidak menumpuk saat reload di live preview
    const oldCustoms = productsContainer.querySelectorAll('.custom-seller-prod');
    oldCustoms.forEach(el => el.remove());

    customProducts.forEach(product => {
        const formattedPrice = parseInt(product.price).toLocaleString("id-ID");
        const productCard = document.createElement("div");
        productCard.className = "custom-seller-prod bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border-2 border-green-400";
        productCard.innerHTML = `
            <div class="h-48 bg-green-50 flex items-center justify-center text-green-500 font-bold text-sm">🏪 Toko Seller Aktif</div>
            <div class="p-5">
                <h4 class="font-bold text-lg text-gray-900">${escapeHTML(product.name)}</h4>
                <p class="text-gray-500 text-sm mt-1">${escapeHTML(product.desc)}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-green-600 font-bold text-lg">Rp ${formattedPrice}</span>
                    <button onclick="addToCart('${escapeHTML(product.name)}', ${product.price})" class="bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">+ Keranjang</button>
                </div>
            </div>
        `;
        productsContainer.insertBefore(productCard, productsContainer.firstChild);
    });
}

// Fungsi Proteksi Level 7: Sanitasi Input dari Serangan XSS (Cross-Site Scripting)
function escapeHTML(text) {
    if (!text) return "";
    return text
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}