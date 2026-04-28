(function () {
  'use strict';

  var btn  = document.getElementById('theme-toggle');
  var html = document.documentElement;

  if (!btn) return;

  function getTheme() {
    return html.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  btn.addEventListener('click', function () {
    var next = getTheme() === 'dark' ? 'light' : 'dark';
    btn.classList.add('is-toggling');
    btn.addEventListener('animationend', function () {
      btn.classList.remove('is-toggling');
    }, { once: true });
    setTheme(next);
  });

  setTheme(getTheme());
})();
