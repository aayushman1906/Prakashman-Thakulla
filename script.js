document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for Fade-Up Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                // REPLACE 'YOUR_FORM_ID' WITH YOUR ACTUAL FORMSPREE FORM ID
                // Example: 'https://formspree.io/f/xyzaabcd'
                const formId = 'YOUR_FORM_ID';

                if (formId === 'YOUR_FORM_ID') {
                    alert('Please configure your Formspree Form ID in script.js to send emails.');
                    throw new Error('Form ID not configured');
                }

                const response = await fetch(`https://formspree.io/f/${formId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Message sent successfully! Thank you for contacting me.');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        const errorMessages = errorData.errors.map(error => error.message).join(", ");
                        alert(`Oops! There was a problem submitting your form: ${errorMessages}`);
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.message !== 'Form ID not configured') {
                    alert('Oops! Something went wrong. Please try again later.');
                }
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
