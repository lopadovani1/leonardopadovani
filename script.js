// Performance and utility functions
class PerformanceUtils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Error handling utility
class ErrorHandler {
    static logError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        // In production, you might want to send this to an error tracking service
    }

    static handleAsyncError(promise) {
        return promise.catch(error => {
            this.logError(error);
            return null;
        });
    }
}

// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.languageButtons = document.querySelectorAll('.lang-link');
        this.init();
    }

    init() {
        try {
            // Set initial language based on browser language
            this.setInitialLanguage();
            
            // Add event listeners for language buttons
            this.languageButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const lang = e.target.dataset.lang;
                    this.switchLanguage(lang);
                    this.updateActiveButton(lang);
                });
            });
        } catch (error) {
            ErrorHandler.logError(error, 'LanguageManager.init');
        }
    }

    setInitialLanguage() {
        try {
            const browserLang = navigator.language || navigator.userLanguage;
            const supportedLangs = ['en', 'pt', 'es'];
            
            // Check if browser language is supported
            const langCode = browserLang.split('-')[0];
            if (supportedLangs.includes(langCode)) {
                this.currentLang = langCode;
                this.updateActiveButton(langCode);
            }
            
            this.switchLanguage(this.currentLang);
        } catch (error) {
            ErrorHandler.logError(error, 'LanguageManager.setInitialLanguage');
        }
    }

    switchLanguage(lang) {
        try {
            this.currentLang = lang;
            
            // Hide all language content
            document.querySelectorAll('.lang-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show content for selected language
            document.querySelectorAll(`[data-lang="${lang}"]`).forEach(content => {
                content.style.display = 'block';
            });
            
            // Update form placeholders
            this.updateFormPlaceholders(lang);
        } catch (error) {
            ErrorHandler.logError(error, 'LanguageManager.switchLanguage');
        }
    }

    updateActiveButton(lang) {
        // Remove active class from all buttons
        this.languageButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        const activeButton = document.querySelector(`[data-lang="${lang}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    updateFormPlaceholders(lang) {
        try {
            const placeholders = {
                en: {
                    name: 'Name',
                    email: 'Email',
                    message: 'Message'
                },
                pt: {
                    name: 'Nome',
                    email: 'Email',
                    message: 'Mensagem'
                },
                es: {
                    name: 'Nombre',
                    email: 'Email',
                    message: 'Mensaje'
                }
            };

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (nameInput) nameInput.placeholder = placeholders[lang].name;
            if (emailInput) emailInput.placeholder = placeholders[lang].email;
            if (messageInput) messageInput.placeholder = placeholders[lang].message;
        } catch (error) {
            ErrorHandler.logError(error, 'LanguageManager.updateFormPlaceholders');
        }
    }
}

// Hero Banner Management
class HeroBannerManager {
    constructor() {
        this.heroVideo = document.querySelector('.hero-video');
        this.heroBackground = document.querySelector('.hero-background');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        // Handle video fallback
        if (this.heroVideo) {
            this.heroVideo.addEventListener('error', () => {
                this.handleVideoError();
            });
            
            // Check if video can play
            this.heroVideo.addEventListener('canplay', () => {
                this.heroVideo.style.display = 'block';
            });
            
            // Hide video if it can't load
            this.heroVideo.addEventListener('loadstart', () => {
                setTimeout(() => {
                    if (this.heroVideo.readyState === 0) {
                        this.handleVideoError();
                    }
                }, 3000);
            });
        }

        // Scroll indicator click
        if (this.scrollIndicator) {
            this.scrollIndicator.addEventListener('click', () => {
                this.scrollToContent();
            });
        }
    }

    handleVideoError() {
        if (this.heroVideo) {
            this.heroVideo.style.display = 'none';
        }
        // Background image will show as fallback
    }

    scrollToContent() {
        const firstSection = document.querySelector('#home-studio');
        if (firstSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = firstSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Accordion Management
class AccordionManager {
    constructor() {
        this.accordionItems = document.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                this.toggleAccordion(item);
            });
        });
    }

    toggleAccordion(item) {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        this.accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Lightbox Management
class LightboxManager {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.closeBtn = document.querySelector('.close-lightbox');
        this.init();
    }

    init() {
        // Add click event to all gallery images
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });
        });

        // Close lightbox events
        this.closeBtn.addEventListener('click', () => {
            this.closeLightbox();
        });

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.style.display === 'block') {
                this.closeLightbox();
            }
        });
    }

    openLightbox(src, alt) {
        this.lightboxImg.src = src;
        this.lightboxImg.alt = alt;
        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Management
class FormManager {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message || !data.interest) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Thank you! Your message has been sent successfully.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '500';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d1fae5';
            messageDiv.style.color = '#065f46';
            messageDiv.style.border = '1px solid #a7f3d0';
        } else {
            messageDiv.style.backgroundColor = '#fee2e2';
            messageDiv.style.color = '#991b1b';
            messageDiv.style.border = '1px solid #fecaca';
        }

        this.form.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Header scroll effect
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
    }
}

// Home Studio Video Modal (Lightbox)
(function() {
    const videoLightbox = document.getElementById('video-lightbox');
    const videoIframe = document.getElementById('video-iframe');
    const closeVideoBtn = document.querySelector('.close-video-lightbox');
    const studioThumbButtons = document.querySelectorAll('.studio-thumb-card');
    let lastActiveThumb = null;
    function openVideoLightbox(videoUrl, triggerEl) {
        lastActiveThumb = triggerEl;
        videoIframe.src = videoUrl + '?autoplay=1';
        videoLightbox.classList.add('active');
        videoLightbox.focus();
        document.body.style.overflow = 'hidden';
    }
    function closeVideoLightbox() {
        videoLightbox.classList.remove('active');
        videoIframe.src = '';
        document.body.style.overflow = 'auto';
        if (lastActiveThumb) lastActiveThumb.focus();
    }
    // Trap focus in modal
    function trapFocus(modal) {
        const focusableEls = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        });
    }
    studioThumbButtons.forEach(card => {
        card.addEventListener('click', (e) => {
            openVideoLightbox(card.getAttribute('data-video'), card);
            trapFocus(videoLightbox);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoLightbox(card.getAttribute('data-video'), card);
                trapFocus(videoLightbox);
            }
        });
    });
    closeVideoBtn.addEventListener('click', closeVideoLightbox);
    videoLightbox.addEventListener('click', function(e) {
        if (e.target === videoLightbox) closeVideoLightbox();
    });
    videoLightbox.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeVideoLightbox();
    });
})();

// Home Studio Image Gallery (modular, non-disruptive)
(function() {
    const gallery = document.querySelector('.studio-image-gallery');
    if (!gallery) return;
    const images = gallery.querySelectorAll('.gallery-image');
    const leftArrow = gallery.querySelector('.gallery-arrow-left');
    const rightArrow = gallery.querySelector('.gallery-arrow-right');
    const dots = gallery.querySelectorAll('.gallery-dot');
    if (images.length <= 1) return; // Only one image, no controls needed
    // Show controls
    leftArrow.style.display = '';
    rightArrow.style.display = '';
    gallery.querySelector('.gallery-dots').style.display = '';
    let current = 0;
    function showImage(idx) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }
    leftArrow.addEventListener('click', () => {
        showImage((current - 1 + images.length) % images.length);
    });
    rightArrow.addEventListener('click', () => {
        showImage((current + 1) % images.length);
    });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showImage(i));
    });
    showImage(0);
})();

// Home Studio & Live Violin Image Switcher (modular, non-disruptive)
(function() {
  const allStudioRights = document.querySelectorAll('.studio-right');
  allStudioRights.forEach(studioRight => {
    const images = studioRight.querySelectorAll('.studio-static-img');
    const prevBtn = studioRight.querySelector('.studio-img-prev');
    const nextBtn = studioRight.querySelector('.studio-img-next');
    const dots = studioRight.querySelectorAll('.studio-img-dot');
    if (images.length <= 1) return;
    let current = 0;
    function showImage(idx) {
      images.forEach((img, i) => {
        img.classList.toggle('studio-img-active', i === idx);
        img.style.display = i === idx ? '' : 'none';
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('studio-dot-active', i === idx);
      });
      current = idx;
    }
    if (prevBtn) prevBtn.addEventListener('click', () => {
      showImage((current - 1 + images.length) % images.length);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      showImage((current + 1) % images.length);
    });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showImage(i));
    });
    showImage(0);
  });
})();

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new HeroBannerManager();
    new AccordionManager();
    new LightboxManager();
    new SmoothScrollManager();
    new FormManager();
    new HeaderManager();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 