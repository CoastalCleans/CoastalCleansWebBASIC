(function () {
  'use strict';

  var nav     = document.querySelector('.site-nav');
  var burger  = document.querySelector('.nav-burger');
  var drawer  = document.querySelector('.nav-drawer');
  var overlay = document.querySelector('.nav-overlay');

  if (!nav || !burger || !drawer || !overlay) return;

  /* Scroll shadow */
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active link — match filename */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .drawer-link').forEach(function (link) {
    if (link.getAttribute('href') === page) link.classList.add('is-active');
  });

  /* Open / close */
  function open() {
    burger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    var first = drawer.querySelector('a, button');
    if (first) first.focus();
  }

  function close() {
    burger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    burger.focus();
  }

  burger.addEventListener('click', function () {
    burger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') close();
  });

  /* Focus trap inside drawer */
  drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusables = Array.from(drawer.querySelectorAll('a, button'));
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
