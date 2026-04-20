// Menu burger + nav links (embed toggle or page load) + interactions
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Burger toggle
    burger?.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu on link click
    navLinks.forEach(link => link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }));
    
// Nav handler with active state
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to current
            this.classList.add('active');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    document.querySelectorAll('.embed-section').forEach(sec => sec.classList.remove('active'));
                    if (target.classList.contains('embed-section')) {
                        target.classList.add('active');
                    }
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                window.location.href = href;
            }
        });
    });
    
    // Set initial active based on hash or default #accueil
    const currentHash = window.location.hash || '#accueil';
    const initialLink = Array.from(navLinks).find(l => l.getAttribute('href') === currentHash);
    if (initialLink) initialLink.classList.add('active');

    // Initial load: activate #accueil if exists
    const accueil = document.querySelector('#accueil');
    if (accueil?.classList.contains('embed-section')) {
        document.querySelectorAll('.embed-section').forEach(sec => sec.classList.remove('active'));
        accueil.classList.add('active');
    }

    // TODO interactions (on accueil.html)
    const brasBtns = document.querySelectorAll('.bras-btn');
    brasBtns.forEach(btn => btn.addEventListener('click', function() {
        brasBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    }));

    document.querySelectorAll('.toggles input[type=\"checkbox\"]')?.forEach(toggle => {
        toggle.addEventListener('change', function() {
            this.parentElement.style.background = this.checked ? 'var(--poste-blue)' : 'rgba(255,255,255,0.1)';
        });
    });

    document.querySelector('.cta-primary')?.addEventListener('click', () => {
        const assistant = document.querySelector('#assistant') || document.querySelector('a[href=\"#assistant\"]');
        assistant?.scrollIntoView?.({ behavior: 'smooth' }) || window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fade-in
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting && (entry.target.style.animationPlayState = 'running'));
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.feature-card, .hero, .astuces-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // PWA stub
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', e => deferredPrompt = e);
    document.querySelector('.cta-secondary')?.addEventListener('click', e => {
        e.preventDefault();
        deferredPrompt?.prompt();
    });
});
