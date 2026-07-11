(function () {
  'use strict';

  var grid  = document.getElementById('blog-grid');
  var empty = document.getElementById('blog-empty');

  if (!grid) return;

  /* Sort stories newest-first by data-date; new posts "shift" older ones down */
  function sortCards() {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.story-card'));
    cards.sort(function (a, b) {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    });
    cards.forEach(function (card) { grid.appendChild(card); });
    if (empty) empty.style.display = cards.length ? 'none' : 'block';
  }
  sortCards();

  grid.addEventListener('click', function (e) {
    var closeBtn = e.target.closest('.story-close');
    var card = e.target.closest('.story-card');
    if (!card) return;

    if (closeBtn) {
      card.classList.remove('is-open');
      return;
    }
    if (card.classList.contains('is-open')) return;

    grid.querySelectorAll('.story-card.is-open').forEach(function (open) {
      open.classList.remove('is-open');
    });
    card.classList.add('is-open');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
