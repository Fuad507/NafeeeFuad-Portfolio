(() => {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  function applyTheme(theme) {
    body.setAttribute('data-bs-theme', theme);
    const icon = theme === 'dark' ? 'sun' : 'moon';
    if (themeToggle) themeToggle.innerHTML = `<i class="bi bi-${icon}"></i>`;
  }

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = body.getAttribute('data-bs-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Smooth scroll and active nav handling
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.hash) {
        const target = document.querySelector(link.hash);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        }
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        document.querySelectorAll('.navbar .nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { threshold: 0.5 });

  ['home','about','skills','projects','contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Progress bars animation on reveal
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        el.style.width = target + '%';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  progressBars.forEach(pb => progressObserver.observe(pb));

  // Contact form validation (Bootstrap)
  const form = document.getElementById('contactForm');
  const alertEl = document.getElementById('formAlert');
  form?.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alertEl?.classList.remove('d-none');
      form.reset();
      setTimeout(() => alertEl?.classList.add('d-none'), 3000);
    }
    form.classList.add('was-validated');
  });

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();



