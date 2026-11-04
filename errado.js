// Existing blue-pill links now open an accessible, calm version of the portfolio.
(() => {
  const destination = new URL('index.html', location.href);
  destination.search = location.search;
  destination.searchParams.set('modo', 'foco');
  destination.hash = location.hash;
  location.replace(destination.href);
})();
