/**
 * Travel C Sri Lanka - Main JavaScript
 * Handles navigation, form submission, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initNavigation();
    initMobileMenu();
    initBookingForm();
    initScrollEffects();
});

/**
 * Preloader Control
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

/**
 * Navigation scroll effect
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initial check
    handleScroll();

    // Listen for scroll
    window.addEventListener('scroll', handleScroll);
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Booking form to WhatsApp message
 */
function initBookingForm() {
    const form = document.getElementById('booking-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || 'Not provided',
            phone: formData.get('phone') || 'Not provided',
            pickup: formData.get('pickup') || 'Not specified',
            drop: formData.get('drop') || 'Not specified',
            date: formData.get('date') || 'Not specified',
            time: formData.get('time') || 'Not specified',
            passengers: formData.get('passengers') || 'Not specified',
            vehicle: formData.get('vehicle') || 'Any',
            notes: formData.get('notes') || 'None'
        };

        // Format date nicely
        if (data.date && data.date !== 'Not specified') {
            const dateObj = new Date(data.date);
            data.date = dateObj.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }

        // Build WhatsApp message
        const message = `Hello Travel C Sri Lanka,
I want to book a taxi service.

*Customer Details:*
Name: ${data.name}
Phone: ${data.phone}

*Trip Details:*
Pickup Location: ${data.pickup}
Drop Location: ${data.drop}
Date: ${data.date}
Time: ${data.time}
Passengers: ${data.passengers}
Vehicle Type: ${data.vehicle}
Notes: ${data.notes}

Please confirm availability and pricing. Thank you!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp number (without + sign for URL)
        const whatsappNumber = '94712220002';

        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
}

/**
 * Scroll effects and animations
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .destination-card, .fleet-card, .why-us-item, .step-card, .fleet-page-card');

    if (revealElements.length === 0) return;

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Initial check
    revealOnScroll();

    // Listen for scroll
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * Utility: Format phone number for display
 */
function formatPhoneNumber(phone) {
    // Format: +94 71 222 0002
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('94')) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    return phone;
}

/**
 * Utility: Open WhatsApp with pre-filled message
 */
function openWhatsApp(message = '') {
    const whatsappNumber = '94712220002';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}
