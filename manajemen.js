// Data storage
let karyawanData = [];
let absensiData = [];
let laporanData = [];
let gajiData = [];

// Show active section
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Modal handling
function setupModal(modalId, btnId, formId, dataArray, tableId, createRowFunction) {
    const modal = document.getElementById(modalId);
    const btn = document.getElementById(btnId);
    const span = modal.querySelector('.close');
    const form = document.getElementById(formId);

    btn.onclick = () => modal.style.display = "block";
    span.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        dataArray.push(data);
        updateTable(tableId, dataArray, createRowFunction);
        modal.style.display = "none";
        form.reset();
    }
}

// Table updates
function updateTable(tableId, data, createRowFunction) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        tbody.appendChild(createRowFunction(item, index));
    });
}

// Create table rows
function createKaryawanRow(data, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.id}</td>
        <td>${data.nama}</td>
        <td>${data.email}</td>
        <td>${data.jabatan}</td>
        <td>${data.divisi}</td>
        <td>
            <a href="#" onclick="editKaryawan(${index})"><i class="fas fa-edit"></i></a>
            <a href="#" onclick="deleteKaryawan(${index})"><i class="fas fa-trash"></i></a>
        </td>
    `;
    return tr;
}

// Settings functions
function updateProfile() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!fullName || !email || !phone) {
        alert('Mohon lengkapi semua field');
        return;
    }

    // Simulasi update profil
    alert('Profil berhasil diperbarui');
}

function updatePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert('Mohon lengkapi semua field');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Password baru dan konfirmasi password tidak cocok');
        return;
    }

    // Simulasi update password
    alert('Password berhasil diubah');
    
    // Reset form
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function updateNotifications() {
    const emailNotif = document.getElementById('emailNotif').checked;
    const loginNotif = document.getElementById('loginNotif').checked;
    const updateNotif = document.getElementById('updateNotif').checked;

    // Simulasi update notifikasi
    alert('Pengaturan notifikasi berhasil disimpan');
}

// Logout functions
function cancelLogout() {
    // Kembali ke dashboard
    showSection('dashboard');
}

function processLogout() {
    // Tambahkan animasi fade out
    document.body.classList.add('fade-out');

    // Simulasi proses logout
    setTimeout(() => {
        // Hapus data sesi
        localStorage.removeItem('userSettings');
        localStorage.removeItem('isLoggedIn');
        sessionStorage.clear();

        // Tampilkan pesan logout
        alert('Anda berhasil logout');

        // Redirect ke halaman login
        window.location.href = 'login.html'; // Sesuaikan dengan halaman login Anda
    }, 500);
}

// Create gaji rows
function createGajiRow(data, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.idKaryawan}</td>
        <td>${data.nama}</td>
        <td>Rp ${formatNumber(data.gajiPokok)}</td>
        <td>Rp ${formatNumber(data.tunjangan)}</td>
        <td>Rp ${formatNumber(data.lembur)}</td>
        <td>Rp ${formatNumber(data.potongan)}</td>
        <td>Rp ${formatNumber(hitungTotalGaji(data))}</td>
        <td>${data.periode}</td>
        <td><span class="badge ${data.status.toLowerCase()}">${data.status}</span></td>
        <td>
            <a href="#" class="action-btn edit" onclick="editGaji(${index})"><i class="fas fa-edit"></i></a>
            <a href="#" class="action-btn print" onclick="printSlipGaji(${index})"><i class="fas fa-print"></i></a>
            <a href="#" class="action-btn delete" onclick="deleteGaji(${index})"><i class="fas fa-trash"></i></a>
        </td>
    `;
    return tr;
}

// Format number
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Hitung total gaji
function hitungTotalGaji(data) {
    return parseInt(data.gajiPokok) + 
           parseInt(data.tunjangan) + 
           parseInt(data.lembur) - 
           parseInt(data.potongan);
}

// Print slip gaji
function printSlipGaji(index) {
    const data = gajiData[index];
    // Implementasi print slip gaji
    alert('Fitur print slip gaji akan segera tersedia');
}

// Edit gaji
function editGaji(index) {
    // Implementasi edit gaji
    alert('Fitur edit gaji akan segera tersedia');
}

// Delete gaji
function deleteGaji(index) {
    if (confirm('Apakah Anda yakin ingin menghapus data gaji ini?')) {
        gajiData.splice(index, 1);
        updateTable('penggajian', gajiData, createGajiRow);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupModal('modalKaryawan', 'tambahKaryawan', 'formKaryawan', karyawanData, 'karyawan', createKaryawanRow);
    setupModal('modalGaji', 'tambahGaji', 'formGaji', gajiData, 'penggajian', createGajiRow);
    // Similar setup for absensi and laporan
    
    // Delete handlers
    window.deleteKaryawan = (index) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            karyawanData.splice(index, 1);
            updateTable('karyawan', karyawanData, createKaryawanRow);
        }
    }
    
    // Edit handlers
    window.editKaryawan = (index) => {
        // Implement edit functionality
        alert('Edit functionality to be implemented');
    }

    // Initialize settings values from localStorage if available
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('fullName').value = settings.fullName || '';
        document.getElementById('email').value = settings.email || '';
        document.getElementById('phone').value = settings.phone || '';
        document.getElementById('emailNotif').checked = settings.emailNotif ?? true;
        document.getElementById('loginNotif').checked = settings.loginNotif ?? true;
        document.getElementById('updateNotif').checked = settings.updateNotif ?? true;
    }

    // Tambahkan handler untuk link logout di sidebar
    const logoutLink = document.querySelector('a[onclick="showSection(\'logout\')"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('logout');
        });
    }
});
// Tambahkan fungsi untuk cek status login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html'; // Sesuaikan dengan halaman login Anda
    }
}

// Panggil fungsi cek login saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkLoginStatus);
