/* Load Jenis Menu @ Order Modal */
const orderModalBody = document.querySelector("#orderModal .modal-body .row");
let jenisMenu = JSON.parse(localStorage.getItem("jenisMenu"));
jenisMenu.map((data, index) => {
    orderModalBody.innerHTML += `
    <div class="col">
        <div class="card card-body text-center bg-body-tertiary">
            <img src="${data.image}" alt="img">
            <a href="#" class="fs-5 fw-bold stretched-link text-decoration-none text-dark"
                data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#tambahOrderModal" onclick="loadDaftarMenu('${data.id}')">
                ${data.nama}
            </a>
        </div>
    </div>
    `;
});

function loadDaftarMenu(id) {
    const tambahOrderModalBody = document.querySelector("#tambahOrderModal .modal-body");
    let daftarMenu = JSON.parse(localStorage.getItem("daftarMenu"));
    /* Reset Loaded Menu */
    tambahOrderModalBody.innerHTML = "";

    daftarMenu.map((data, index) => {
        /* if(data.jenis == id && data.stok > 0) */
        if (data.jenis == id && data.stok > 0) {
            tambahOrderModalBody.innerHTML += `
            <div class="input-group mb-3 w-100">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="${data.id}" id="menu-${data.id}" data-id="${data.id}" data-nama="${data.nama}" data-harga="${data.harga}">
                </div>
                <label for="menu-${data.id}" class="input-group-text form-control text-wrap">${data.nama}</label>
            </div>
            `
        }
    });
}

/* Load Order Menu */
const orderMenuTBody = document.querySelector("#orderMenuTable tbody");
let orderMenu = JSON.parse(localStorage.getItem("orderMenu"));
orderMenu.map((data, index) => {
    orderMenuTBody.innerHTML += `
    <tr class="border-top border-dark-subtle">
        <td colspan="2" class="w-100">
            <span class="fw-bold">${data.nama}</span> @ Rp. ${data.harga}
            <button class="btn btn-danger btn-sm float-end" onclick="hapusOrder('${data.id}')">
                <i class="bi bi-x-lg"></i>
            </button>
        </td>
    </tr>
    <tr class="border-bottom border-dark-subtle">
        <td id="totalHarga-${data.id}">Total: Rp. ${(data.harga * data.jumlah)}</td>
        <td class="input-group">
            <button class="btn btn-secondary btn-sm" type="button" id="kurangiJumlahBtn-${data.id}"><i
                    class="bi bi-dash-lg" onclick="kurangiJumlahOrder('${data.id}')"></i></button>
            <input type="number" inputmode="numeric" min="1" class="form-control form-control-sm text-center" value="${data.jumlah}"
                pattern="[0-9]*" id="inputJumlah-${data.id}">
            <button class="btn btn-secondary btn-sm" type="button" id="tambahJumlahBtn-${data.id}"><i
                    class="bi bi-plus-lg" onclick="tambahJumlahOrder('${data.id}')"></i></button>
        </td>
    </tr>
    `;
    toggleInputJumlahBtn(orderMenu, data.id);
});

totalBelanja(orderMenu);
if (orderMenu.length == 0) {
    const bayarBtn = document.querySelector("#bayarBtn");
    bayarBtn.disabled = true;
}

/* Tambah Order */
function tambahOrder() {
    const inputCheckboxes = document.querySelectorAll("#tambahOrderModal input[type=checkbox]:checked");
    console.log(inputCheckboxes[0]);

    let currentData = JSON.parse(localStorage.getItem("orderMenu"));

    for (let i = 0; i < inputCheckboxes.length; i++) {
        if (inputCheckboxes[i].checked) {
            currentData.push({
                id: crypto.randomUUID(),
                menu_id: inputCheckboxes[i].getAttribute("data-id"),
                nama: inputCheckboxes[i].getAttribute("data-nama"),
                harga: inputCheckboxes[i].getAttribute("data-harga"),
                jumlah: 1
            })
        }
    }

    localStorage.setItem("orderMenu", JSON.stringify(currentData));
    window.location.reload();
}

/* Hapus Order */
function hapusOrder(order_id) {
    let currentData = JSON.parse(localStorage.getItem("orderMenu"));
    console.log(currentData, order_id);
    let index = currentData.findIndex(data => data.id == order_id);
    if (index != -1) {
        currentData.splice(index, 1);
    }
    localStorage.setItem("orderMenu", JSON.stringify(currentData));
    window.location.reload();
}

