// ==================== KERANJANG ====================

const cart = []; // ← semua item yang dibeli disimpan di sini, tiap item: { id, harga, jumlah }

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('hidden'); // ← toggle tampilan div menu
}

function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // ← format angka jadi Rupiah
}

function updateDisplay() {
    let totalItem = 0;
    let totalHarga = 0;

    cart.forEach(item => {
        totalItem += item.jumlah;
        totalHarga += item.jumlah * item.harga;

        const qtySpan = document.getElementById('qty-' + item.id);
        if (qtySpan) qtySpan.textContent = item.jumlah;
    });

    document.getElementById('item-count').textContent = totalItem + ' item';
    document.getElementById('total-price').textContent = formatRupiah(totalHarga);

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (totalItem > 0) {
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

function addItem(id, harga) {
    const found = cart.find(item => item.id === id);
    if (found) {
        found.jumlah++;
    } else {
        cart.push({ id, harga, jumlah: 1 });
    }
    updateDisplay();
}

function removeItem(id) {
    const found = cart.find(item => item.id === id);
    if (found && found.jumlah > 0) {
        found.jumlah--;
        updateDisplay();
    }
}

// ==================== AUTOCOMPLETE SEARCH ====================

const searchInput = document.getElementById("search");               // <input id="search">
const dropdown = document.getElementById("searchDropdown");          // <ul id="searchDropdown">
const items = dropdown?.getElementsByTagName("li") || [];

if (searchInput && dropdown) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        let hasMatch = false;

        for (let item of items) {
            const match = item.textContent.toLowerCase().includes(value);
            item.style.display = match ? "block" : "none";
            hasMatch ||= match;

            item.onclick = () => {
                const selected = item.textContent;

                // Panggil fungsi untuk update tampilan berdasarkan menu
                if (typeof updateDetailFromMenu === "function") {
                    updateDetailFromMenu(selected);
                } else {
                    console.warn("updateDetailFromMenu() tidak tersedia.");
                }

                dropdown.classList.add("hidden");   // sembunyikan dropdown
                searchInput.value = "";             // kosongkan input
            };
        }

        dropdown.classList.toggle("hidden", !hasMatch || value === "");
    });

    // Sembunyikan dropdown kalau klik di luar
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
        }
    });
}





/////////////////////////////////////////////////////////////////




// const cart = [];

// function toggleMenu(id) {
//     document.getElementById(id).classList.toggle('hidden');
// }

// function formatRupiah(angka) {
//     return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
// }

// function updateDisplay() {
//     let totalItem = 0;
//     let totalHarga = 0;

//     cart.forEach(item => {
//         totalItem += item.jumlah;
//         totalHarga += item.jumlah * item.harga;

//         const qtySpan = document.getElementById('qty-' + item.id);
//         if (qtySpan) qtySpan.textContent = item.jumlah;
//     });

//     document.getElementById('item-count').textContent = totalItem + ' item';
//     document.getElementById('total-price').textContent = formatRupiah(totalHarga);

//     const checkoutBtn = document.getElementById('checkout-btn');
//     if (totalItem > 0) {
//         checkoutBtn.disabled = false;
//         checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
//     } else {
//         checkoutBtn.disabled = true;
//         checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
//     }
// }

// function addItem(id, harga) {
//     const found = cart.find(item => item.id === id);
//     if (found) {
//         found.jumlah++;
//     } else {
//         cart.push({ id, harga, jumlah: 1 });
//     }
//     updateDisplay();
// }

// function removeItem(id) {
//     const found = cart.find(item => item.id === id);
//     if (found && found.jumlah > 0) {
//         found.jumlah--;
//         updateDisplay();
//     }
// }
