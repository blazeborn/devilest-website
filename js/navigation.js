// Navigation Module

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar scroll effect - fade background only
let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;
            
            // Fade background when scrolling down, show when scrolling up or at top
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - make transparent
                navbar.classList.add('transparent');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                // Scrolling up or near top - show background
                navbar.classList.remove('transparent');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
});