/* Tambah Jumlah Order */
function tambahJumlahOrder(order_id) {
    console.log(order_id);
    const inputJumlah = document.querySelector(`#inputJumlah-${order_id}`);
    inputJumlah.value++;

    const totalHargaEl = document.querySelector(`#totalHarga-${order_id}`);
    let currentData = JSON.parse(localStorage.getItem("orderMenu"));
    let index = currentData.findIndex(data => data.id == order_id);
    let totalHarga = 0;

    currentData[index].jumlah = inputJumlah.value;
    totalHarga = currentData[index].harga * inputJumlah.value;
    totalHargaEl.innerHTML = `Total: Rp. ${totalHarga}`;

    localStorage.setItem("orderMenu", JSON.stringify(currentData));

    totalBelanja(currentData);
    toggleInputJumlahBtn(currentData, order_id);
}

/* Tambah Jumlah Order */
function kurangiJumlahOrder(order_id) {
    console.log(order_id);
    const inputJumlah = document.querySelector(`#inputJumlah-${order_id}`);
    inputJumlah.value--;

    const totalHargaEl = document.querySelector(`#totalHarga-${order_id}`);
    let currentData = JSON.parse(localStorage.getItem("orderMenu"));
    let index = currentData.findIndex(data => data.id == order_id);
    let totalHarga = 0;

    currentData[index].jumlah = inputJumlah.value;
    totalHarga = currentData[index].harga * inputJumlah.value;
    totalHargaEl.innerHTML = `Total: Rp. ${totalHarga}`;

    localStorage.setItem("orderMenu", JSON.stringify(currentData));

    totalBelanja(currentData);
    toggleInputJumlahBtn(currentData, order_id);
}

/* Total Belanja */
function totalBelanja(currentData) {
    const totalBelanjaEl = document.querySelector("#totalBelanja");
    let totalBelanja = 0;
    for (let i = 0; i < currentData.length; i++) {
        totalBelanja += currentData[i].harga * currentData[i].jumlah;
    }
    totalBelanjaEl.innerHTML = `Rp. ${totalBelanja}`;
}

/* Toggle Input Jumlah Button */
function toggleInputJumlahBtn(currentData, order_id) {
    const kurangiJumlahBtn = document.querySelector(`#kurangiJumlahBtn-${order_id}`);
    let index = currentData.findIndex(data => data.id == order_id);
    if (currentData[index].jumlah < 2) {
        kurangiJumlahBtn.disabled = true;
    } else {
        kurangiJumlahBtn.disabled = false;
    }
}

/* Hitung Kembalian */
function hitungKembalian() {
    const tutupTransaksiModalBody = document.querySelector("#tutupTransaksiModal .modal-body");
    const inputUangTunai = document.querySelector("#inputUangTunai");
    let currentData = JSON.parse(localStorage.getItem("orderMenu"));
    let totalBelanja = 0;

    for (let i = 0; i < currentData.length; i++) {
        totalBelanja += currentData[i].harga * currentData[i].jumlah;
    }

    if (!inputUangTunai.value || inputUangTunai.value < totalBelanja) {
        alert("Isi nominal uang tunai dengan benar");
        inputUangTunai.focus();
        return false;
    }

    tutupTransaksiModalBody.innerHTML = `
        <!-- Total Belanja   : Rp. ${totalBelanja}<br />
        Uang Tunai      : Rp. ${inputUangTunai.value}<br /> -->
        <span class="fw-bold">Kembalian</span>       : Rp. ${(inputUangTunai.value - totalBelanja)}
    `;

    tutupTransaksi(currentData, totalBelanja, inputUangTunai.value);
    // return false;

    const myModal = new bootstrap.Modal(document.getElementById('tutupTransaksiModal'), {})
    myModal.show();
}

/* Tutup Transaksi */
function tutupTransaksi(orderMenu, totalBelanja, uangTunai) {
    let transaksiOrder = JSON.parse(localStorage.getItem("transaksiOrder"));
    const tanggal = new Date().toLocaleDateString("in-ID");
    transaksiOrder.push({
        id: crypto.randomUUID(),
        orderMenu: orderMenu,
        totalBelanja: totalBelanja,
        uangTunai: uangTunai,
        tanggal: tanggal
    });

    let daftarMenu = JSON.parse(localStorage.getItem("daftarMenu"));
    for (let i = 0; i < daftarMenu.length; i++) {
        index = orderMenu.findIndex(data => data.menu_id == daftarMenu[i].id);
        if (index > -1) {
            daftarMenu[i].stok = daftarMenu[i].stok - orderMenu[index].jumlah;
            console.table(daftarMenu);
        }
    }

    orderMenu = [];
    localStorage.setItem("orderMenu", JSON.stringify(orderMenu));
    localStorage.setItem("transaksiOrder", JSON.stringify(transaksiOrder));
    localStorage.setItem("daftarMenu", JSON.stringify(daftarMenu));
    console.table(daftarMenu);
}
