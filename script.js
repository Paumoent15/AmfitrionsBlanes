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
  // (només seccions de contingut pla; les que tenen foto de fons
  // -hero i fes-te membre- es mostren directes per evitar artefactes)
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: .15 });

  document.querySelectorAll('section').forEach(s => {
    if (!s.classList.contains('hero') && !s.classList.contains('cta')) {
      s.style.opacity = 0;
      s.style.transform = 'translateY(30px)';
      s.style.transition = 'all .7s ease';
      obs.observe(s);
    }
  });

  // Parallax de les imatges de fons (hero i fes-te membre)
  const parallaxImgs = document.querySelectorAll('.hero img, .cta img');
  const maxShift = 90; // marge disponible: les imatges són un 30% més altes que la secció

  function updateParallax() {
    parallaxImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const shift = Math.max(-maxShift, Math.min(maxShift, rect.top * 0.15));
      img.style.transform = 'translateY(' + shift + 'px)';
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
    updateParallax();
  });

  updateParallax();
});
