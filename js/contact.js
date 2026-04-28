(function () {
  'use strict';

  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;

  function getGroup(id)   { return document.getElementById('group-' + id); }
  function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setError(groupId, show) {
    var g = getGroup(groupId);
    if (!g) return;
    if (show) { g.classList.add('has-error'); }
    else       { g.classList.remove('has-error'); }
  }

  function clearErrors() {
    ['name','email','message'].forEach(function (id) { setError(id, false); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var name    = form.querySelector('#name').value.trim();
    var email   = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();
    var valid   = true;

    if (!name)            { setError('name', true);    valid = false; }
    if (!isValidEmail(email)) { setError('email', true);   valid = false; }
    if (!message)         { setError('message', true); valid = false; }

    if (!valid) {
      /* Move focus to first error */
      var firstError = form.querySelector('.has-error .form-input, .has-error .form-textarea');
      if (firstError) firstError.focus();
      return;
    }

    /* Show success (no real backend in v1) */
    form.style.display = 'none';
    if (success) {
      success.classList.add('is-visible');
      success.focus();
    }
  });

  /* Clear error on input */
  ['name','email','message'].forEach(function (id) {
    var el = form.querySelector('#' + id);
    if (!el) return;
    el.addEventListener('input', function () { setError(id, false); });
  });
})();
