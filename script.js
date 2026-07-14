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
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: .15 });

  // Només animem les seccions de contingut pla; les que tenen foto de
  // fons (hero, cta, contact) es mostren directament per evitar artefactes
  // de pintat parcial en combinar l'animació amb l'overlay/imatge.
  document.querySelectorAll('section').forEach(s => {
    if (!s.classList.contains('hero') && !s.classList.contains('cta') && !s.classList.contains('contact')) {
      s.style.opacity = 0;
      s.style.transform = 'translateY(30px)';
      s.style.transition = 'all .7s ease';
      obs.observe(s);
    }
  });

  // Efecte fons fix + paral·laxi de l'imatge de portada
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) h.classList.add('scrolled');
    else h.classList.remove('scrolled');

    const hero = document.querySelector('.hero img');
    if (hero) {
      const maxShift = 90; // marge disponible: la imatge és un 30% més alta que la secció
      const shift = Math.min(window.scrollY * 0.15, maxShift);
      hero.style.transform = 'translateY(' + shift + 'px)';
    }
  });
});
