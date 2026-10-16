(() => {
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const countLabel = document.querySelector('.filter-count');
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  function setFilter(kind) {
    if (!['all', 'originals', 'engineering', 'rebirth'].includes(kind)) return;
    filters.forEach(button => {
      const active = button.dataset.filter === kind;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = kind === 'all' || card.dataset.category === kind;
      card.hidden = !show;
      if (show) visible++;
    });
    if (countLabel) countLabel.textContent = String(cards.length);
  }

  filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  document.querySelectorAll('[data-jump-filter]').forEach(link => {
    link.addEventListener('click', () => setFilter(link.dataset.jumpFilter));
  });
  setFilter('all');
})();
