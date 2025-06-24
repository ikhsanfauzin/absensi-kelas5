import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHGaVizAiZ5s-s7g1uTJUme_nfz15r-BQ",
  authDomain: "absensi-sdn-fff32.firebaseapp.com",
  databaseURL: "https://absensi-sdn-fff32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "absensi-sdn-fff32",
  storageBucket: "absensi-sdn-fff32.appspot.com",
  messagingSenderId: "133354487975",
  appId: "1:133354487975:web:07c4c6b8113dffe8585b82"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const daftarSiswa = [
  { nama: "Adelia Natasya", nisn: "0147482853" },
  { nama: "Adzkia Samha Saufa", nisn: "3153619924" },
  { nama: "Afifa Asfha Salsabila", nisn: "3143020010" },
  { nama: "Ainun Ahdawiyah", nisn: "3146299332" },
  { nama: "Alya Nurazizah", nisn: "3144297939" },
  { nama: "Azka Latifah", nisn: "0146811350" },
  { nama: "Delia Nathasya", nisn: "3147054805" },
  { nama: "Diana Darriyanti Nurjanah", nisn: "0142442462" },
  { nama: "Erick Harizky Pratama", nisn: "3140782863" },
  { nama: "Ervan Nugraha", nisn: "0143035720" },
  { nama: "Fadlysandi Mulyana", nisn: "0144779029" },
  { nama: "Faiha Nada Zalfa", nisn: "0142433960" },
  { nama: "Hafi Ijlal Ramadhan", nisn: "3143724294" },
  { nama: "Kirana Febrianti", nisn: "0158784080" },
  { nama: "Layyina Lakeysa Janneta", nisn: "0147950421" },
  { nama: "Muhamad Adli Taufik", nisn: "0133779105" },
  { nama: "Muhamad Ardiansyah", nisn: "3143698140" },
  { nama: "Muhamad Rivaldi", nisn: "0144578702" },
  { nama: "Nandi Septian Praditia", nisn: "0144031230" },
  { nama: "Nugraha Abdul Jabar", nisn: "0144040166" },
  { nama: "Putri Hasifa", nisn: "3152848998" },
  { nama: "Putri Salwa Humairoh", nisn: "3140366337" },
  { nama: "Queensa Khanza Azura", nisn: "3143059395" },
  { nama: "Raihana Yasmin Nabila", nisn: "3147074059" },
  { nama: "Refaldi Muhamad Sahreza", nisn: "3145040352" },
  { nama: "Revana Putri Agustina", nisn: "0143731051" },
  { nama: "Sahila Selawati", nisn: "3148751710" },
  { nama: "Salfa Windriani", nisn: "0144510883" },
  { nama: "Salsabila Rahmawati", nisn: "3149041961" },
  { nama: "Salwa Mughni Naziha", nisn: "0148714289" },
  { nama: "Selvia Maulani", nisn: "3158967096" },
  { nama: "Shella Oktaviani", nisn: "3141118807" },
  { nama: "Shofia Salsabila Putri", nisn: "0147761162" },
  { nama: "Silvia Putri", nisn: "0148557929" },
  { nama: "Sinta Oktriani Setiawan", nisn: "0141826264" },
  { nama: "Syakila Naura Azzahra", nisn: "3151344799" },
  { nama: "Warda Fatina Haura", nisn: "3145133631" },
  { nama: "Winda Fityani", nisn: "3144027924" },
  { nama: "Winda Nur Afifah", nisn: "3143877202" }
];

function renderCards() {
  const container = document.getElementById("tableBody");
  container.innerHTML = "";
  daftarSiswa.forEach((siswa, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${index + 1}. ${siswa.nama}</h4>
      <p>NISN: ${siswa.nisn}</p>
      <div class="status-buttons" style="display: flex; gap: 5px; justify-content: center; flex-wrap: wrap;">
        <button onclick="toggleStatus('${siswa.nisn}', 'Hadir', this)">Hadir</button>
        <button onclick="toggleStatus('${siswa.nisn}', 'Sakit', this)">Sakit</button>
        <button onclick="toggleStatus('${siswa.nisn}', 'Izin', this)">Izin</button>
        <button onclick="toggleStatus('${siswa.nisn}', 'Alpa', this)">Alpa</button>
        <input type="hidden" name="status-${siswa.nisn}" value="">
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleStatus = function(nisn, status, btn) {
  const hidden = document.querySelector(`input[name='status-${nisn}']`);
  if (!hidden) return;
  if (hidden.value === status) {
    hidden.value = "";
    btn.style.backgroundColor = "#eee";
    btn.style.color = "black";
  } else {
    hidden.value = status;
    const buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach(b => {
      b.style.backgroundColor = "#eee";
      b.style.color = "black";
    });
    btn.style.backgroundColor = "#4caf50";
    btn.style.color = "white";
  }
};

window.tandaiSemuaHadir = function() {
  daftarSiswa.forEach(siswa => {
    const btn = document.querySelector(`button[onclick*="toggleStatus('${siswa.nisn}', 'Hadir'"]`);
    if (btn) btn.click();
  });
};

function showPopup(message, success = true) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "30px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.padding = "15px 25px";
  popup.style.backgroundColor = success ? "#4caf50" : "#f44336";
  popup.style.color = "white";
  popup.style.borderRadius = "6px";
  popup.style.zIndex = 9999;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => document.body.removeChild(popup), 5000);
}

window.kirimAbsen = function() {
  const tanggal = document.getElementById("tanggal").value;
  if (!tanggal) {
    showPopup("Silakan pilih tanggal terlebih dahulu.", false);
    return;
  }

  let siswaKosong = [];
  daftarSiswa.forEach(siswa => {
    const statusInput = document.querySelector(`input[name='status-${siswa.nisn}']`);
    const status = statusInput ? statusInput.value : "";
    if (!status) siswaKosong.push(siswa.nama);
  });

  if (siswaKosong.length > 0) {
    showPopup("❌ Gagal kirim absen. Belum diisi: " + siswaKosong.join(", "), false);
    return;
  }

  daftarSiswa.forEach(siswa => {
    const statusInput = document.querySelector(`input[name='status-${siswa.nisn}']`);
    const status = statusInput.value;
    set(ref(database, `absensi/${tanggal}/${siswa.nisn}`), {
      nama: siswa.nama,
      nisn: siswa.nisn,
      tanggal,
      status
    });
  });

  showPopup("✅ Absen telah dikirim.");
};

window.onload = () => {
  renderCards();
  const today = new Date();
  const tanggal = today.toISOString().split("T")[0];
  document.getElementById("tanggal").value = tanggal;
};
