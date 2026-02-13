// HelpDesk-Pro Main JS

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const body = document.body;

    const savedTheme = localStorage.getItem('helpdesk_theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('helpdesk_theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // RTL Support Logic
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('rtl')) {
        htmlElement.setAttribute('dir', 'rtl');
        localStorage.setItem('helpdesk_rtl', 'true');
    } else if (localStorage.getItem('helpdesk_rtl') === 'true') {
        htmlElement.setAttribute('dir', 'rtl');
    }

    // Toggle RTL (for demo purposes)
    window.toggleRTL = () => {
        const isRTL = htmlElement.getAttribute('dir') === 'rtl';
        const newDir = isRTL ? 'ltr' : 'rtl';
        htmlElement.setAttribute('dir', newDir);
        localStorage.setItem('helpdesk_rtl', !isRTL);
        location.reload(); // Reload to ensure scripts/styles re-evaluate if needed
    };
});

// Helper function to load common components (optional if not using templates)
// Since we are doing pure static files, we'll repeat header/footer in each file.
// This is easier for "fresher/non-it" people to understand as per user request.
