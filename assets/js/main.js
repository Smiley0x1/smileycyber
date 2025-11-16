// Mobile nav toggle and theme toggle
(function () {
  // Mobile nav + theme + active nav
  document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.header__menu ul');
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // NAV TOGGLE: open/close, close on escape, and click-outside
    function closeNav() {
      if (navMenu && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function (e) {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('is-open');
        e.stopPropagation();
      });

      // close on escape
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') closeNav();
      });

      // close when clicking outside
      document.addEventListener('click', function (ev) {
        if (!navMenu.contains(ev.target) && !navToggle.contains(ev.target)) {
          closeNav();
        }
      });
    }

    // THEME TOGGLE
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    function applyTheme(theme) {
      if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
      }
    }
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));
    if (themeToggle) {
      // initialize aria-pressed
      themeToggle.setAttribute('aria-pressed', String(root.getAttribute('data-theme') === 'light'));
      themeToggle.addEventListener('click', function () {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        this.setAttribute('aria-pressed', String(next === 'light'));
        // small animation for feedback
        try {
          this.classList.add('theme-anim');
          setTimeout(() => this.classList.remove('theme-anim'), 300);
        } catch (e) {}
      });
    }

    // ACTIVE NAV: mark the link that matches the current location
    try {
      const links = Array.from(document.querySelectorAll('.header__menu-link'));
      const current = window.location.pathname.replace(/\\/g, '/');
      links.forEach(a => {
        // get href path relative to origin
        const href = a.getAttribute('href');
        if (!href) return;
        // normalize
        const linkPath = new URL(href, window.location.origin + current).pathname;
        if (linkPath === current || (current.endsWith('/') && linkPath === current + 'index.html') || linkPath === (current.replace(/index\.html$/, ''))) {
          a.classList.add('active');
        }
      });
    } catch (err) {
      // ignore
      console.warn('Active nav: ', err);
    }
  });
})();
