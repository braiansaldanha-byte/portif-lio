// Enter restarts the fictional simulation; links retain their native behavior.
// Tab, browser shortcuts and touch controls remain available.
(() => {
  'use strict';
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.repeat || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('a, button, input, textarea, select')) return;
    location.assign('index.html');
  });
})();
