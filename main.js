// HelpDesk-Pro Main JS

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('helpdesk_theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('helpdesk_theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        });
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

    // Auto-Close Offcanvas on Link Click
    const offcanvasElements = document.querySelectorAll('.offcanvas');
    offcanvasElements.forEach(el => {
        const links = el.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(el);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            });
        });
    });

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
