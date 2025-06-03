// DOM Content Loaded
// Modern, clean, professional, and unique for a climate scientist

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeMobileMenu();
    // No scroll animations for a professional, clean look
    // No typing animation for simplicity
    // No scroll-to-top button for minimalism
});

// Navigation: highlight active link
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    function setActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Navbar background on scroll
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'hsla(0, 0%, 100%, 0.98)';
            navbar.style.boxShadow = '0 2px 20px hsla(220, 10%, 85%, 0.1)';
        } else {
            navbar.style.backgroundColor = 'hsla(0, 0%, 100%, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
}

// Mobile menu toggle
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}
