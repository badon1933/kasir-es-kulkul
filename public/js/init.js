/* Inisialisasi Jenis Menu */
if (!localStorage.getItem("jenisMenu")) {
    console.log("Ga ada Datanya")
    let jenisMenu = [
        { id: crypto.randomUUID(), nama: "Es Kul-Kul", image: "../public/img/es kul-kul.png" },
        { id: crypto.randomUUID(), nama: "Minuman", image: "../public/img/minuman.png" },
        { id: crypto.randomUUID(), nama: "Topping", image: "../public/img/topping.png" }
    ];

    localStorage.setItem("jenisMenu", JSON.stringify(jenisMenu));
}

/* Inisialisasi Daftar Menu */
if (!localStorage.getItem("daftarMenu")) {
    console.log("Ga ada Datanya")
    let data = [];
    localStorage.setItem("daftarMenu", JSON.stringify(data));
}

/* Inisialisasi Order Menu */
if (!localStorage.getItem("orderMenu")) {
    console.log("Ga ada Datanya")
    let data = [];
    localStorage.setItem("orderMenu", JSON.stringify(data));
}

/* Inisialisasi Transaksi Order */
if (!localStorage.getItem("transaksiOrder")) {
    console.log("Ga ada Datanya")
    let data = [];
    localStorage.setItem("transaksiOrder", JSON.stringify(data));
}
