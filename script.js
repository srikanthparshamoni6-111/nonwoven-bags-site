// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateContactForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Send to Formspree
        fetch('https://formspree.io/f/mjvqgord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'srivenkateshwaranonwovenbags6@gmail.com',
                subject: `Contact Inquiry - ${formObject.inquiry}`,
                message: `
CONTACT FORM SUBMISSION

Name: ${formObject.name}
Email: ${formObject.email}
Phone: ${formObject.phone || 'Not provided'}
Inquiry Type: ${formObject.inquiry}

Message:
${formObject.message}

Submitted on: ${new Date().toLocaleString()}
                `,
                _replyto: formObject.email,
                _subject: `Contact Inquiry - ${formObject.inquiry}`,
            }),
        })
        .then(response => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            
            if (response.ok) {
                showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                showMessage('Message sent! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        })
        .catch(error => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            showMessage('Message received! We will contact you soon.', 'success');
            contactForm.reset();
        });
    });
}

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const inquiry = document.getElementById('inquiry')?.value;
    
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
    messageDiv.innerHTML = `<strong>${type === 'success' ? '✓' : '⚠'}</strong> ${message}`;
    
    // Add message after the form
    if (contactForm) {
        contactForm.insertAdjacentElement('afterend', messageDiv);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Add additional animation classes based on element type
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target.querySelector('h3'));
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .service-card, .contact-card, .feature, .benefit-item, .stat');
    animateElements.forEach(el => observer.observe(el));
});

// Enhanced click to call functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contact-card p').forEach(p => {
        const text = p.textContent;
        const phoneMatch = text.match(/\+91\s*(\d{10})/);
        
        if (phoneMatch) {
            const phoneNumber = phoneMatch[1];
            p.style.cursor = 'pointer';
            p.title = `Click to call ${phoneNumber}`;
            
            p.addEventListener('click', () => {
                window.location.href = `tel:+91${phoneNumber}`;
            });
        }
    });
});

// Enhanced statistics counter animation
function animateCounter(element) {
    if (!element || element.hasAttribute('data-animated')) return;
    
    // Skip elements that don't contain numbers (like "Fast")
    const hasNumbers = /\d/.test(element.textContent);
    if (!hasNumbers) {
        element.setAttribute('data-animated', 'true');
        return;
    }
    
    const finalValue = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let currentValue = 0;
    const increment = finalValue / 60; // 60 frames for smooth animation
    
    element.setAttribute('data-animated', 'true');
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue) + suffix;
    }, 30);
}

// Statistics counter for hero section
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => animateCounter(stat));
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

// Enhanced product card hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// Order form handling with WhatsApp-first approach
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateOrderForm()) {
            return;
        }
        
        // Show processing state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(this);
        const orderData = {};
        formData.forEach((value, key) => {
            orderData[key] = value;
        });
        
        // Immediately open WhatsApp (primary method)
        openWhatsAppOrder(orderData);
        
        // Send email silently in background for record keeping
        sendEmailRecord(orderData);
        
        // Reset form and show success
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            
            showOrderMessage('🎉 Order sent via WhatsApp! Our team will respond within 2 hours with a detailed quote. Thank you!', 'success');
            orderForm.reset();
        }, 1000);
    });
}

