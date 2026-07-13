document.addEventListener('DOMContentLoaded',()=>{
const h=document.querySelector('.header');
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='translateY(0)';}})},{threshold:.15});
document.querySelectorAll('section').forEach(s=>{if(!s.classList.contains('hero')){s.style.opacity=0;s.style.transform='translateY(30px)';s.style.transition='all .7s ease';obs.observe(s);}});
window.addEventListener('scroll',()=>{if(window.scrollY>40)h.classList.add('scrolled');else h.classList.remove('scrolled');
const hero=document.querySelector('.hero img');if(hero)hero.style.transform='translateY('+(window.scrollY*0.15)+'px)';
});
});