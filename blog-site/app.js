/**
 * BlogWave - Modern Blog Site
 * Main JavaScript File
 * 
 * This file includes all the functionality for the blog site:
 * - Navigation menu handling
 * - Theme toggling (dark/light mode)
 * - Lazy loading of images
 * - Post loading via AJAX
 * - Newsletter and contact form handling
 * - Scroll animations
 * - Back to top button functionality
 * - Search functionality
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const backToTopBtn = document.getElementById('back-to-top');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const loadMoreBtn = document.getElementById('load-more');
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    
    // Initialize components
    initNavigation();
    initThemeToggle();
    initLazyLoading();
    initBackToTop();
    loadRecentPosts();
    initSearch();
    initForms();
    
    /**
     * Mobile Navigation Menu Functionality
     */
    function initNavigation() {
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                menuToggle.classList.toggle('menu-open');
                navList.classList.toggle('show');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = navList.contains(event.target) || menuToggle.contains(event.target);
                
                if (!isClickInside && navList.classList.contains('show')) {
                    navList.classList.remove('show');
                    menuToggle.classList.remove('menu-open');
                }
            });
            
            // Close menu when clicking on a nav link
            const navLinks = document.querySelectorAll('.nav-list a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navList.classList.remove('show');
                    menuToggle.classList.remove('menu-open');
                });
            });
        }
    }
    
    /**
     * Theme Toggle (Dark/Light Mode)
     */
    function initThemeToggle() {
        if (themeToggle) {
            // Check for saved theme preference or respect OS preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.body.classList.add('dark-theme');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
            
            // Toggle theme on click
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            });
        }
    }
    
    /**
     * Lazy Loading Images
     * Only load images when they come into viewport
     */
    function initLazyLoading() {
        // Select all images with data-src attribute
        const lazyImages = document.querySelectorAll('[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.tagName === 'IMG') {
                            img.src = img.dataset.src;
                        } else {
                            img.style.backgroundImage = `url('${img.dataset.src}')`;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
                image.classList.add('lazy-load');
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            lazyImages.forEach(function(img) {
                if (img.tagName === 'IMG') {
                    img.src = img.dataset.src;
                } else {
                    img.style.backgroundImage = `url('${img.dataset.src}')`;
                }
            });
        }
    }
    
    /**
     * Back to Top Button
     * Show/hide the button based on scroll position
     */
    function initBackToTop() {
        if (backToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', throttle(function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }, 200));
            
            // Scroll to top when button is clicked
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    /**
     * Load Recent Posts
     * Simulates loading posts from a server with sample data
     */
    function loadRecentPosts() {
        const recentPostsContainer = document.querySelector('#recent-posts .post-grid');
        if (!recentPostsContainer) return;
        
        // Sample post data (would normally come from an API)
        const samplePosts = [
            {
                title: 'Essential Web Development Tools for 2025',
                category: 'Development',
                image: 'https://picsum.photos/800/500?random=4',
                author: 'Michael Johnson',
                date: 'August 10, 2025',
                excerpt: 'Discover the must-have development tools that will streamline your workflow...'
            },
            {
                title: 'How to Master CSS Grid Layout',
                category: 'CSS',
                image: 'https://picsum.photos/800/500?random=5',
                author: 'Sarah Williams',
                date: 'August 8, 2025',
                excerpt: 'A comprehensive guide to mastering CSS Grid Layout for modern websites...'
            },
            {
                title: 'JavaScript Performance Optimization Techniques',
                category: 'JavaScript',
                image: 'https://picsum.photos/800/500?random=6',
                author: 'Robert Chen',
                date: 'August 5, 2025',
                excerpt: 'Learn how to write efficient JavaScript code that performs well on all devices...'
            }
        ];
        
        // Create post elements and add to container
        samplePosts.forEach(post => {
            const postElement = createPostElement(post);
            recentPostsContainer.appendChild(postElement);
        });
        
        // Set up load more functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Simulate loading additional posts
                const additionalPosts = [
                    {
                        title: 'Building Accessible Web Applications',
                        category: 'Accessibility',
                        image: 'https://picsum.photos/800/500?random=7',
                        author: 'Emma Thompson',
                        date: 'August 3, 2025',
                        excerpt: 'Best practices for creating web applications that are accessible to everyone...'
                    },
                    {
                        title: 'Introduction to WebAssembly',
                        category: 'Programming',
                        image: 'https://picsum.photos/800/500?random=8',
                        author: 'David Wilson',
                        date: 'July 30, 2025',
                        excerpt: 'Understanding the fundamentals of WebAssembly and its applications in web development...'
                    },
                    {
                        title: 'Responsive Design in 2025',
                        category: 'Design',
                        image: 'https://picsum.photos/800/500?random=9',
                        author: 'Lisa Garcia',
                        date: 'July 28, 2025',
                        excerpt: 'New approaches to responsive design for the multi-device web landscape...'
                    }
                ];
                
                // Show loading state
                loadMoreBtn.textContent = 'Loading...';
                loadMoreBtn.disabled = true;
                
                // Simulate delay for fetching data
                setTimeout(() => {
                    additionalPosts.forEach(post => {
                        const postElement = createPostElement(post);
                        recentPostsContainer.appendChild(postElement);
                    });
                    
                    // Hide the load more button after loading additional posts
                    loadMoreBtn.style.display = 'none';
                    
                    // Initialize lazy loading for new images
                    initLazyLoading();
                }, 800);
            });
        }
    }
    
    /**
     * Create Post Element
     * Helper function to create a post card element from post data
     */
    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        
        postElement.innerHTML = `
            <div class="post-image" data-src="${post.image}">
                <span class="category">${post.category}</span>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p class="post-meta">
                    <span class="author">By ${post.author}</span>
                    <span class="date">${post.date}</span>
                </p>
                <p class="excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        
        return postElement;
    }
    
    /**
     * Search Functionality
     */
    function initSearch() {
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                
                if (searchTerm) {
                    // In a real application, this would redirect to search results page
                    // or fetch and display results via AJAX
                    alert(`Searching for: ${searchTerm}`);
                    
                    // For demonstration purposes only
                    console.log(`Search term: ${searchTerm}`);
                }
            });
            
            // Enable search on Enter key press
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }
    }
    
    /**
     * Form Handling
     * Newsletter and Contact form validation and submission
     */
    function initForms() {
        // Newsletter form submission
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const formMessage = document.getElementById('form-message');
                
                if (validateEmail(emailInput.value)) {
                    // Simulate form submission
                    formMessage.textContent = 'Thank you for subscribing!';
                    formMessage.style.color = '#2ecc71';
                    emailInput.value = '';
                    
                    // In a real application, you would send this to a server
                    console.log('Newsletter subscription: ' + emailInput.value);
                } else {
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.style.color = '#e74c3c';
                }
            });
        }
        
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = this.querySelector('#name').value;
                const email = this.querySelector('#contact-email').value;
                const subject = this.querySelector('#subject').value;
                const message = this.querySelector('#message').value;
                const formMessage = document.getElementById('contact-form-message');
                
                if (name && validateEmail(email) && subject && message) {
                    // Simulate form submission
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    formMessage.style.color = '#2ecc71';
                    
                    // Clear form
                    this.reset();
                    
                    // In a real application, you would send this to a server
                    console.log('Contact form submission: ', { name, email, subject, message });
                } else {
                    formMessage.textContent = 'Please fill out all fields correctly.';
                    formMessage.style.color = '#e74c3c';
                }
            });
        }
    }
    
    /**
     * Email Validation Helper
     */
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    /**
     * Throttle Function
     * Limits how often a function can be called
     */
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
        };
    }
    
    /**
     * Initialize image backgrounds for post images
     * Convert data-src attribute to background-image for post-image elements
     */
    function initPostImageBackgrounds() {
        const postImages = document.querySelectorAll('.post-image[data-src]');
        postImages.forEach(function(imgContainer) {
            if (!imgContainer.querySelector('img')) {
                imgContainer.style.backgroundImage = `url('${imgContainer.dataset.src}')`;
                imgContainer.classList.add('loaded');
            }
        });
    }
    
    // Call this function after DOM is loaded
    initPostImageBackgrounds();
});

// Add an event listener for when all content is loaded
window.addEventListener('load', function() {
    // Add a small delay to ensure all images are loaded properly
    setTimeout(() => {
        // Remove any loading classes or indicators
        document.body.classList.add('page-loaded');
        
        // Initialize any components that need the full page to be loaded
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 200);
});