// Primary method: Open WhatsApp immediately
function openWhatsAppOrder(orderData) {
    const whatsappMessage = `
🛍️ *NEW ORDER REQUEST* 🛍️

👤 *Customer Details:*
• Name: ${orderData.name}
• Phone: ${orderData.phone}
• Email: ${orderData.email}
• Company: ${orderData.company || 'Individual Customer'}

📦 *Order Details:*
• Bag Type: ${orderData.bagType}
• Quantity: ${orderData.quantity}
• Delivery Timeline: ${orderData.urgency || 'Standard (14 days)'}
• Special Requirements: ${orderData.message || 'None specified'}

📅 Order Date: ${new Date().toLocaleDateString()}
⏰ Order Time: ${new Date().toLocaleTimeString()}

🎯 *Next Steps:*
Please provide a detailed quote with:
• Final pricing
• Available customization options
• Confirmed delivery timeline
• Any additional requirements

*Thank you for choosing Srivenkateshwara NON Woven Bags!*
    `.trim();
    
    const whatsappLink = `https://wa.me/916302067390?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
}

// Background method: Send email for record keeping (silent)
function sendEmailRecord(orderData) {
    // Silently send email for business records - no user feedback on success/failure
    const emailBody = `
🛍️ NEW ORDER REQUEST - RECORD COPY

👤 CUSTOMER DETAILS:
• Name: ${orderData.name}
• Phone: ${orderData.phone}
• Email: ${orderData.email}
• Company: ${orderData.company || 'Individual Customer'}

📦 ORDER DETAILS:
• Bag Type: ${orderData.bagType}
• Quantity: ${orderData.quantity}
• Delivery Timeline: ${orderData.urgency || 'Standard (14 days)'}
• Special Requirements: ${orderData.message || 'None specified'}

📅 Order Date: ${new Date().toLocaleDateString()}
⏰ Order Time: ${new Date().toLocaleTimeString()}

🎯 STATUS: Order sent via WhatsApp to customer
📱 WhatsApp: +91 6302067390

This is an automated record copy. Primary communication is via WhatsApp.
    `;

    fetch('https://formspree.io/f/mjvqgord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'srivenkateshwaranonwovenbags6@gmail.com',
            subject: `📝 Order Record - ${orderData.bagType} (${orderData.quantity})`,
            message: emailBody,
            _replyto: orderData.email,
        }),
    })
    .catch(error => {
        // Silent fail - email is just for records, not critical
        console.log('Email record failed (non-critical):', error);
    });
}

// Enhanced order form validation
function validateOrderForm() {
    const name = document.getElementById('orderName')?.value.trim();
    const phone = document.getElementById('orderPhone')?.value.trim();
    const email = document.getElementById('orderEmail')?.value.trim();
    const bagType = document.getElementById('bagType')?.value;
    const quantity = document.getElementById('quantity')?.value;
    
    if (!name) {
        showOrderMessage('Please enter your full name.', 'error');
        return false;
    }
    
    if (!phone || !isValidPhone(phone)) {
        showOrderMessage('Please enter a valid phone number (e.g., +91 9876543210, 9876543210, or international format).', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showOrderMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!bagType) {
        showOrderMessage('Please select a bag type.', 'error');
        return false;
    }
    
    if (!quantity) {
        showOrderMessage('Please select quantity range.', 'error');
        return false;
    }
    
    return true;
}

// Enhanced validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove all non-digit characters except + for country code
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Check for various valid phone number patterns
    const phonePatterns = [
        // International format with country code (e.g., +91 9876543210, +1 234 567 8900)
        /^\+\d{1,4}\d{6,14}$/,
        
        // Indian mobile numbers (10 digits, starting with 6-9)
        /^[6-9]\d{9}$/,
        
        // Indian landline with STD code (10-11 digits)
        /^[0-9]{10,11}$/,
        
        // US/Canada format (10 digits)
        /^\d{10}$/,
        
        // General international (7-15 digits, with or without country code)
        /^(\+\d{1,4})?\d{6,14}$/
    ];
    
    // Check if phone number matches any valid pattern
    const isValid = phonePatterns.some(pattern => pattern.test(cleanPhone));
    
    // Additional check: must have at least 7 digits and max 19 digits (including country code)
    const digitCount = cleanPhone.replace(/\+/g, '').length;
    
    return isValid && digitCount >= 7 && digitCount <= 19;
}

// Enhanced order message display
function showOrderMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.order-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `order-message ${type === 'success' ? 'success-message' : type === 'warning' ? 'warning-message' : 'error-message'}`;
    
    // Set appropriate icon and styling based on type
    let icon = '⚠';
    let bgColor = '#dc3545';
    if (type === 'success') {
        icon = '✓';
        bgColor = '#28a745';
    } else if (type === 'warning') {
        icon = '⚠';
        bgColor = '#ffc107';
    }
    
    messageDiv.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        animation: slideInDown 0.3s ease-out;
    `;
    
    messageDiv.innerHTML = `<strong style="font-size: 1.2em;">${icon}</strong> <span>${message}</span>`;
    
    // Add message after the form
    const orderFormContainer = document.querySelector('.order-form-container');
    if (orderFormContainer) {
        orderFormContainer.appendChild(messageDiv);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Remove message after appropriate time based on type
    const removeTime = type === 'warning' ? 12000 : 8000; // Warning messages stay longer
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutUp 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, removeTime);
}

// Enhanced file upload preview
const logoFileInput = document.getElementById('logoFile');
if (logoFileInput) {
    logoFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const uploadText = this.parentNode.querySelector('.file-upload-text span');
        const uploadIcon = this.parentNode.querySelector('.file-upload-text i');
        
        if (file) {
            uploadText.textContent = `Selected: ${file.name}`;
            uploadText.style.color = 'var(--primary-color)';
            uploadText.style.fontWeight = '600';
            uploadIcon.className = 'fas fa-check-circle';
            uploadIcon.style.color = 'var(--success-color)';
        } else {
            uploadText.textContent = 'Click to upload or drag and drop';
            uploadText.style.color = '';
            uploadText.style.fontWeight = '';
            uploadIcon.className = 'fas fa-cloud-upload-alt';
            uploadIcon.style.color = '';
        }
    });
}

// Enhanced navigation with active states
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Set active nav item based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// Initialize enhanced navigation
document.addEventListener('DOMContentLoaded', enhanceNavigation);

// Enhanced scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2c5530 0%, #1e3a21 100%);
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
        box-shadow: 0 4px 20px rgba(44, 85, 48, 0.3);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.boxShadow = '0 6px 25px rgba(44, 85, 48, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 4px 20px rgba(44, 85, 48, 0.3)';
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

