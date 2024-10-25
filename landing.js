// Efek Scroll - Mengungkap bagian saat halaman di-scroll
window.addEventListener('scroll', revealSections);

function revealSections() {
    const sections = document.querySelectorAll('.hidden');
    const revealPoint = window.innerHeight / 1.3;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < revealPoint) {
            section.classList.add('visible');
        }
    });
}

// Animasi Smooth Scroll untuk link navigasi
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});
