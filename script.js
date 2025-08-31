document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Toggle ---
    const modeToggle = document.getElementById('mode-toggle-checkbox');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        modeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        modeToggle.checked = false;
    }

    prefersDark.addListener((e) => {
        if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            modeToggle.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            modeToggle.checked = false;
        }
    });

    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    // --- Fade-in on Scroll and Typing Animation ---
    const faders = document.querySelectorAll('.fade-in');
    const heroTitle = document.querySelector('.hero-title');

    const appearOptions = {
        threshold: 0.2
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            
            // Trigger typing animation when hero section becomes visible
            if (entry.target.id === 'hero') {
                heroTitle.style.animationPlayState = 'running';
            }

            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Skill Bar Animation ---
    const skillBars = document.querySelectorAll('.skill-level');
    const skillSection = document.getElementById('skills');

    const skillOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const level = bar.dataset.level;
                    bar.style.width = `${level}%`;
                });
                observer.unobserve(skillSection);
            }
        });
    }, skillOptions);

    skillObserver.observe(skillSection);
});