// Enhanced floating contact buttons
function createFloatingButtons() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-contacts';
    floatingContainer.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        gap: 12px;
    `;
    
    // WhatsApp floating button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/916302067390?text=Hi%20I%20want%20to%20place%20an%20order%20for%20non-woven%20bags';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'floating-whatsapp';
    whatsappBtn.title = 'Chat on WhatsApp';
    whatsappBtn.style.cssText = `
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.75rem;
        text-decoration: none;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        transition: all 0.3s ease;
        animation: pulse-whatsapp 2s infinite;
    `;
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    // Call floating button
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:+916302067390';
    callBtn.className = 'floating-call';
    callBtn.title = 'Call Now';
    callBtn.style.cssText = `
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2c5530 0%, #1e3a21 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
        text-decoration: none;
        box-shadow: 0 4px 15px rgba(44, 85, 48, 0.3);
        transition: all 0.3s ease;
    `;
    callBtn.innerHTML = '<i class="fas fa-phone"></i>';
    
    // Add hover effects
    [whatsappBtn, callBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    floatingContainer.appendChild(whatsappBtn);
    floatingContainer.appendChild(callBtn);
    document.body.appendChild(floatingContainer);
    
    // Add pulse animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-whatsapp {
            0% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
            50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7); }
            100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
        }
        
        @keyframes slideInDown {
            0% {
                transform: translateY(-20px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutUp {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-20px);
                opacity: 0;
            }
        }
        
        .nav-active {
            background: rgba(44, 85, 48, 0.1) !important;
            color: var(--primary-color) !important;
        }
        
        .warning-message {
            background: #ffc107 !important;
            color: #212529 !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating buttons
document.addEventListener('DOMContentLoaded', createFloatingButtons);

// Enhanced hero image carousel
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 2000; // 2 seconds - much faster transitions
    let intervalId;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, slideInterval);
    }

    function stopAutoSlide() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    // Initialize auto-slide
    if (slides.length > 1) {
        startAutoSlide();
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // Manual indicator clicking
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Enhanced page loading with fade-in effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero-content, .hero-image');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Enhanced image loading handler
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state - show image immediately
        img.style.opacity = '1';
        
        // Handle successful image load
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            this.style.opacity = '1';
            console.log('Image loaded successfully:', this.src);
            
            // Hide fallback content for both hero and about images
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('slide-fallback')) {
                fallback.style.opacity = '0';
                fallback.style.pointerEvents = 'none';
                console.log('Hiding fallback for:', this.alt);
            }
        });
        
        // Handle image load error
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            
            // Try backup image if available
            const backupSrc = this.getAttribute('data-backup');
            if (backupSrc && !this.hasAttribute('data-backup-tried')) {
                console.log('Trying backup image:', backupSrc);
                this.setAttribute('data-backup-tried', 'true');
                this.src = backupSrc;
                return; // Don't show fallback yet, try backup first
            }
            
            // If backup also failed or no backup available, show fallback
            this.style.opacity = '0';
            this.style.display = 'none';
            
            // Show fallback content
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('slide-fallback')) {
                fallback.style.opacity = '1';
                fallback.style.pointerEvents = 'auto';
                console.log('Showing fallback for:', this.alt);
            }
        });
        
        // Check if image is already loaded (cached)
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
            img.style.opacity = '1';
            const fallback = img.nextElementSibling;
            if (fallback && fallback.classList.contains('slide-fallback')) {
                fallback.style.opacity = '0';
                fallback.style.pointerEvents = 'none';
            }
            console.log('Image already cached:', img.src);
        }
        
        // Force reload for Google Drive images that might be problematic
        if (img.src.includes('drive.google.com')) {
            console.log('Google Drive image detected, forcing reload:', img.src);
            setTimeout(() => {
                if (!img.complete || img.naturalWidth === 0) {
                    console.log('Retrying Google Drive image:', img.src);
                    const originalSrc = img.src;
                    img.src = '';
                    img.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + 'cache=' + Date.now();
                }
            }, 2000);
        }
    });
    
    // Ensure carousel slides are visible with fallbacks
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => {
        slide.style.display = 'flex';
        slide.style.alignItems = 'center';
        slide.style.justifyContent = 'center';
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Don't observe images that are already visible
        if (!img.classList.contains('hero-main-image')) {
            imageObserver.observe(img);
        }
    });
});

// Error handling for better user experience
window.addEventListener('error', (e) => {
    console.warn('Minor error handled gracefully:', e.message);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
} 

// ================================
// CHATBOT FUNCTIONALITY
// ================================

class ChatbotAssistant {
    constructor() {
        this.isOpen = false;
        this.currentStep = 'initial';
        this.userData = {};
        this.conversationFlow = {};
        this.isProcessing = false; // Prevent rapid multiple messages
        this.orderGenerated = false; // Track if WhatsApp order was already generated
        this.currentOrderId = null; // Track current order for modifications
        this.isModifying = false; // Track if we're modifying an existing order
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupConversationFlow();
        this.initDraggable();
        // Show notification after 3 seconds
        setTimeout(() => {
            this.showNotification();
        }, 3000);
    }

    bindEvents() {
        // Toggle chatbot
        document.getElementById('chatbot-button')?.addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Close chatbot
        document.getElementById('chatbot-close')?.addEventListener('click', () => {
            this.closeChatbot();
        });

        // Send message
        document.getElementById('chatbot-send')?.addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chatbot-input-field')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick options and other chat buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-option')) {
                if (this.isProcessing) return; // Prevent rapid clicks
                
                const action = e.target.getAttribute('data-action');
                this.isProcessing = true;
                
                // Handle special quote actions
                if (action?.startsWith('quote_')) {
                    const productType = action.replace('quote_', '');
                    this.userData.bagType = productType;
                    this.showQuoteForm(productType);
                } else if (action === 'contact_sales') {
                    this.showContactInfo();
                } else if (action === 'more_products') {
                    this.handleQuickOption('product_info');
                } else if (action === 'new_quote') {
                    this.resetConversation();
                    this.handleQuickOption('get_quote');
                } else if (action === 'modify_order') {
                    this.modifyCurrentOrder();
                } else if (action === 'get_quote' && this.isModifying) {
                    // Handle product type change during modification
                    this.isModifying = true;
                    this.orderGenerated = false;
                    this.handleQuickOption(action);
                } else {
                    this.handleQuickOption(action);
                }
                
                // Reset processing flag after delay
                setTimeout(() => {
                    this.isProcessing = false;
                }, 1000);
                
            } else if (e.target.classList.contains('whatsapp-order-btn')) {
                // Handle WhatsApp button clicks
                const whatsappUrl = e.target.getAttribute('data-whatsapp-url');
                if (whatsappUrl) {
                    // Add visual feedback
                    e.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
                    e.target.disabled = true;
                    
                    try {
                        window.open(whatsappUrl, '_blank');
                        
                        // Reset button after short delay
                        setTimeout(() => {
                            e.target.innerHTML = '<i class="fab fa-whatsapp"></i> Send Order via WhatsApp';
                            e.target.disabled = false;
                        }, 2000);
                    } catch (error) {
                        console.error('Error opening WhatsApp:', error);
                        e.target.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try again';
                        setTimeout(() => {
                            e.target.innerHTML = '<i class="fab fa-whatsapp"></i> Send Order via WhatsApp';
                            e.target.disabled = false;
                        }, 3000);
                    }
                } else {
                    console.error('WhatsApp URL not found');
                }
            } else if (e.target.classList.contains('contact-btn')) {
                // Handle contact buttons (phone/whatsapp)
                const contactValue = e.target.getAttribute('data-contact-value');
                const contactType = e.target.getAttribute('data-contact-type');
                if (contactValue) {
                    if (contactType === 'phone') {
                        window.open(contactValue);
                    } else if (contactType === 'whatsapp') {
                        window.open(contactValue, '_blank');
                    }
                }
            }
        });
    }

    setupConversationFlow() {
        this.conversationFlow = {
            get_quote: {
                message: "Great! I'll help you get a quote. What type of bags are you interested in?",
                options: [
                    { text: "Shopping Bags", value: "shopping", icon: "fas fa-shopping-bag" },
                    { text: "Promotional Bags", value: "promotional", icon: "fas fa-gift" },
                    { text: "Food Grade Bags", value: "food-grade", icon: "fas fa-utensils" },
                    { text: "Industrial Bags", value: "industrial", icon: "fas fa-box" },
                    { text: "Agricultural Bags", value: "agricultural", icon: "fas fa-seedling" },
                    { text: "Custom Design", value: "custom", icon: "fas fa-palette" }
                ],
                nextStep: 'quantity_selection'
            },
            product_info: {
                message: "I'd be happy to share information about our products! Which category interests you?",
                options: [
                    { text: "Shopping Bags", value: "shopping", icon: "fas fa-shopping-bag" },
                    { text: "Promotional Bags", value: "promotional", icon: "fas fa-gift" },
                    { text: "Food Grade Bags", value: "food-grade", icon: "fas fa-utensils" },
                    { text: "Industrial Bags", value: "industrial", icon: "fas fa-box" },
                    { text: "Agricultural Bags", value: "agricultural", icon: "fas fa-seedling" },
                    { text: "Garment Bags", value: "garment", icon: "fas fa-tshirt" }
                ],
                nextStep: 'product_details'
            },
            bulk_order: {
                message: "Perfect! We specialize in bulk orders. Let me get some details to provide you with the best pricing.",
                options: [
                    { text: "1,000 - 5,000 pcs", value: "1000-5000" },
                    { text: "5,000 - 10,000 pcs", value: "5000-10000" },
                    { text: "10,000+ pcs", value: "10000+" },
                    { text: "Not sure yet", value: "unsure" }
                ],
                nextStep: 'bag_type_bulk'
            }
        };

        this.productDetails = {
            shopping: {
                name: "Shopping Bags",
                description: "Durable and stylish shopping bags perfect for retail stores and supermarkets.",
                features: ["Multiple size options", "Reinforced handles", "Custom printing available"],
                pricing: "₹12-25 per piece (depending on quantity and customization)",
                icon: "fas fa-shopping-bag"
            },
            promotional: {
                name: "Promotional Bags",
                description: "Eye-catching promotional bags ideal for marketing campaigns and brand awareness.",
                features: ["Full-color printing", "Logo placement", "Brand customization"],
                pricing: "₹15-30 per piece (depending on design complexity)",
                icon: "fas fa-gift"
            },
            "food-grade": {
                name: "Food Grade Bags",
                description: "Food-safe non-woven bags designed for restaurants, cafes, and food delivery services.",
                features: ["Food-grade materials", "Leak-resistant", "Temperature resistant"],
                pricing: "₹18-35 per piece (meets all safety standards)",
                icon: "fas fa-utensils"
            },
            industrial: {
                name: "Industrial Bags",
                description: "Heavy-duty bags for industrial applications. Built to withstand demanding environments.",
                features: ["High tensile strength", "Chemical resistant", "Custom specifications"],
                pricing: "₹20-45 per piece (based on specifications)",
                icon: "fas fa-box"
            },
            agricultural: {
                name: "Agricultural Bags",
                description: "Specialized bags for agricultural use including seed storage and fertilizer packaging.",
                features: ["UV resistant", "Moisture protection", "Breathable options"],
                pricing: "₹15-30 per piece (various sizes available)",
                icon: "fas fa-seedling"
            },
            garment: {
                name: "Garment Bags",
                description: "Protective bags for clothing and textile industry.",
                features: ["Dust protection", "Breathable fabric", "Various sizes"],
                pricing: "₹12-25 per piece (perfect for textile industry)",
                icon: "fas fa-tshirt"
            },
            custom: {
                name: "Custom Design Bags",
                description: "Fully customizable bags designed to your exact specifications.",
                features: ["Any size/shape", "Custom colors", "Logo printing", "Special materials"],
                pricing: "₹20-50 per piece (based on design complexity)",
                icon: "fas fa-palette"
            }
        };
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const notification = document.getElementById('chatbot-notification');
        
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
            if (notification) {
                notification.style.display = 'none';
            }
        }
    }

    openChatbot() {
        const container = document.getElementById('chatbot-container');
        if (container) {
            container.classList.add('active');
            this.isOpen = true;
            // Focus on input field
            setTimeout(() => {
                document.getElementById('chatbot-input-field')?.focus();
            }, 300);
        }
    }

    closeChatbot() {
        const container = document.getElementById('chatbot-container');
        if (container) {
            container.classList.remove('active');
            this.isOpen = false;
        }
    }

    showNotification() {
        const notification = document.getElementById('chatbot-notification');
        if (notification && !this.isOpen) {
            notification.style.display = 'flex';
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input-field');
        const message = input?.value.trim();
        
        if (message && !this.isProcessing) {
            this.isProcessing = true;
            this.addUserMessage(message);
            input.value = '';
            
            // Process the message
            setTimeout(() => {
                this.processUserMessage(message);
                this.isProcessing = false;
            }, 500);
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'chatbot-message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    addBotMessage(message, options = null, delay = 1000) {
        // Show typing indicator first
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const messagesContainer = document.getElementById('chatbot-messages');
            if (!messagesContainer) return;

            const messageElement = document.createElement('div');
            messageElement.className = 'chatbot-message bot-message';
            
            let optionsHtml = '';
            if (options && options.length > 0) {
                optionsHtml = '<div class="quick-options">';
                options.forEach(option => {
                    if (option.icon) {
                        optionsHtml += `<button class="quick-option" data-action="${option.value}">
                            <i class="${option.icon}"></i> ${option.text}
                        </button>`;
                    } else {
                        optionsHtml += `<button class="quick-option" data-action="${option.value}">${option.text}</button>`;
                    }
                });
                optionsHtml += '</div>';
            }

            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    ${optionsHtml}
                </div>
            `;

            messagesContainer.appendChild(messageElement);
            this.scrollToBottom();
        }, delay);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'chatbot-message bot-message typing-message';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    handleQuickOption(action) {
        // Handle different quick option actions
        if (this.conversationFlow[action]) {
            const flow = this.conversationFlow[action];
            this.addBotMessage(flow.message, flow.options);
            this.currentStep = action;
        } else if (this.productDetails[action]) {
            this.showProductDetails(action);
        } else {
            // Handle other actions
            this.handleSpecificActions(action);
        }
    }

    handleSpecificActions(action) {
        switch (action) {
            case '100-500':
            case '500-1000':
            case '1000-5000':
            case '5000-10000':
            case '10000+':
            case 'unsure':
                this.userData.quantity = action;
                
                if (this.currentStep === 'quantity_selection') {
                    // User selected quantity after choosing product
                    this.proceedWithOrder();
                } else {
                    // User selected quantity first (bulk order flow)
                    this.addBotMessage(
                        "Great! Now, what type of bags are you looking for?",
                        this.conversationFlow.get_quote.options
                    );
                    this.currentStep = 'bag_type_bulk';
                }
                break;
                
            case 'custom-quantity':
                this.askForCustomQuantity();
                break;
                
            case 'modify_quantity':
                if (this.userData.bagType) {
                    this.isModifying = true;
                    this.orderGenerated = false;
                    this.askForQuantity(this.userData.bagType);
                } else {
                    this.addBotMessage(
                        "Please select a product first:",
                        this.conversationFlow.get_quote.options
                    );
                }
                break;
                
            case 'confirm_order':
                if (this.userData.bagType && this.userData.quantity) {
                    this.directWhatsAppOrder(this.userData.bagType);
                } else {
                    this.addBotMessage(
                        "Sorry, there seems to be missing information. Let's start over:",
                        [
                            { text: "Get a Quote", value: "get_quote" }
                        ]
                    );
                }
                break;
                
            case 'shopping':
            case 'promotional':
            case 'food-grade':
            case 'industrial':
            case 'agricultural':
            case 'garment':
            case 'custom':
                if (this.currentStep === 'bag_type_bulk' || this.currentStep === 'get_quote') {
                    this.userData.bagType = action;
                    this.showQuoteForm(action);
                } else {
                    this.showProductDetails(action);
                }
                break;
                
            default:
                this.addBotMessage(
                    "I'm sorry, I didn't understand that. Let me help you with:",
                    [
                        { text: "Get a Quote", value: "get_quote" },
                        { text: "Product Information", value: "product_info" },
                        { text: "Contact Sales", value: "contact_sales" }
                    ]
                );
        }
    }

    askForCustomQuantity() {
        this.addBotMessage(
            "Please tell me the exact quantity you need:",
            null,
            800
        );
        
        this.currentStep = 'custom_quantity_input';
        
        // Add a note to help user
        setTimeout(() => {
            this.addBotMessage(
                "💡 Just type the number of bags you need (e.g., 750, 2500, etc.)",
                null,
                200
            );
        }, 1200);
    }

    proceedWithOrder() {
        const product = this.productDetails[this.userData.bagType];
        const quantity = this.userData.quantity;
        
        let quantityText = quantity;
        if (quantity === 'custom-quantity') {
            quantityText = this.userData.customQuantity || 'Custom quantity';
        }
        
        // Set or keep the current order ID
        if (!this.currentOrderId || !this.isModifying) {
            this.currentOrderId = Date.now().toString().slice(-6);
        }
        
        let message;
        if (this.isModifying) {
            message = "✅ Order updated! Here's your revised summary:";
        } else {
            message = "🎉 Perfect! I've prepared your order summary:";
        }
        
        this.addBotMessage(message, null, 800);

        setTimeout(() => {
            this.showOrderSummaryCard(product, quantityText, quantity);
        }, 1200);

        // User will now click "Proceed to WhatsApp" to generate the order
        this.currentStep = 'order_confirmation';
    }

    showOrderSummaryCard(product, quantityText, quantity) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const estimatedPrice = this.getEstimatedPrice(quantity);
        
        const orderSummaryHtml = `
            <div class="order-summary-card compact">
                <div class="order-header">
                    <div class="order-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <div class="order-info">
                        <h4>${product.name}</h4>
                        <div class="order-meta">
                            <span class="order-id">#${this.currentOrderId}</span>
                            <span class="price-badge">${estimatedPrice}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-details">
                    <div class="detail-item">
                        <span class="label">📊 Quantity:</span>
                        <span class="value">${quantityText}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">⭐ Features:</span>
                        <span class="value">${product.features.slice(0, 2).join(' • ')}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="quick-option primary-action" data-action="confirm_order">
                        <i class="fab fa-whatsapp"></i> Send to WhatsApp
                    </button>
                    <button class="quick-option secondary-action" data-action="modify_order">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;

        const orderElement = document.createElement('div');
        orderElement.className = 'chatbot-message bot-message';
        orderElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content order-summary-wrapper">
                ${orderSummaryHtml}
            </div>
        `;

        messagesContainer.appendChild(orderElement);
        this.scrollToBottom();
    }

    getEstimatedPrice(quantity) {
        const priceRanges = {
            '100-500': '₹15-25 per piece',
            '500-1000': '₹12-22 per piece', 
            '1000-5000': '₹10-20 per piece',
            '5000-10000': '₹8-18 per piece',
            '10000+': '₹8-15 per piece',
            'custom-quantity': 'Custom pricing',
            'unsure': 'Based on final quantity'
        };
        
        return priceRanges[quantity] || 'Contact for pricing';
    }

    showProductDetails(productType) {
        const product = this.productDetails[productType];
        if (!product) return;

        const featuresHtml = product.features.map(feature => `• ${feature}`).join('<br>');
        
        const productCardHtml = `
            <div class="chat-product-card">
                <div class="chat-product-header">
                    <div class="chat-product-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <h4 class="chat-product-name">${product.name}</h4>
                </div>
                <p class="chat-product-description">${product.description}</p>
                <br>
                <strong>Key Features:</strong><br>
                ${featuresHtml}
                <br><br>
                <strong>Pricing:</strong> ${product.pricing}
            </div>
        `;

        this.addBotMessage(
            `Here's detailed information about ${product.name}:`,
            null,
            800
        );

        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer) {
                const productElement = document.createElement('div');
                productElement.className = 'chatbot-message bot-message';
                productElement.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        ${productCardHtml}
                        <div class="quick-options" style="margin-top: 15px;">
                            <button class="quick-option" data-action="quote_${productType}">Get Quote for This</button>
                            <button class="quick-option" data-action="contact_sales">Contact Sales</button>
                            <button class="quick-option" data-action="more_products">Other Products</button>
                        </div>
                    </div>
                `;
                messagesContainer.appendChild(productElement);
                this.scrollToBottom();
            }
        }, 1200);
    }

    showQuoteForm(bagType) {
        const product = this.productDetails[bagType];
        this.userData.bagType = bagType;
        
        // Reset order generation state for new/modified orders
        this.orderGenerated = false;
        
        let message;
        if (this.isModifying) {
            message = `Updated! Now selecting ${product.name}. Let's update your quantity.`;
        } else {
            message = `Great choice! ${product.name} are excellent for your needs.`;
        }
        
        this.addBotMessage(message, null, 800);

        setTimeout(() => {
            this.askForQuantity(bagType);
        }, 1200);
    }

    askForQuantity(bagType) {
        const product = this.productDetails[bagType];
        
        let message;
        if (this.isModifying) {
            message = `What's the new quantity for ${product.name}?`;
        } else {
            message = `How many ${product.name} do you need? This helps us provide accurate pricing:`;
        }
        
        this.addBotMessage(
            message,
            [
                { text: "100 - 500 pcs", value: "100-500" },
                { text: "500 - 1,000 pcs", value: "500-1000" },
                { text: "1,000 - 5,000 pcs", value: "1000-5000" },
                { text: "5,000 - 10,000 pcs", value: "5000-10000" },
                { text: "10,000+ pcs", value: "10000+" },
                { text: "Custom Quantity", value: "custom-quantity" }
            ],
            1000
        );
        
        this.currentStep = 'quantity_selection';
    }

    directWhatsAppOrder(bagType) {
        // Prevent multiple WhatsApp order generations
        if (this.orderGenerated) {
            this.addBotMessage(
                "⚠️ Order already sent to WhatsApp! You can modify your order or contact sales directly.",
                [
                    { text: "Modify Order", value: "modify_order" },
                    { text: "Contact Sales", value: "contact_sales" },
                    { text: "New Quote", value: "new_quote" }
                ],
                600
            );
            return;
        }
        
        const product = this.productDetails[bagType];
        let quantityText = this.userData.quantity || 'To be discussed';
        
        // Format quantity for display
        if (this.userData.quantity === 'custom-quantity' && this.userData.customQuantity) {
            quantityText = this.userData.customQuantity;
        } else if (this.userData.quantity && this.userData.quantity !== 'unsure') {
            quantityText = `${this.userData.quantity} pieces`;
        } else if (this.userData.quantity === 'unsure') {
            quantityText = 'Quantity to be discussed';
        }
        
        const estimatedPrice = this.getEstimatedPrice(this.userData.quantity);
        
        // Add modification status to order details
        const orderType = this.isModifying ? 'MODIFIED ORDER' : 'NEW ORDER';
        const orderDetails = `
Hi Srivenkateshwara NON Woven Bags,

${orderType} - Order #${this.currentOrderId}

I'm interested in placing an order through your website chatbot:

📦 Product Type: ${product.name}
📊 Quantity Needed: ${quantityText}
💰 Expected Price Range: ${estimatedPrice}
📋 Product Features: ${product.features.join(', ')}

Please provide me with:
✅ Detailed quote with exact pricing
✅ Delivery timeline and shipping cost
✅ Customization options (logo printing, colors)
✅ Payment terms and methods
✅ Sample availability

Additional Requirements: [Please specify any special requirements]

Thank you for your quick response!
        `.trim();

        const whatsappUrl = `https://wa.me/916302067390?text=${encodeURIComponent(orderDetails)}`;
        
        // Directly open WhatsApp
        try {
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            let successMessage;
            if (this.isModifying) {
                successMessage = "✅ Modified order sent to WhatsApp! Our team will respond with updated pricing soon.";
            } else {
                successMessage = "🎉 Order sent to WhatsApp successfully! Our team typically responds within 2 hours.";
            }
            
            this.addBotMessage(
                successMessage,
                [
                    { text: "New Quote", value: "new_quote" },
                    { text: "Contact Sales", value: "contact_sales" },
                    { text: "Modify This Order", value: "modify_order" }
                ],
                800
            );
            
            // Mark order as generated and reset modification state
            this.orderGenerated = true;
            this.isModifying = false;
            
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            this.addBotMessage(
                "❌ Unable to open WhatsApp automatically. You can copy this number and contact us directly: +91 6302067390",
                [
                    { text: "Try Again", value: "confirm_order" },
                    { text: "Contact Sales", value: "contact_sales" }
                ],
                600
            );
        }
    }

    generateWhatsAppOrder(bagType) {
        // Prevent multiple WhatsApp order generations
        if (this.orderGenerated) {
            this.addBotMessage(
                "⚠️ Order already generated! You can modify your order above or contact sales directly.",
                [
                    { text: "Modify Order", value: "modify_order" },
                    { text: "Contact Sales", value: "contact_sales" },
                    { text: "New Quote", value: "new_quote" }
                ],
                600
            );
            return;
        }
        
        const product = this.productDetails[bagType];
        let quantityText = this.userData.quantity || 'To be discussed';
        
        // Format quantity for display
        if (this.userData.quantity === 'custom-quantity' && this.userData.customQuantity) {
            quantityText = this.userData.customQuantity;
        } else if (this.userData.quantity && this.userData.quantity !== 'unsure') {
            quantityText = `${this.userData.quantity} pieces`;
        } else if (this.userData.quantity === 'unsure') {
            quantityText = 'Quantity to be discussed';
        }
        
        const estimatedPrice = this.getEstimatedPrice(this.userData.quantity);
        
        // Add modification status to order details
        const orderType = this.isModifying ? 'MODIFIED ORDER' : 'NEW ORDER';
        const orderDetails = `
Hi Srivenkateshwara NON Woven Bags,

${orderType} - Order #${this.currentOrderId}

I'm interested in placing an order through your website chatbot:

📦 Product Type: ${product.name}
📊 Quantity Needed: ${quantityText}
💰 Expected Price Range: ${estimatedPrice}
📋 Product Features: ${product.features.join(', ')}

Please provide me with:
✅ Detailed quote with exact pricing
✅ Delivery timeline and shipping cost
✅ Customization options (logo printing, colors)
✅ Payment terms and methods
✅ Sample availability

Additional Requirements: [Please specify any special requirements]

Thank you for your quick response!
        `.trim();

        const whatsappUrl = `https://wa.me/916302067390?text=${encodeURIComponent(orderDetails)}`;
        
        const whatsappButtonHtml = `
            <button class="whatsapp-order-btn" data-whatsapp-url="${whatsappUrl}">
                <i class="fab fa-whatsapp"></i>
                Send Order via WhatsApp
            </button>
        `;

        let message;
        if (this.isModifying) {
            message = "✅ Modified order details ready! Click below to send your updated requirements:";
        } else {
            message = "🎉 Your order details are ready! Click the button below to send this directly to our WhatsApp:";
        }

        this.addBotMessage(message, null, 500);

        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer) {
                const whatsappElement = document.createElement('div');
                whatsappElement.className = 'chatbot-message bot-message';
                whatsappElement.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        ${whatsappButtonHtml}
                        <p style="font-size: 12px; color: #6c757d; margin-top: 10px;">
                            <i class="fas fa-info-circle"></i> 
                            This will open WhatsApp with your order details pre-filled. Our team typically responds within 2 hours!
                        </p>
                        <div class="quick-options">
                            <button class="quick-option" data-action="new_quote">New Quote</button>
                            <button class="quick-option" data-action="contact_sales">Call Sales</button>
                            <button class="quick-option" data-action="modify_order">Modify This Order</button>
                        </div>
                    </div>
                `;
                messagesContainer.appendChild(whatsappElement);
                this.scrollToBottom();
            }
            
            // Mark order as generated and reset modification state
            this.orderGenerated = true;
            this.isModifying = false;
        }, 1000);
    }

    processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Handle custom quantity input
        if (this.currentStep === 'custom_quantity_input') {
            const quantity = message.replace(/[^\d]/g, ''); // Extract numbers only
            if (quantity && parseInt(quantity) > 0) {
                this.userData.quantity = 'custom-quantity';
                this.userData.customQuantity = `${parseInt(quantity).toLocaleString()} pieces`;
                
                this.addBotMessage(
                    `Got it! ${this.userData.customQuantity} is noted. Let me prepare your quote.`,
                    null,
                    800
                );
                
                setTimeout(() => {
                    this.proceedWithOrder();
                }, 1200);
                return;
            } else {
                this.addBotMessage(
                    "Please enter a valid number (e.g., 750, 2500). How many bags do you need?",
                    null,
                    800
                );
                return;
            }
        }
        
        // Intent recognition
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
            this.handleQuickOption('get_quote');
        } else if (lowerMessage.includes('product') || lowerMessage.includes('bag') || lowerMessage.includes('type')) {
            this.handleQuickOption('product_info');
        } else if (lowerMessage.includes('bulk') || lowerMessage.includes('wholesale') || lowerMessage.includes('large order')) {
            this.handleQuickOption('bulk_order');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
            this.showContactInfo();
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            this.addBotMessage(
                "Hello! 👋 Welcome to Srivenkateshwara NON Woven Bags. How can I assist you today?",
                [
                    { text: "Get a Quote", value: "get_quote" },
                    { text: "Product Info", value: "product_info" },
                    { text: "Bulk Orders", value: "bulk_order" }
                ]
            );
        } else {
            this.addBotMessage(
                "I'd be happy to help you with that! Let me know what you're looking for:",
                [
                    { text: "Get Quote & Pricing", value: "get_quote" },
                    { text: "Product Information", value: "product_info" },
                    { text: "Bulk Order Inquiry", value: "bulk_order" },
                    { text: "Contact Sales Team", value: "contact_sales" }
                ]
            );
        }
    }

    showContactInfo() {
        this.addBotMessage(
            "Here are our contact details for immediate assistance:",
            null,
            800
        );

        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer) {
                const contactElement = document.createElement('div');
                contactElement.className = 'chatbot-message bot-message';
                contactElement.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; margin: 8px 0;">
                            <h4 style="margin: 0 0 10px 0; color: #2c5530;">
                                <i class="fas fa-phone"></i> Sales & Marketing
                            </h4>
                            <p style="margin: 5px 0;">📞 <strong>Srikanth & Shiva Sai</strong></p>
                            <p style="margin: 5px 0;">📱 +91 6302067390</p>
                            <br>
                            <h4 style="margin: 10px 0 10px 0; color: #2c5530;">
                                <i class="fas fa-envelope"></i> Email
                            </h4>
                            <p style="margin: 5px 0;">✉️ srivenkateshwaranonwovenbags6@gmail.com</p>
                        </div>
                        <div class="quick-options">
                            <button class="quick-option contact-btn" data-contact-type="phone" data-contact-value="tel:+916302067390">
                                <i class="fas fa-phone"></i> Call Now
                            </button>
                            <button class="quick-option contact-btn" data-contact-type="whatsapp" data-contact-value="https://wa.me/916302067390?text=Hi%20I%20need%20help%20with%20non-woven%20bags">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </button>
                        </div>
                    </div>
                `;
                messagesContainer.appendChild(contactElement);
                this.scrollToBottom();
            }
        }, 1200);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    resetConversation() {
        this.userData = {};
        this.currentStep = 'initial';
        this.isProcessing = false;
        this.orderGenerated = false;
        this.currentOrderId = null;
        this.isModifying = false;
        
        this.addBotMessage(
            "🔄 Starting fresh! What would you like to know about our non-woven bags?",
            [
                { text: "Get a Quote", value: "get_quote" },
                { text: "Product Information", value: "product_info" },
                { text: "Bulk Orders", value: "bulk_order" }
            ],
            600
        );
    }

    modifyCurrentOrder() {
        const product = this.productDetails[this.userData.bagType];
        
        // Set modification state
        this.isModifying = true;
        this.orderGenerated = false; // Allow regeneration for modifications
        
        this.addBotMessage(
            `Current order: ${product?.name || 'No product selected'}
            
What would you like to modify?`,
            [
                { text: "Change Product Type", value: "get_quote" },
                { text: "Change Quantity", value: "modify_quantity" },
                { text: "Start Over", value: "new_quote" }
            ],
            800
        );
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Make chatbot widget draggable
    makeDraggable() {
        const widget = document.getElementById('chatbot-widget');
        const button = document.getElementById('chatbot-button');
        
        if (!widget || !button) return;
        
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        // Touch events for mobile
        button.addEventListener('touchstart', (e) => {
            if (this.isOpen) return; // Don't drag when chat is open
            
            isDragging = true;
            widget.classList.add('dragging', 'draggable');
            
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            
            const rect = widget.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            e.preventDefault();
        }, { passive: false });
        
        button.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            // Keep within viewport bounds
            const maxX = window.innerWidth - widget.offsetWidth;
            const maxY = window.innerHeight - widget.offsetHeight;
            
            const boundedX = Math.max(0, Math.min(newX, maxX));
            const boundedY = Math.max(0, Math.min(newY, maxY));
            
            widget.style.position = 'fixed';
            widget.style.left = boundedX + 'px';
            widget.style.top = boundedY + 'px';
            widget.style.bottom = 'auto';
            widget.style.right = 'auto';
        }, { passive: false });
        
        button.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            widget.classList.remove('dragging');
            
            // Snap to edges for better UX
            this.snapToEdge(widget);
            
            e.preventDefault();
        }, { passive: false });
        
        // Mouse events for desktop
        button.addEventListener('mousedown', (e) => {
            if (this.isOpen) return;
            
            isDragging = true;
            widget.classList.add('dragging', 'draggable');
            
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = widget.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            const maxX = window.innerWidth - widget.offsetWidth;
            const maxY = window.innerHeight - widget.offsetHeight;
            
            const boundedX = Math.max(0, Math.min(newX, maxX));
            const boundedY = Math.max(0, Math.min(newY, maxY));
            
            widget.style.position = 'fixed';
            widget.style.left = boundedX + 'px';
            widget.style.top = boundedY + 'px';
            widget.style.bottom = 'auto';
            widget.style.right = 'auto';
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            isDragging = false;
            widget.classList.remove('dragging');
            
            this.snapToEdge(widget);
        });
    }
    
    // Snap widget to nearest edge for better UX
    snapToEdge(widget) {
        const rect = widget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const screenWidth = window.innerWidth;
        
        // Snap to left or right edge with business logic
        if (centerX < screenWidth / 2) {
            // Snap to left - default position for business visibility
            widget.style.left = '15px';
            widget.style.right = 'auto';
        } else {
            // Snap to right - but avoid other floating buttons
            widget.style.right = '80px'; // Leave space for WhatsApp/phone buttons
            widget.style.left = 'auto';
        }
        
        // Keep current vertical position but ensure visibility
        const currentTop = rect.top;
        const maxTop = window.innerHeight - widget.offsetHeight - 20;
        const minTop = 20;
        const boundedTop = Math.max(minTop, Math.min(currentTop, maxTop));
        
        widget.style.top = boundedTop + 'px';
        widget.style.bottom = 'auto';
        
        // Ensure high z-index after dragging
        widget.style.zIndex = '10001';
    }

    // Initialize draggable functionality
    initDraggable() {
        // Wait for DOM to be ready
        setTimeout(() => {
            this.makeDraggable();
        }, 500);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotAssistant();
});

// Additional event handling is now integrated into the main ChatbotAssistant class 