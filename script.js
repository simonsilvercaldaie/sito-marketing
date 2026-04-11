/* ============================================
   SIMON SILVER — SITO MARKETING
   JavaScript: Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');

    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            navMobile.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        navMobile.querySelectorAll('.nav-mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                navMobile.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===== SCROLL ANIMATIONS (IntersectionObserver) =====
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stat number, trigger count animation
                const statNumbers = entry.target.querySelectorAll('[data-count]');
                statNumbers.forEach(el => animateCount(el));
                
                // Unobserve after animation (one-time)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ===== NUMBER COUNT ANIMATION =====
    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // ms
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== WHATSAPP FLOAT: show after scroll =====
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0)';
        whatsappFloat.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        let floatShown = false;
        window.addEventListener('scroll', () => {
            if (!floatShown && window.scrollY > 400) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'scale(1)';
                floatShown = true;
            }
        }, { passive: true });
    }

    // ===== NAVBAR MOBILE TOGGLE ANIMATION =====
    const style = document.createElement('style');
    style.textContent = `
        .nav-mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .nav-mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .nav-mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);

});
