// ================= DATA DESTINASI (12) =================
const data = [
  {nama:"Bali", harga:2000000, img:"images/bali.jpg"},
  {nama:"Raja Ampat", harga:5000000, img:"images/raja ampat.jpg"},
  {nama:"Yogyakarta", harga:1500000, img:"images/yogyakarta.jpg"},
  {nama:"Lombok", harga:2500000, img:"images/lombok.jpg"},
  {nama:"Bandung", harga:1200000, img:"images/bandung.jpg"},
  {nama:"Labuan Bajo", harga:4000000, img:"images/labuan bajo.jpg"},
  {nama:"Bromo", harga:1800000, img:"images/bromo.jpg"},
  {nama:"Danau Toba", harga:2200000, img:"images/danau toba.jpg"},
  {nama:"Surabaya", harga:1700000, img:"images/surabaya.jpg"},
  {nama:"Makassar", harga:2100000, img:"images/makassar.jpg"},
  {nama:"Jakarta", harga:1000000, img:"images/jakarta.jpg"},
  {nama:"Malang", harga:1300000, img:"images/malang.jpg"}
];

let bookings = [];

// ================= RENDER DESTINASI =================
function renderDestinasi(list = data){
  let html = "";

  list.forEach(d=>{
    html += `
    <div class="card">
      <img src="${d.img}">
      <div class="card-body">
        <h4>${d.nama}</h4>
        <p>Rp ${d.harga.toLocaleString()}</p>
      </div>
    </div>`;
  });

  document.getElementById("list").innerHTML = html;
}

// ================= ISI SELECT =================
function isiSelect(){
  let s = "";

  data.forEach(d=>{
    s += `<option value="${d.nama}">${d.nama}</option>`;
  });

  document.getElementById("destinasiSelect").innerHTML = s;
}

// ================= FORMAT TANGGAL =================
function formatTanggal(tgl){
  const bulan = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  let d = new Date(tgl);
  return d.getDate()+" "+bulan[d.getMonth()]+" "+d.getFullYear();
}

// ================= BOOKING =================
function booking(){
  let nama = document.getElementById("nama").value;
  let dest = document.getElementById("destinasiSelect").value;
  let orang = document.getElementById("orang").value;
  let tgl = document.getElementById("tanggal").value;

  if(!nama || !orang || !tgl){
    alert("Isi semua data dulu!");
    return;
  }

  let harga = data.find(d=>d.nama === dest).harga;
  let total = harga * orang;

  bookings.push({nama, dest, orang, tgl, total});
  renderBooking();
}

// ================= RENDER RIWAYAT =================
function renderBooking(){
  let html = "";
  let totalUang = 0;

  bookings.forEach((b,i)=>{
    totalUang += b.total;

    html += `
    <div class="booking-item">
      <div class="booking-text">
        <b>${b.nama} - ${b.dest}</b>
        <span>${formatTanggal(b.tgl)} - Rp ${b.total.toLocaleString()}</span>
      </div>
      <button class="hapus" onclick="hapus(${i})">Hapus</button>
    </div>`;
  });

  document.getElementById("riwayat").innerHTML = html;
  document.getElementById("total").innerText = bookings.length;
  document.getElementById("uang").innerText = "Rp " + totalUang.toLocaleString();
}

// ================= HAPUS =================
function hapus(i){
  bookings.splice(i,1);
  renderBooking();
}

// ================= SEARCH =================
document.getElementById("search").addEventListener("input", function(){
  let keyword = this.value.toLowerCase();

  let hasil = data.filter(d =>
    d.nama.toLowerCase().includes(keyword)
  );

  renderDestinasi(hasil);
});

// ================= NAV ACTIVE =================
const links = document.querySelectorAll('.menu a');

links.forEach(link=>{
  link.addEventListener('click', function(){
    links.forEach(l=>l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ================= INIT =================
renderDestinasi();
isiSelect();