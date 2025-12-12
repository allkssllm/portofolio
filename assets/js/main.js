// --- 1. DARK MODE LOGIC ---
const toggleBtn = document.getElementById('theme-toggle');
const circle = document.getElementById('theme-circle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const html = document.documentElement;

function updateThemeDisplay(isDark) {
    if (isDark) {
        html.classList.add('dark');
        if (circle) circle.style.transform = 'translateX(48px)';
        if (sunIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            moonIcon.classList.add('block');
        }
    } else {
        html.classList.remove('dark');
        if (circle) circle.style.transform = 'translateX(0)';
        if (sunIcon) {
            sunIcon.classList.remove('hidden');
            sunIcon.classList.add('block');
            moonIcon.classList.remove('block');
            moonIcon.classList.add('hidden');
        }
    }
}

if (localStorage.getItem('theme') === 'dark') {
    updateThemeDisplay(true);
} else {
    updateThemeDisplay(false);
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'light');
            updateThemeDisplay(false);
        } else {
            localStorage.setItem('theme', 'dark');
            updateThemeDisplay(true);
        }
    });
}

// --- 2. MOBILE MENU ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
let isMenuOpen = false;

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            burgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            burgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            burgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });
}

// --- 3. ROBUST GSAP ANIMATIONS ---

document.addEventListener("DOMContentLoaded", (event) => {
    // Check if GSAP loaded correctly
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Helper function: Animate elements from bottom fade
        const animateUp = (selector, delay = 0, stagger = 0.1) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                gsap.fromTo(elements,
                    {
                        autoAlpha: 0, // autoAlpha handles visibility + opacity
                        y: 50
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        stagger: stagger,
                        delay: delay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elements[0], // Use first element as trigger
                            start: "top 90%", // Trigger when slightly visible
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        };

        // Apply animations
        animateUp('.hero-text', 0.2);
        animateUp('.hero-img', 0.5);

        // For grids (Bento, Projects, Certs), we trigger each item individually
        const animateGrid = (selector) => {
            gsap.utils.toArray(selector).forEach((el, i) => {
                gsap.fromTo(el,
                    { autoAlpha: 0, y: 50 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        };

        animateGrid('.gsap-reveal:not(.hero-text):not(.hero-img)');

    } else {
        // Fallback: If GSAP fails to load, make sure everything is visible
        console.warn("GSAP not loaded. Removing hidden classes.");
        document.querySelectorAll('.gsap-reveal').forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});
