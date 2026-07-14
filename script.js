document.addEventListener('DOMContentLoaded', () => {
  const h = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  // Menú mòbil: obrir / tancar
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Tanca el menú en clicar qualsevol enllaç
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Animació d'aparició de seccions en fer scroll
  // (només seccions de contingut pla; el hero es mostra directe)
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: .15 });

  document.querySelectorAll('section').forEach(s => {
    if (!s.classList.contains('hero')) {
      s.style.opacity = 0;
      s.style.transform = 'translateY(30px)';
      s.style.transition = 'all .7s ease';
      obs.observe(s);
    }
  });

  // Parallax de la imatge del hero
  const heroImg = document.querySelector('.hero img');
  const maxShift = 90; // marge disponible: la imatge és un 30% més alta que la secció

  function updateParallax() {
    if (!heroImg) return;
    const rect = heroImg.parentElement.getBoundingClientRect();
    const shift = Math.max(-maxShift, Math.min(maxShift, rect.top * 0.15));
    heroImg.style.transform = 'translateY(' + shift + 'px)';
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
    updateParallax();
  });

  updateParallax();
});
