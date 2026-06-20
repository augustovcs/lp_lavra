// Palavra rotativa do hero: troca suave (fade + blur) num espaço fixo na 2ª linha.
const el = document.getElementById('rotWord');
if (el) {
  const words = ['apps', 'sistemas', 'automações', 'landing pages'];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    let i = 0;
    setInterval(() => {
      el.classList.add('out'); // some suavemente
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        requestAnimationFrame(() => el.classList.remove('out')); // reaparece
      }, 500);
    }, 2800);
  }
}
