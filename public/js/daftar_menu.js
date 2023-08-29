/* Get Daftar Menu */
const daftarMenuTBody = document.querySelector("#daftarMenuTable tbody");
let daftarMenu = JSON.parse(localStorage.getItem("daftarMenu"));
daftarMenu.map((data) => {
    daftarMenuTBody.innerHTML += `
        <tr>
            <td>${data.nama}</td>
            <td>${data.stok}pcs</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="hapusMenu('${data.id}')">
                    <i class="bi bi-x-lg"></i>
                </button>
            </td>
        </tr>
        `;
});

/* Get Jenis Menu */
const selectJenisMenu = document.querySelector("#menuBaruModal select");
let jenisMenu = JSON.parse(localStorage.getItem("jenisMenu"));
jenisMenu.map((data, index) => {
    selectJenisMenu.innerHTML += `
        <option value="${data.id}">${data.nama}</option>
        `;
});


/* Tambah Menu */
function tambahMenu() {
    const inputMenuBaru = document.querySelectorAll("#menuBaruModal input");
    const selectJenisMenu = document.querySelector("#menuBaruModal select");
    let menuBaru = {
        id: crypto.randomUUID(),
        nama: inputMenuBaru[0].value,
        stok: inputMenuBaru[1].value,
        jenis: selectJenisMenu.value,
        harga: inputMenuBaru[2].value,
    }
    console.log(menuBaru);

    let currentData = JSON.parse(localStorage.getItem("daftarMenu"));
    console.log(currentData);

    currentData.push(menuBaru);
    console.log(currentData);

    localStorage.setItem("daftarMenu", JSON.stringify(currentData));
}

/* Hapus Menu */
function hapusMenu(id) {
    let currentData = JSON.parse(localStorage.getItem("daftarMenu"));
    let index = currentData.findIndex(data => data.id == id);
    console.log(index);
    if (index > -1) {
        currentData.splice(index, 1);
        console.log(currentData);
    }
    localStorage.setItem("daftarMenu", JSON.stringify(currentData));
    window.location.reload();
}

/* Restock Menu */
const restockModalTBody = document.querySelector("#restockModal #restockTable tbody");
let esKulKul = jenisMenu.find(data => data.nama == 'Es Kul-Kul');
daftarMenu.map((data, index) => {
    if (data.jenis == esKulKul.id) {
        restockModalTBody.innerHTML += `
            <tr>
                <td>${data.nama}</td>
                <td>
                    <input type="number" inputmode="numeric" min="1" class="form-control" value="${data.stok}" data-id="${data.id}">
                </td>
            </tr>
            `;
    }
});

function restockMenu() {
    const inputs = document.querySelectorAll("#restockModal #restockTable tbody input");
    console.log(inputs);
    console.log(inputs.length);
    let currentData = JSON.parse(localStorage.getItem("daftarMenu"));
    for (i = 0; i < inputs.length; i++) {
        let index = currentData.findIndex(data => data.id == inputs[i].getAttribute("data-id"));
        console.log(index);
        let newData = currentData[index];
        console.log(currentData[index]);
        newData.stok = inputs[i].value;
        currentData.splice(index, 1);
        currentData.push(newData);

        localStorage.setItem("daftarMenu", JSON.stringify(currentData));
        console.log(currentData);
    }
}