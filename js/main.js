/**
 * CARPETAS LED - Main JavaScript
 * Core functionality for navigation, animations, and interactions
 */

// ========================================
// Mobile Navigation Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ========================================
// Header Scroll Effect
// ========================================
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation class
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.benefit-card, .product-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// Cookie Consent Banner
// ========================================
function initCookieConsent() {
    // Check if user has already accepted cookies
    if (localStorage.getItem('cookiesAccepted')) {
        return;
    }

    // Create cookie banner
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
    <div class="cookie-content">
      <p>Utilizamos cookies propias y de terceros para mejorar nuestros servicios. 
      <a href="politica-cookies.html">Más información</a></p>
      <button class="btn btn-primary" id="acceptCookies">Aceptar</button>
    </div>
  `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-secondary);
      color: white;
      padding: 1rem;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      animation: slideUp 0.3s ease-out;
    }
    .cookie-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .cookie-content p {
      margin: 0;
      flex: 1;
    }
    .cookie-content a {
      color: var(--color-primary-light);
      text-decoration: underline;
    }
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    @media (max-width: 768px) {
      .cookie-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Handle accept button
    document.getElementById('acceptCookies').addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => banner.remove(), 300);
    });
}

// Initialize cookie consent on page load
document.addEventListener('DOMContentLoaded', initCookieConsent);

// ========================================
// Active Navigation Link
// ========================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// Form Validation Helper
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.form-error');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.style.borderColor = 'var(--color-error)';
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');

    if (errorElement) {
        errorElement.remove();
    }

    input.style.borderColor = '';
}

// Export functions for use in other scripts
window.carpetasLED = {
    validateEmail,
    validatePhone,
    showError,
    clearError
};
