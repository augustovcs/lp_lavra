// Reveal genérico para as variações: anima qualquer [data-reveal] ao entrar na tela.
// Escalona o delay entre irmãos do mesmo pai. Respeita prefers-reduced-motion.
const els = Array.from(document.querySelectorAll('[data-reveal]'));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('in'));
} else {
  const groups = new Map();
  els.forEach((el) => {
    const p = el.parentElement;
    const arr = groups.get(p) || [];
    arr.push(el);
    groups.set(p, arr);
  });
  groups.forEach((arr) => arr.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 65, 320) + 'ms';
  }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}
