// DOM Content Loaded with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

// Initialize app with performance optimization
function initializeApp() {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        initHamburgerMenu();
        initProductGallery();
        initProductOptions();
        initSmoothScrolling();
    });

    // Delay non-critical animations
    setTimeout(() => {
        initScrollAnimations();
        initCountUpAnimation();
    }, 100);
}

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking nav links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Product Gallery Functionality
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    const images = [
        'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0eaa29ff26a?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1585652757145-5dbca7c3e5c9?w=400&h=500&fit=crop'
    ];

    // Thumbnail click functionality
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateImage(index);
        });
    });

    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateImage(index);
        });
    });

    // Previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = currentImageIndex === 0 ? perfumeTypes.length - 1 : currentImageIndex - 1;
            updateImage(currentImageIndex);
        });
    }

    // Next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = currentImageIndex === perfumeTypes.length - 1 ? 0 : currentImageIndex + 1;
            updateImage(currentImageIndex);
        });
    }

    // Update image function
    function updateImage(index) {
        currentImageIndex = index;
        const perfumeType = perfumeTypes[index];

        if (mainImage) {
            // Remove all perfume classes
            mainImage.className = mainImage.className.replace(/perfume-\w+/g, '');
            // Add new perfume class
            mainImage.classList.add(`perfume-${perfumeType}`);
            mainImage.setAttribute('data-perfume', perfumeType);
        }

        // Update active states
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (event.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Auto-play slideshow (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Pause autoplay on hover
    const gallery = document.querySelector('.product-gallery');
    if (gallery) {
        gallery.addEventListener('mouseenter', stopAutoPlay);
        gallery.addEventListener('mouseleave', startAutoPlay);
        // startAutoPlay(); // Uncomment to enable autoplay
    }
}

// Product Options Functionality
function initProductOptions() {
    const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
    const subscriptionRadios = document.querySelectorAll('input[name="subscription-type"]');
    const addToCartBtn = document.getElementById('addToCart');

    // Update Add to Cart button text
    function updateAddToCartButton() {
        const selectedFragrance = document.querySelector('input[name="fragrance"]:checked')?.value || 'classic';
        const selectedSubscription = document.querySelector('input[name="subscription-type"]:checked')?.value || 'single';

        const fragranceNames = {
            'classic': 'Classic',
            'purple': 'Purple',
            'orange': 'Orange'
        };

        const subscriptionNames = {
            'single': 'Single Subscription',
            'double': 'Double Subscription'
        };

        if (addToCartBtn) {
            const cartText = addToCartBtn.querySelector('.cart-icon').nextSibling;
            cartText.textContent = ` Add to Cart - ${fragranceNames[selectedFragrance]}, ${subscriptionNames[selectedSubscription]} `;

            // Update href with dynamic link (6 different combinations)
            const cartLinks = {
                'classic-single': '#cart/classic/single-subscription',
                'classic-double': '#cart/classic/double-subscription',
                'purple-single': '#cart/purple/single-subscription',
                'purple-double': '#cart/purple/double-subscription',
                'orange-single': '#cart/orange/single-subscription',
                'orange-double': '#cart/orange/double-subscription'
            };

            const linkKey = `${selectedFragrance}-${selectedSubscription}`;
            addToCartBtn.href = cartLinks[linkKey] || '#cart';
        }
    }

    // Update subscription content visibility
    function updateSubscriptionDisplay() {
        // The CSS handles the show/hide logic for subscription content
        // This function can be used for additional subscription-related updates
        console.log('Subscription updated');
    }

    // Update product image based on fragrance selection
    function updateProductImage() {
        const selectedFragrance = document.querySelector('input[name="fragrance"]:checked')?.value;
        const imageMap = {
            'classic': 0,
            'purple': 1,
            'orange': 2
        };
        
        const imageIndex = imageMap[selectedFragrance] || 0;
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails[imageIndex]) {
            thumbnails[imageIndex].click();
        }
    }

    // Event listeners
    fragranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateAddToCartButton();
            updateProductImage();
        });
    });

    purchaseTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateAddToCartButton();
            updateSubscriptionDetails();
        });
    });

    // Initialize
    updateAddToCartButton();
    updateSubscriptionDetails();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with fade-in animation
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Count Up Animation for Statistics
function initCountUpAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input[type="email"]');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const email = input.value.trim();
            
            if (validateEmail(email)) {
                // Simulate newsletter signup
                button.textContent = 'Subscribed!';
                button.style.background = '#2E8B57';
                input.value = '';
                
                setTimeout(() => {
                    button.textContent = 'Subscribe';
                    button.style.background = '';
                }, 3000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterSignup();
    initLazyLoading();
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Add loading states for better UX
function showLoadingState(element) {
    if (element) {
        element.style.opacity = '0.7';
        element.style.pointerEvents = 'none';
    }
}

function hideLoadingState(element) {
    if (element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Prefetch important resources
function prefetchResources() {
    const images = [
        'assets/images/perfume-classic.png',
        'assets/images/perfume-purple.png',
        'assets/images/perfume-orange.png',
        'assets/images/perfume-blue.png'
    ];

    images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call performance monitoring after load
window.addEventListener('load', () => {
    logPerformance();
    prefetchResources();
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initHamburgerMenu,
        initProductGallery,
        initProductOptions,
        validateEmail
    };
}
