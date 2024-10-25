// Data Dummy
const monthlyData = [
    { name: 'Jan', pengunjung: 2890, postingan: 24, komentar: 156, penjualan: 15000000 },
    { name: 'Feb', pengunjung: 3200, postingan: 28, komentar: 180, penjualan: 18500000 },
    { name: 'Mar', pengunjung: 3100, postingan: 30, komentar: 195, penjualan: 17800000 },
    { name: 'Apr', pengunjung: 3500, postingan: 32, komentar: 210, penjualan: 21000000 },
    { name: 'Mei', pengunjung: 3800, postingan: 35, komentar: 225, penjualan: 23500000 },
    { name: 'Jun', pengunjung: 4200, postingan: 38, komentar: 240, penjualan: 25800000 },
    { name: 'Jul', pengunjung: 4500, postingan: 40, komentar: 260, penjualan: 28000000 },
    { name: 'Ags', pengunjung: 4800, postingan: 42, komentar: 280, penjualan: 30500000 },
    { name: 'Sep', pengunjung: 5000, postingan: 45, komentar: 300, penjualan: 32000000 },
    { name: 'Okt', pengunjung: 5200, postingan: 48, komentar: 320, penjualan: 34500000 },
    { name: 'Nov', pengunjung: 5500, postingan: 50, komentar: 340, penjualan: 36800000 },
    { name: 'Des', pengunjung: 5800, postingan: 52, komentar: 360, penjualan: 40000000 }
];

let posts = [
    { id: 1, title: 'Memulai dengan React', content: 'Tutorial dasar React untuk pemula...', date: '2024-10-15' },
    { id: 2, title: 'Tips SEO 2024', content: 'Cara mengoptimalkan website Anda...', date: '2024-10-16' }
];

// Fungsi Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);
};

// Inisialisasi Statistik
const updateStats = () => {
    const latestData = monthlyData[monthlyData.length - 1];
    document.getElementById('totalPosts').textContent = latestData.postingan;
    document.getElementById('totalComments').textContent = latestData.komentar;
    document.getElementById('totalVisitors').textContent = latestData.pengunjung.toLocaleString();
    document.getElementById('totalSales').textContent = formatRupiah(latestData.penjualan);
};

// Inisialisasi Grafik Penjualan
const initSalesChart = () => {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return; // Pastikan canvas ada

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.map(data => data.name),
            datasets: [{
                label: 'Penjualan',
                data: monthlyData.map(data => data.penjualan),
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatRupiah(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatRupiah(context.raw);
                        }
                    }
                }
            }
        }
    });
};

// Inisialisasi Grafik Statistik
const initStatsChart = () => {
    const ctx = document.getElementById('statsChart');
    if (!ctx) return; // Pastikan canvas ada

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.map(data => data.name),
            datasets: [
                {
                    label: 'Pengunjung',
                    data: monthlyData.map(data => data.pengunjung),
                    borderColor: '#3b82f6',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Postingan',
                    data: monthlyData.map(data => data.postingan),
                    borderColor: '#10b981',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Komentar',
                    data: monthlyData.map(data => data.komentar),
                    borderColor: '#f59e0b',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Manajemen Post
const renderPosts = () => {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = posts.map(post => `
        <div class="post-item" data-id="${post.id}">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <p class="post-date">${post.date}</p>
            <div class="post-actions">
                <button class="btn btn-secondary edit-post">Edit</button>
                <button class="btn btn-danger delete-post">Hapus</button>
            </div>
        </div>
    `).join('');
};

// Event Listeners untuk Post Management
const initPostManagement = () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const savePostBtn = document.getElementById('savePostBtn');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const postsList = document.getElementById('postsList');

    if (newPostBtn) {
        newPostBtn.addEventListener('click', () => {
            newPostForm.classList.remove('hidden');
        });
    }

    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', () => {
            newPostForm.classList.add('hidden');
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
        });
    }

    if (savePostBtn) {
        savePostBtn.addEventListener('click', () => {
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            
            if (title && content) {
                const newPost = {
                    id: posts.length + 1,
                    title,
                    content,
                    date: new Date().toISOString().split('T')[0]
                };
                
                posts.push(newPost);
                renderPosts();
                newPostForm.classList.add('hidden');
                document.getElementById('postTitle').value = '';
                document.getElementById('postContent').value = '';
            }
        });
    }

    if (postsList) {
        postsList.addEventListener('click', (e) => {
            const postItem = e.target.closest('.post-item');
            if (!postItem) return;
            
            const postId = parseInt(postItem.dataset.id);
            
            if (e.target.classList.contains('delete-post')) {
                posts = posts.filter(post => post.id !== postId);
                renderPosts();
            }
            
            if (e.target.classList.contains('edit-post')) {
                // Implementasi edit post
                const post = posts.find(p => p.id === postId);
                if (post) {
                    postItem.innerHTML = `
                        <input type="text" class="form-input" value="${post.title}">
                        <textarea class="form-textarea">${post.content}</textarea>
                        <div class="post-actions">
                            <button class="btn btn-primary save-edit">Simpan</button>
                            <button class="btn btn-secondary cancel-edit">Batal</button>
                        </div>
                    `;
                }
            }
            
            if (e.target.classList.contains('save-edit')) {
                const newTitle = postItem.querySelector('input').value;
                const newContent = postItem.querySelector('textarea').value;
                
                posts = posts.map(post => 
                    post.id === postId 
                        ? {...post, title: newTitle, content: newContent}
                        : post
                );
                renderPosts();
            }
            
            if (e.target.classList.contains('cancel-edit')) {
                renderPosts();
            }
        });
    }
};

// Inisialisasi semua komponen saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Update statistik
    updateStats();
    
    // Inisialisasi grafik
    initSalesChart();
    initStatsChart();
    
    // Render posts dan inisialisasi manajemen post
    renderPosts();
    initPostManagement();
});