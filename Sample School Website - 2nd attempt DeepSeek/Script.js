document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const panels = document.querySelectorAll('.panel');

    hamburger.addEventListener('click', function () {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetPanel = document.querySelector(targetId);

            // Update active states
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Hide all panels
            panels.forEach(panel => panel.classList.remove('active'));

            // Show target panel
            targetPanel.classList.add('active');

            // Close mobile menu
            menu.classList.remove('active');
            hamburger.classList.remove('active');

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Animate numbers in achievements section
    const achievementNumbers = document.querySelectorAll('.achievement-item h3');

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.textContent.includes('+') ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseInt(element.textContent);
                animateValue(element, 0, endValue, 2000);
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    achievementNumbers.forEach(number => {
        observer.observe(number);
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.message-card, .achievement-item, .facility-card, .curriculum-card, .exam-card, .event-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for menu links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.opacity = '';
                    span.style.transform = '';
                });
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update active panel
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                targetElement.classList.add('active');

                // Update active menu item
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Panel switching
    const navLinks = document.querySelectorAll('nav a');

    function setActivePanel() {
        const scrollPosition = window.scrollY + 100;

        panels.forEach(panel => {
            const panelTop = panel.offsetTop;
            const panelHeight = panel.offsetHeight;

            if (scrollPosition >= panelTop && scrollPosition < panelTop + panelHeight) {
                document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
                panel.classList.add('active');

                const correspondingLink = document.querySelector(`nav a[href="#${panel.id}"]`);
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Set initial active panel based on hash
    if (window.location.hash) {
        const initialPanel = document.querySelector(window.location.hash);
        if (initialPanel) {
            document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
            initialPanel.classList.add('active');

            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`nav a[href="${window.location.hash}"]`).classList.add('active');
        }
    }

    window.addEventListener('scroll', setActivePanel);
    window.addEventListener('load', setActivePanel);

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.message-card, .achievement-item, .about-card, .admission-card, .facility-card, .curriculum-card, .exam-card, .event-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.message-card, .achievement-item, .about-card, .admission-card, .facility-card, .curriculum-card, .exam-card, .event-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Footer year update
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Google Maps iframe lazy loading
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.setAttribute('loading', 'lazy');
    }
});