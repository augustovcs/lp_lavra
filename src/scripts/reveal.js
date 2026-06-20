// Reveal ao rolar: adiciona .in quando o elemento entra na viewport,
// com leve escalonamento entre irmãos do mesmo grupo.
// A lista de seletores deve espelhar a de src/styles/global.css.
const SELECTOR = [
  '.hero .eyebrow', '.hero-h', '.hero .foot', '.hero .trust',
  '.sec-head', '.bgrid .it', '.pasrow .half', '.ba .col',
  '.spot .main', '.spot .mini', '.globo-copy', '.globo-stage',
  '.zz .z', '.hero-case', '.cases .band', '.cases .grid .gcard',
  '.grid3 .tcard', '.qual-aside', '.qual-form',
  '.about .intro', '.about .term', '.c9', '.f2 .row', '.f2 .wordmark',
].join(', ');

const els = Array.from(document.querySelectorAll(SELECTOR));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduce) {
  els.forEach((el) => el.classList.add('in'));
} else {
  // escalona o delay por posição entre os irmãos revelados
  const groups = new Map();
  els.forEach((el) => {
    const p = el.parentElement;
    const arr = groups.get(p) || [];
    arr.push(el);
    groups.set(p, arr);
  });
  groups.forEach((arr) => {
    arr.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
