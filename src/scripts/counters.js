// Contagem progressiva dos números ao entrarem na tela (respeita reduced-motion).
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function animate(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduce || Number.isNaN(target)) {
    el.textContent = (Number.isNaN(target) ? el.textContent : target) + suffix;
    return;
  }
  const dur = 1100;
  const t0 = performance.now();
  function step(t) {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * e) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const els = document.querySelectorAll('[data-count]');
if (els.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
}
