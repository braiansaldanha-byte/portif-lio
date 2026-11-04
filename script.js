(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Native anchors work without JavaScript; the mobile menu is an enhancement.
  const menuButton = document.getElementById('menuToggle');
  const navigation = document.getElementById('mainNav');
  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    menuButton.querySelector('use').setAttribute('href', '#i-menu');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    if (navigation.classList.contains('is-open')) return closeMenu();
    navigation.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
    menuButton.querySelector('use').setAttribute('href', '#i-close');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  navigation.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !event.relatedTarget.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 621px)').addEventListener('change', () => closeMenu());

  // Each filter leaves real project links available in the HTML fallback.
  const filters = document.querySelector('.project-filters');
  const cards = [...document.querySelectorAll('.project-card')];
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (!selected) return;
    filters.querySelectorAll('[data-filter]').forEach((button) => {
      const active = button === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    cards.forEach((card) => {
      card.hidden = selected.dataset.filter !== 'all' && card.dataset.category !== selected.dataset.filter;
      if (!card.hidden) count += 1;
    });
    document.getElementById('filterResult').textContent = `${count} ${count === 1 ? 'projeto' : 'projetos'}`;
  });

  const projects = {
    moto: {
      title: 'MotoManiacs', category: 'WEBSITE / PRESENÇA DIGITAL',
      description: 'Uma página comercial para apresentar uma oficina de preparação de motos com uma identidade visual própria.',
      challenge: 'Traduzir a personalidade do universo das motos em uma página que organize a apresentação do negócio e facilite a navegação.',
      learnings: ['Estruturar a apresentação e as seções de um site comercial.', 'Trabalhar identidade visual, cores e estilos em CSS.', 'Conectar navegação e comportamento da interface com JavaScript.'],
      url: 'https://github.com/braiansaldanha-byte/MotoManiacs-Projeto'
    },
    basket: {
      title: 'Basket4Life', category: 'WEBSITE / CONTEÚDO EDITORIAL',
      description: 'Um blog sobre basquete que conecta meu interesse pelo esporte à construção de experiências para a web.',
      challenge: 'Organizar diferentes conteúdos esportivos em uma interface com hierarquia clara e uma identidade ligada ao basquete.',
      learnings: ['Organizar conteúdo em seções e elementos de navegação.', 'Criar hierarquia visual para títulos, imagens e textos.', 'Praticar a combinação de HTML, CSS e JavaScript em um blog.'],
      url: 'https://github.com/braiansaldanha-byte/Blog-Basket4Life'
    },
    shapes: {
      title: 'Jogo dos Formatos', category: 'INTERATIVO / EXPERIÊNCIA EDUCATIVA',
      description: 'Um jogo de associação de formas geométricas que transforma conceitos de JavaScript em uma experiência educativa.',
      challenge: 'Reconhecer associações corretas entre figuras e áreas de encaixe, atualizar a pontuação e permitir o reinício da partida.',
      learnings: ['Trabalhar eventos de arrastar e soltar e manipulação do DOM.', 'Controlar pontuação, estados e feedback da partida.', 'Implementar a reinicialização do jogo e a ordem das formas.'],
      url: 'https://github.com/braiansaldanha-byte/JogodosFormatos'
    }
  };
  const dialog = document.getElementById('projectDialog');
  let lastProjectButton;
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-project]').forEach((button) => {
      button.hidden = false;
      button.setAttribute('aria-label', `Sobre o projeto ${projects[button.dataset.project].title}`);
      button.addEventListener('click', () => {
        const project = projects[button.dataset.project];
        document.getElementById('dialogTitle').textContent = project.title;
        document.getElementById('dialogCategory').textContent = project.category;
        document.getElementById('dialogDescription').textContent = project.description;
        document.getElementById('dialogChallenge').textContent = project.challenge;
        document.getElementById('dialogLearnings').replaceChildren(...project.learnings.map((text) => {
          const item = document.createElement('li');
          item.textContent = text;
          return item;
        }));
        document.getElementById('dialogLink').href = project.url;
        lastProjectButton = button;
        dialog.showModal();
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => lastProjectButton?.focus({preventScroll: true}));
  }

  const copyButton = document.getElementById('copyEmail');
  const copyStatus = document.getElementById('copyStatus');
  if (navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('braianlps77@gmail.com');
        copyStatus.textContent = 'E-mail copiado. Vamos conversar!';
      } catch {
        copyStatus.textContent = 'Selecione o endereço acima para copiar.';
      }
    });
  }

  // Effects are optional, remember the choice, and respect system preferences.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const effectButton = document.getElementById('effectsToggle');
  const focusButton = document.getElementById('focusMode');
  let storedChoice;
  try { storedChoice = localStorage.getItem('braian-portfolio-effects'); } catch { /* Storage can be disabled. */ }
  let paused = motionPreference.matches || new URLSearchParams(location.search).get('modo') === 'foco' || storedChoice === 'paused';
  let syncRain = () => {};
  function setEffects(nextPaused, persist = true) {
    paused = nextPaused || motionPreference.matches;
    document.body.classList.toggle('effects-paused', paused);
    effectButton.setAttribute('aria-pressed', String(paused));
    effectButton.setAttribute('aria-label', 'Modo foco, sem animações');
    effectButton.querySelector('span').textContent = paused ? 'Retomar efeitos' : 'Pausar efeitos';
    effectButton.querySelector('use').setAttribute('href', paused ? '#i-play' : '#i-pause');
    focusButton.setAttribute('aria-pressed', String(paused));
    focusButton.setAttribute('aria-label', 'Modo foco, sem animações');
    document.getElementById('focusLabel').textContent = paused ? 'Modo foco ativado' : 'Ativar modo foco';
    if (motionPreference.matches) {
      effectButton.querySelector('span').textContent = 'Movimento reduzido';
      effectButton.disabled = true;
      focusButton.disabled = true;
    } else {
      effectButton.disabled = false;
      focusButton.disabled = false;
    }
    if (persist) {
      try { localStorage.setItem('braian-portfolio-effects', paused ? 'paused' : 'playing'); } catch { /* The page also works without storage. */ }
    }
    syncRain();
  }
  effectButton.hidden = false;
  focusButton.hidden = false;
  effectButton.addEventListener('click', () => setEffects(!paused));
  focusButton.addEventListener('click', () => setEffects(!paused));
  motionPreference.addEventListener('change', () => {
    let preference;
    try { preference = localStorage.getItem('braian-portfolio-effects'); } catch { /* Optional. */ }
    setEffects(motionPreference.matches || preference === 'paused', false);
  });
  setEffects(paused, false);

  // Keep the rain confined to the illustration, capped at 24 fps, and stop it
  // when offscreen or in a hidden tab. The static SVG works without a canvas.
  const canvas = document.getElementById('matrixCanvas');
  const context = canvas.getContext('2d');
  if (context) {
    const glyphs = '01アイウエオカキクケコサシスセソタチツテト';
    let width = 0;
    let height = 0;
    let drops = [];
    let frame = null;
    let lastTick = 0;
    let inView = true;
    function resizeCanvas() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drops = Array.from({length: Math.ceil(width / 22)}, () => Math.random() * -40);
    }
    function draw(time) {
      if (paused || document.hidden || !inView) { frame = null; return; }
      frame = requestAnimationFrame(draw);
      if (time - lastTick < 1000 / 24) return;
      lastTick = time;
      context.fillStyle = 'rgba(8, 11, 9, 0.10)';
      context.fillRect(0, 0, width, height);
      context.font = '11px monospace';
      drops.forEach((drop, index) => {
        context.fillStyle = index % 6 === 0 ? '#80d89a' : '#23472f';
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        context.fillText(glyph, index * 22, drop * 18);
        drops[index] = drop * 18 > height && Math.random() > .975 ? -10 : drop + .33;
      });
    }
    syncRain = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (paused) context.clearRect(0, 0, width, height);
      else if (!document.hidden && inView) { lastTick = 0; frame = requestAnimationFrame(draw); }
    };
    resizeCanvas();
    if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(canvas);
    else window.addEventListener('resize', resizeCanvas, {passive: true});
    if ('IntersectionObserver' in window) new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      syncRain();
    }).observe(canvas);
    document.addEventListener('visibilitychange', syncRain);
    syncRain();
  }

  if ('IntersectionObserver' in window) {
    const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-15% 0px -55% 0px', threshold: 0});
    document.querySelectorAll('#home,#projetos,#sobre,#stack,#contato').forEach((section) => sectionObserver.observe(section));
  }
})();
