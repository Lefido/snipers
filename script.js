// Menu burger mobile + smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Toggle menu burger
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
// Smooth scrolling + special handling for #assistant
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if ((targetId === '#assistant' || targetId === '#planning') && targetSection) {
                // Show the target embed section
                document.querySelectorAll('.embed-section').forEach(sec => sec.classList.remove('active'));
                targetSection.classList.add('active');
                // Scroll to it
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else if (targetSection) {
                // Hide all embed sections
                document.querySelectorAll('.embed-section').forEach(sec => sec.classList.remove('active'));
                // Regular smooth scroll (for future sections)
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
