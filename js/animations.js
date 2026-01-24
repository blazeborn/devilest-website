// Animations Module

// Fade-in animation with Intersection Observer
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
