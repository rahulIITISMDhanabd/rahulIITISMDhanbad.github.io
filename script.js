// script.js – Pro Scholar Portfolio UX (Climate Change/Environment)
document.addEventListener('DOMContentLoaded', function() {
    // ===== Header scroll shadow effect =====
    const header = document.getElementById('header');
    function updateHeader() {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', updateHeader);

    // ===== Mobile menu toggle & hamburger animation =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ===== Smooth scrolling for all #nav links =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // ===== Animated fade-in/slide-up elements with IntersectionObserver =====
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // ===== Skill/progress bar reveal on scroll =====
    function animateBars(selector, delay = 100) {
        const bars = document.querySelectorAll(selector);
        const barObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => { bar.style.width = width; }, delay);
                }
            });
        }, observerOptions);
        bars.forEach(bar => { barObserver.observe(bar); });
    }
    animateBars('.skill-progress');
    animateBars('.progress-fill', 200);

    // ===== Active navigation section highlight =====
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', highlightActiveSection);

    // ===== Add highlight style for active navigation =====
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active, .mobile-nav-link.active {
            color: var(--accent-primary) !important;
            background-color: rgba(45, 143, 93, 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== Parallax for floating SVG elements =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.floating-element').forEach((element, idx) => {
            const speed = 0.3 + (idx * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== Enhanced card hover effect =====
    document.querySelectorAll('.research-card, .project-card, .skill-category, .award-content').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== Social link icon subtle animation =====
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('svg');
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('svg');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===== Earth rotation (if present) slows as user scrolls =====
    const earthRotation = document.querySelector('.earth-rotation');
    if (earthRotation) {
        window.addEventListener('scroll', function() {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            const rotationSpeed = 60 - (scrollPercent * 20);
            earthRotation.style.animationDuration = `${Math.max(rotationSpeed, 40)}s`;
        });
    }

    // ===== Typewriter effect for hero subtitle =====
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid var(--accent-primary)';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70);
            } else {
                setTimeout(() => { heroSubtitle.style.borderRight = 'none'; }, 700);
            }
        }
        setTimeout(typeWriter, 700);
    }

    // ===== Add fade-in to the body on load =====
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // ===== Show scholar's contact/email =====
    // Add explicit email for quick reference
    const contactList = document.querySelector('.contact-list');
    if (contactList && !document.querySelector('.email-scholar')) {
        const emailItem = document.createElement('a');
        emailItem.href = 'mailto:rahulevs01@gmail.com';
        emailItem.className = 'contact-item email-scholar';
        emailItem.innerHTML = `
            <div class="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
            </div>
            <div>
                <div class="contact-label">Email</div>
                <div class="contact-value">rahulevs01@gmail.com</div>
            </div>
        `;
        contactList.appendChild(emailItem);
    }

    // ===== Scholar-specific touch: console log for debug =====
    console.log('🌱 Rahul Kumar | Research Scholar Portfolio loaded. Contact: rahulevs01@gmail.com');
});
