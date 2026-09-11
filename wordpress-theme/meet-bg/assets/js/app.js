/* Meet-BG — minimal JS (mobile nav toggle + smooth scroll) */
(function () {
  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    const t = e.target.closest('[data-nav-toggle]');
    if (!t) return;
    const nav = document.querySelector('.primary-nav');
    if (nav) nav.classList.toggle('is-open');
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
})();
