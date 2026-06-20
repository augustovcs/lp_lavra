// Seletor de paleta (Ocre / Floresta / Musgo / Vinho) com persistência.
const VALID = ['ocre', 'floresta', 'musgo', 'vinho'];
const root = document.documentElement;
const buttons = Array.from(document.querySelectorAll('.sw'));

function setTheme(theme) {
  if (!VALID.includes(theme)) return;
  root.dataset.theme = theme;
  try {
    localStorage.setItem('lavra-theme', theme);
  } catch (e) {
    /* armazenamento indisponível — segue só na sessão */
  }
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.theme === theme)));
}

// Reflete o tema já aplicado (pelo script inline do <head>) nos botões.
buttons.forEach((b) => {
  b.setAttribute('aria-pressed', String(b.dataset.theme === root.dataset.theme));
  b.addEventListener('click', () => setTheme(b.dataset.theme));
});
