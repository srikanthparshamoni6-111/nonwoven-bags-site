// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        
        // Show success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    }, 2000);
});

// Function to show messages
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Add message after the form
    contactForm.insertAdjacentElement('afterend', messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .service-card, .contact-card, .feature');
    animateElements.forEach(el => observer.observe(el));
});

// Click to call functionality for phone numbers
document.querySelectorAll('.contact-card p').forEach(p => {
    const text = p.textContent;
    if (text.includes('9000115605') || text.includes('8790285519') || text.includes('9381430317')) {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => {
            const phoneNumber = text.match(/\d{10}/)[0];
            window.location.href = `tel:+91${phoneNumber}`;
        });
    }
});

// Statistics counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue) + suffix;
        }, 50);
    });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// WhatsApp contact functionality
function createWhatsAppLinks() {
    const whatsappNumbers = {
        'proprietors': '919000115605',
        'sales': '918790285519',
        'operations': '919381430317'
    };
    
    // Add WhatsApp buttons to contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        const cardText = card.textContent.toLowerCase();
        let phoneKey = '';
        
        if (cardText.includes('proprietors') || cardText.includes('jamuna') || cardText.includes('narsimlu')) {
            phoneKey = 'proprietors';
        } else if (cardText.includes('sales') || cardText.includes('srikanth')) {
            phoneKey = 'sales';
        } else if (cardText.includes('operations') || cardText.includes('kavya')) {
            phoneKey = 'operations';
        }
        
        if (phoneKey) {
            const whatsappBtn = document.createElement('div');
            whatsappBtn.innerHTML = `
                <a href="https://wa.me/${whatsappNumbers[phoneKey]}?text=Hello%20Srivenkateshwara%20NON%20Woven%20Bags!%20I%20would%20like%20to%20inquire%20about%20your%20products." 
                   target="_blank" 
                   style="display: inline-block; background: #25D366; color: white; padding: 8px 15px; border-radius: 20px; text-decoration: none; font-size: 0.9rem; margin-top: 10px;">
                   <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
            `;
            card.appendChild(whatsappBtn);
        }
    });
}

// Initialize WhatsApp links when page loads
document.addEventListener('DOMContentLoaded', createWhatsAppLinks);

// Email link functionality
function createEmailLink() {
    const emailButton = document.createElement('div');
    emailButton.style.textAlign = 'center';
    emailButton.style.marginTop = '2rem';
    emailButton.innerHTML = `
        <a href="mailto:info@srivenkateshwara.com?subject=Product%20Inquiry&body=Hello%20Srivenkateshwara%20NON%20Woven%20Bags,%0A%0AI%20would%20like%20to%20inquire%20about%20your%20products.%0A%0APlease%20provide%20more%20information.%0A%0AThank%20you." 
           style="display: inline-block; background: #2c5530; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600;">
           <i class="fas fa-envelope"></i> Send Email
        </a>
    `;
    
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.appendChild(emailButton);
    }
}

// Initialize email link when page loads
document.addEventListener('DOMContentLoaded', createEmailLink);

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const inquiry = document.getElementById('inquiry').value;
    
    if (!name) {
        showMessage('Please enter your name.', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!inquiry) {
        showMessage('Please select an inquiry type.', 'error');
        return false;
    }
    
    if (!message) {
        showMessage('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update form submission to include validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    }, 2000);
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2c5530;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(44, 85, 48, 0.3);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Print/Save functionality
function addPrintFunction() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Page';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 10px 15px;
        background: #2c5530;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        z-index: 1000;
        font-size: 0.9rem;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.opacity = '1';
    });
    
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.opacity = '0.8';
    });
    
    document.body.appendChild(printBtn);
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', addPrintFunction); 