(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    var el = document.getElementById('donate-success');
    if (el) el.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  var btn = document.getElementById('donate-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var selected = document.querySelector('.tier-card[aria-checked="true"]');
    var amount = selected ? parseInt(selected.dataset.amount, 10) : 0;

    var customInput = document.getElementById('custom-amount');
    if (!amount && customInput && customInput.value) {
      amount = parseInt(customInput.value, 10);
    }

    if (!amount || amount < 1) {
      alert('Please select a donation tier or enter a custom amount first.');
      return;
    }

    var errEl = document.getElementById('donate-error');
    if (errEl) errEl.hidden = true;

    btn.disabled = true;
    btn.textContent = 'Redirecting to Stripe…';

    fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error || 'No checkout URL');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Donate Now →';
        if (errEl) errEl.hidden = false;
      });
  });
})();
