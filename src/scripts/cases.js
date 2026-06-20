// Comparador "antes/depois" interativo do case-herói.
// Arraste o divisor (ou use as setas do teclado) para revelar o "depois".
const slider = document.querySelector('[data-ba-slider]');
if (slider) {
  const after = slider.querySelector('[data-ba-after]');
  const handle = slider.querySelector('[data-ba-handle]');
  let dragging = false;

  function setPos(pct) {
    const p = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 0 0 ${p}%)`;
    handle.style.left = p + '%';
    handle.setAttribute('aria-valuenow', String(Math.round(p)));
  }

  function fromEvent(clientX) {
    const rect = slider.getBoundingClientRect();
    setPos(((clientX - rect.left) / rect.width) * 100);
  }

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    slider.setPointerCapture(e.pointerId);
    fromEvent(e.clientX);
  });
  slider.addEventListener('pointermove', (e) => {
    if (dragging) fromEvent(e.clientX);
  });
  slider.addEventListener('pointerup', () => {
    dragging = false;
  });

  handle.addEventListener('keydown', (e) => {
    const now = Number(handle.getAttribute('aria-valuenow')) || 50;
    if (e.key === 'ArrowLeft') {
      setPos(now - 5);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setPos(now + 5);
      e.preventDefault();
    } else if (e.key === 'Home') {
      setPos(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setPos(100);
      e.preventDefault();
    }
  });

  setPos(50);
}
