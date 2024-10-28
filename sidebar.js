document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;
    
    sidebarToggle.addEventListener('click', function() {
        body.classList.toggle('sidebar-collapsed');
    });

    // Navigation Active State
    const navItems = document.querySelectorAll('.sidebar-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Notifications Dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', () => {
        // Add notification dropdown logic here
        console.log('Notifications clicked');
    });

    // Messages Dropdown
    const messagesBtn = document.querySelector('.messages-btn');
    messagesBtn.addEventListener('click', () => {
        // Add messages dropdown logic here
        console.log('Messages clicked');
    });
});
