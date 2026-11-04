(() => {
  'use strict';

  // Previously shared section URLs still reach the complete portfolio.
  const sections = new Set(['#home', '#projetos', '#sobre', '#stack', '#contato', '#conteudo']);
  if (sections.has(location.hash)) {
    const destination = new URL('portfolio.html', location.href);
    destination.search = location.search;
    destination.hash = location.hash;
    location.replace(destination.href);
    return;
  }

  document.getElementById('gatewayYear').textContent = new Date().getFullYear();
  const button = document.getElementById('gatewayEffects');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let saved;
  try { saved = localStorage.getItem('braian-portfolio-effects'); } catch { /* Optional preference. */ }
  let paused = preference.matches || saved === 'paused';
  let syncRain = () => {};

  function applyEffects(nextPaused, persist = true) {
    paused = nextPaused || preference.matches;
    document.body.classList.toggle('effects-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', 'Pausar animações de fundo');
    button.querySelector('.motion-icon').textContent = paused ? '▷' : 'Ⅱ';
    button.querySelector('.motion-label').textContent = preference.matches ? 'Movimento reduzido' : paused ? 'Retomar efeitos' : 'Pausar efeitos';
    button.disabled = preference.matches;
    if (persist) {
      try { localStorage.setItem('braian-portfolio-effects', paused ? 'paused' : 'playing'); } catch { /* Works without storage. */ }
    }
    syncRain();
  }
  button.hidden = false;
  button.addEventListener('click', () => applyEffects(!paused));
  preference.addEventListener('change', () => {
    let choice;
    try { choice = localStorage.getItem('braian-portfolio-effects'); } catch { /* Optional preference. */ }
    applyEffects(preference.matches || choice === 'paused', false);
  });
  applyEffects(paused, false);

  const canvas = document.getElementById('gatewayRain');
  const context = canvas.getContext('2d');
  if (!context) return;
  const glyphs = '01アイウエオカキクケコサシスセソタチツテト';
  let width = 0;
  let height = 0;
  let drops = [];
  let frame = null;
  let lastTick = 0;

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drops = Array.from({length: Math.ceil(width / 30)}, () => Math.random() * height / 22);
    context.clearRect(0, 0, width, height);
  }
  function draw(time) {
    if (paused || document.hidden) { frame = null; return; }
    frame = requestAnimationFrame(draw);
    if (time - lastTick < 1000 / 20) return;
    lastTick = time;
    context.fillStyle = 'rgba(6, 10, 8, 0.12)';
    context.fillRect(0, 0, width, height);
    context.font = '12px monospace';
    drops.forEach((drop, index) => {
      context.fillStyle = index % 7 === 0 ? '#72c38c' : '#295a38';
      context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], index * 30, drop * 22);
      drops[index] = drop * 22 > height && Math.random() > .97 ? -5 : drop + .28;
    });
  }
  syncRain = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (paused) context.clearRect(0, 0, width, height);
    else if (!document.hidden) { lastTick = 0; frame = requestAnimationFrame(draw); }
  };
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize, {passive: true});
  document.addEventListener('visibilitychange', syncRain);
  syncRain();
})();
