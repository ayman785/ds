// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    // Fix for mobile menu
    if (mobileMenuBtn && nav) {
        // Make sure the menu is initially hidden on mobile
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            nav.classList.toggle('active');

            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Handle dropdown menus on mobile
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');

        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');

                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.mobile-menu')) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // Close all dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Add scroll animation for menu
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !phone || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
            if (linkPath === 'index.html') {
                link.classList.add('active');
            }
        }
    });



    // Simple testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    if (testimonials.length > 2) {
        // Only initialize slider if there are more than 2 testimonials

        // Hide all testimonials except the first two
        for (let i = 2; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }

        // Create slider controls
        const sliderControls = document.createElement('div');
        sliderControls.className = 'slider-controls';
        sliderControls.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-right"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-left"></i></button>
        `;

        const testimonialsSection = document.querySelector('.testimonials-slider');
        if (testimonialsSection) {
            testimonialsSection.after(sliderControls);

            // Add event listeners to controls
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', showPreviousTestimonials);
                nextBtn.addEventListener('click', showNextTestimonials);
            }
        }

        function showPreviousTestimonials() {
            if (currentTestimonial > 0) {
                currentTestimonial -= 2;
                updateTestimonialDisplay();
            }
        }

        function showNextTestimonials() {
            if (currentTestimonial < testimonials.length - 2) {
                currentTestimonial += 2;
                updateTestimonialDisplay();
            }
        }

        function updateTestimonialDisplay() {
            testimonials.forEach((testimonial, index) => {
                if (index >= currentTestimonial && index < currentTestimonial + 2) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
        }
    }

    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .testimonial-card, .contact-form');

    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Add initial animation class
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
