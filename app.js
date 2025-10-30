// Scroll-based animations and navigation

let sections;
let navDots;
let currentSection = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    sections = document.querySelectorAll('.section');
    navDots = document.querySelectorAll('.nav-dot');
    
    // Set up intersection observer for scroll animations
    setupScrollAnimations();
    
    // Set up navigation dots
    setupNavigation();
    
    // Animate counting numbers
    animateNumbers();
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
});

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fadeElements = entry.target.querySelectorAll('.fade-in');
                fadeElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, index * 100);
                });
                
                // Trigger number animations when stats section is visible
                if (entry.target.classList.contains('opportunity')) {
                    animateStatNumbers();
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function setupNavigation() {
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetSection = sections[index];
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

function updateActiveSection() {
    let current = 0;
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = index;
        }
    });
    
    if (current !== currentSection) {
        currentSection = current;
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
    }
}

function animateNumbers() {
    const numberElements = document.querySelectorAll('[data-target]');
    
    numberElements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        animateValue(el, 0, target, 2000);
    });
}

function animateStatNumbers() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    let animated = false;
    
    if (animated) return;
    animated = true;
    
    statValues.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                el.textContent = formatNumber(current);
            }
        }, 16);
    });
}

function animateValue(element, start, end, duration) {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = formatNumber(end);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1) {
        return num.toFixed(num < 10 ? 2 : 0);
    }
    return num.toFixed(2);
}

// Smooth scroll for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add hover effect to cards
const cards = document.querySelectorAll('.stat-card, .effect-card, .milestone-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add subtle animation to gold line
const goldLine = document.querySelector('.gold-line');
if (goldLine) {
    setTimeout(() => {
        goldLine.style.width = '120px';
        goldLine.style.transition = 'width 1s ease';
    }, 500);
}

// Log message for document links (simulating PDF generation)
console.log('Adventure Labs Digital Transformation Proposal');
console.log('Interactive web presentation loaded successfully');
console.log('Supporting documents: Market Analysis, Quotation, SLA, Invoice');
console.log('In production, these would generate downloadable PDFs');