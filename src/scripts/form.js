// Qualificador: split com resumo ao vivo no desktop; passos "gamificados" no mobile.
// Sem backend — o envio monta um e-mail (mailto) já preenchido para a Noven.
const qual = document.getElementById('qual');

if (qual) {
  const CONTACT_EMAIL = 'contato@noven.dev'; // troque pelo e-mail real
  const form = qual.querySelector('form');
  const steps = Array.from(qual.querySelectorAll('[data-step]'));
  const bar = qual.querySelector('[data-progress]');
  const count = qual.querySelector('[data-count-label]');
  const navPrev = qual.querySelector('[data-prev]');
  const navNext = qual.querySelector('[data-next]');
  const navSend = qual.querySelector('[data-send]');
  const answers = {};

  /* ---- seleção de chips/tiles (single ou multi) + resumo ao vivo ---- */
  function wireGroup(group) {
    const multi = group.hasAttribute('data-multi');
    const target = group.dataset.target;
    group.addEventListener('click', (e) => {
      const opt = e.target.closest('.chip, .tile');
      if (!opt) return;
      if (multi) {
        opt.classList.toggle('on');
      } else {
        group.querySelectorAll('.chip, .tile').forEach((x) => x.classList.toggle('on', x === opt));
      }
      if (target) {
        const picked = Array.from(group.querySelectorAll('.on')).map((o) => {
          const tn = o.querySelector('.tn');
          return (tn ? tn.textContent : o.textContent).trim();
        });
        answers[target] = picked;
        const live = qual.querySelector('.v[data-k="' + target + '"]');
        if (live) {
          live.textContent = picked.length ? picked.join(', ') : '—';
          live.classList.toggle('empty', picked.length === 0);
        }
      }
    });
  }
  qual.querySelectorAll('[data-single], [data-multi]').forEach(wireGroup);

  /* ---- modo "passos" no mobile ---- */
  const mq = matchMedia('(max-width: 820px)');
  let stepMode = false;
  let i = 0;

  function render() {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    if (bar) bar.style.width = ((i + 1) / steps.length) * 100 + '%';
    if (count) count.textContent = 'Passo ' + (i + 1) + ' de ' + steps.length;
    if (navPrev) navPrev.hidden = i === 0;
    const last = i === steps.length - 1;
    if (navNext) navNext.hidden = last;
    if (navSend) navSend.hidden = !last;
  }

  function enterStepMode() {
    stepMode = true;
    i = 0;
    qual.classList.add('stepped');
    render();
  }
  function exitStepMode() {
    stepMode = false;
    qual.classList.remove('stepped');
    steps.forEach((s) => s.classList.remove('is-active'));
  }

  function sync(e) {
    if (e.matches) enterStepMode();
    else exitStepMode();
  }
  mq.addEventListener('change', sync);
  sync(mq);

  if (navNext) navNext.addEventListener('click', () => {
    i = Math.min(steps.length - 1, i + 1);
    render();
  });
  if (navPrev) navPrev.addEventListener('click', () => {
    i = Math.max(0, i - 1);
    render();
  });

  /* ---- envio: monta o e-mail com as respostas ---- */
  function buildAndSend() {
    const name = (form.querySelector('[name="nome"]')?.value || '').trim();
    const contact = (form.querySelector('[name="contato"]')?.value || '').trim();
    const note = (form.querySelector('[name="mensagem"]')?.value || '').trim();
    const err = qual.querySelector('[data-error]');

    if (!name || !contact) {
      if (err) err.hidden = false;
      return;
    }
    if (err) err.hidden = true;

    const lines = [
      'Novo contato pelo site da Noven',
      '',
      'Nome: ' + name,
      'Contato: ' + contact,
      'O que quer construir: ' + ((answers.tipo || []).join(', ') || '—'),
      'Estágio: ' + ((answers.estagio || []).join(', ') || '—'),
      'Prazo: ' + ((answers.prazo || []).join(', ') || '—'),
      'Orçamento: ' + ((answers.orcamento || []).join(', ') || '—'),
    ];
    if (note) lines.push('', 'Detalhes: ' + note);

    const subject = 'Projeto Noven — ' + name;
    const href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));

    window.location.href = href;
  }

  if (navSend) navSend.addEventListener('click', buildAndSend);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    buildAndSend();
  });
}
