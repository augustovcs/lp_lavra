// Alternância de tema claro (Ocre) ↔ escuro (Noven dark), com persistência.
const VALID = ['ocre', 'floresta'];
const root = document.documentElement;
const toggle = document.querySelector('.mode');

function apply(theme) {
  if (!VALID.includes(theme)) return;
  root.dataset.theme = theme;
  try {
    localStorage.setItem('noven-theme', theme);
  } catch (e) {
    /* armazenamento indisponível — segue só na sessão */
  }
  if (toggle) toggle.setAttribute('aria-pressed', String(theme === 'floresta'));
}

if (toggle) {
  // Reflete o tema já aplicado (pelo script inline do <head>) no botão.
  toggle.setAttribute('aria-pressed', String((root.dataset.theme || 'ocre') === 'floresta'));
  toggle.addEventListener('click', () => {
    apply((root.dataset.theme || 'ocre') === 'floresta' ? 'ocre' : 'floresta');
  });
}
