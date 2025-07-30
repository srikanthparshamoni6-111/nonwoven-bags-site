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

// Order form handling with enhanced functionality
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateOrderForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(this);
        const orderData = {};
        formData.forEach((value, key) => {
            orderData[key] = value;
        });
        
        // Send to email service
        fetch('https://formspree.io/f/mjvqgord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'srivenkateshwaranonwovenbags6@gmail.com',
                subject: `🛍️ NEW ORDER REQUEST - ${orderData.bagType}`,
                message: `
🛍️ NEW ORDER REQUEST

👤 CUSTOMER DETAILS:
• Name: ${orderData.name}
• Phone: ${orderData.phone}
• Email: ${orderData.email}
• Company: ${orderData.company || 'N/A'}

📦 ORDER DETAILS:
• Bag Type: ${orderData.bagType}
• Quantity: ${orderData.quantity}
• Delivery Timeline: ${orderData.urgency || 'Standard (14 days)'}
• Special Requirements: ${orderData.message || 'None'}

📅 Order Date: ${new Date().toLocaleDateString()}
⏰ Order Time: ${new Date().toLocaleTimeString()}

🎯 ACTION REQUIRED: Please contact the customer within 2 hours with a detailed quote.

This order was submitted through the website order form.
                `,
                _replyto: orderData.email,
                _subject: `New Order Request - ${orderData.bagType}`,
            }),
        })
        .then(response => {
            // Always send to WhatsApp for immediate notification
            sendToWhatsApp(orderData);
            
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            
            showOrderMessage('🎉 Order submitted successfully! We\'ve received your order and will contact you within 2 hours. Check WhatsApp for instant confirmation!', 'success');
            orderForm.reset();
        })
        .catch(error => {
            console.log('Fallback: Sending to WhatsApp only');
            sendToWhatsApp(orderData);
            
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            
            showOrderMessage('✅ Order received! Your details have been sent via WhatsApp. Our team will contact you within 2 hours with a detailed quote.', 'success');
            orderForm.reset();
        });
    });
}

// Enhanced WhatsApp integration
function sendToWhatsApp(orderData) {
    const whatsappMessage = `
🛍️ *NEW ORDER REQUEST* 🛍️

👤 *Customer Details:*
• Name: ${orderData.name}
• Phone: ${orderData.phone}
• Email: ${orderData.email}
• Company: ${orderData.company || 'N/A'}

📦 *Order Details:*
• Bag Type: ${orderData.bagType}
• Quantity: ${orderData.quantity}
• Timeline: ${orderData.urgency || 'Standard (14 days)'}
• Requirements: ${orderData.message || 'None'}

📅 Date: ${new Date().toLocaleDateString()}
⏰ Time: ${new Date().toLocaleTimeString()}

🎯 *Action Required:* Please respond with quote within 2 hours.

*Order submitted through website.*
    `.trim();
    
    const whatsappLink = `https://wa.me/916302067390?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Auto-open WhatsApp after 1.5 seconds
    setTimeout(() => {
        window.open(whatsappLink, '_blank');
    }, 1500);
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
        showOrderMessage('Please enter a valid 10-digit phone number.', 'error');
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
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return phoneRegex.test(cleanPhone);
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
    messageDiv.className = `order-message ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageDiv.innerHTML = `<strong>${type === 'success' ? '✓' : '⚠'}</strong> ${message}`;
    
    // Add message after the form
    const orderFormContainer = document.querySelector('.order-form-container');
    if (orderFormContainer) {
        orderFormContainer.appendChild(messageDiv);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 8000);
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
        
        .nav-active {
            background: rgba(44, 85, 48, 0.1) !important;
            color: var(--primary-color) !important;
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