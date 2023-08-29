/* Load Tanggal Transaksi */
const riwayatTransaksi = JSON.parse(localStorage.getItem("transaksiOrder"));
const selectTanggal = document.querySelector("#selectTanggal");
const groupByTanggal = [...new Set(riwayatTransaksi.map(data => data.tanggal))];
for (let i = 0; i < groupByTanggal.length; i++) {
    selectTanggal.innerHTML += `
    <option selected value="${groupByTanggal[i]}">${groupByTanggal[i]}</option>
    `;
}

const latestDate = (groupByTanggal.length - 1);
loadRiwayatTransaksi(groupByTanggal[latestDate]);
// selectTanggal.addEventListener("change", loadRiwayatTransaksi(selectTanggal.value));


function loadRiwayatTransaksi(tanggal) {
    /* Load Riwayat Transaksi */
    const riwayatTransaksiTBody = document.querySelector("#tableRiwayatTransaksi tbody");
    riwayatTransaksiTBody.innerHTML = "";
    riwayatTransaksi.map(data => {
        if (data.tanggal == tanggal) {
            riwayatTransaksiTBody.innerHTML += `
        <tr class="border-top border-dark-subtle">
            <th>
                <span class="fw-bold">
                    ID :
                </span>
                <span id="idTransaksi" class="fw-normal">${data.id.substr(-12)}</span>
            </th>
            <td class="text-end">${data.tanggal}</td>
        </tr>
    
        <tr class="border-bottom border-dark-subtle">
            <th colspan="2">
                <span class="fw-bold">
                    Total Belanja :
                </span>
                <span id="totalBelanja">Rp. ${data.totalBelanja}</span>
            </th>
        </tr>
    
        <tr>
            <td colspan="2">
    
                <div class="accordion accordion-flush" id="accordionFlush-${data.id}">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapse-${data.id}" aria-expanded="false"
                                aria-controls="flush-collapse-${data.id}">
                                Rincian Pesanan
                            </button>
                        </h2>
                        <div id="flush-collapse-${data.id}" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlush-${data.id}">
                            <div class="accordion-body p-2">
                                <table class="table table-striped table-responsive" id="tableRincianPesanan-${data.id}" data-id="${data.id}">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="col-6">Item</th>
                                            <th scope="col">Jumlah</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
    
            </td>
        </tr>
    
        <tr>
            <th></th>
        </tr>
        `;
        }
    });


    riwayatTransaksi.map(data => {
        if (data.tanggal == tanggal) {
            const tbRincianPesananTBody = document.querySelector(`#tableRincianPesanan-${data.id} tbody`);
            data.orderMenu.map(item => {

                tbRincianPesananTBody.innerHTML += `
                <tr>
                <td class="small">${item.nama} @ Rp. ${item.harga}</td>
                <td class="small">${item.jumlah}pcs</td>
                <td class="small">Rp. ${(item.harga * item.jumlah)}</td>
                </tr>
                `;
            });
        }
    });
}

/* Get Stok Es Kul-Kul */
getStok();
function getStok() {
    const jenisMenu = JSON.parse(localStorage.getItem("jenisMenu"));
    const daftarMenu = JSON.parse(localStorage.getItem("daftarMenu"));

    let idEsKulKul = "";
    for (let i = 0; i < jenisMenu.length; i++) {
        if (jenisMenu[i].nama == "Es Kul-Kul") {
            idEsKulKul = jenisMenu[i].id;
        };
    }

    let totalStok = 0;
    for (let i = 0; i < daftarMenu.length; i++) {
        if (daftarMenu[i].jenis == idEsKulKul) {
            totalStok = totalStok + daftarMenu[i].stok;
        };
    }

    const cardStok = document.querySelector("#cardStok>span:nth-child(2)");
    cardStok.innerHTML = `${totalStok}pcs`;
}

/* Get Pendapatan Hari ini */
getPendapatan();
function getPendapatan() {
    const today = new Date().toLocaleDateString("in-ID");
    const cardPendapatan = document.querySelector("#cardPendapatan>span:nth-child(2)");
    let pendapatan = 0;
    for (let i = 0; i < riwayatTransaksi.length; i++) {
        if (riwayatTransaksi[i].tanggal == today) {
            pendapatan = pendapatan + riwayatTransaksi[i].totalBelanja;
        }
    }
    cardPendapatan.innerHTML = `IDR ${pendapatan}`;
}