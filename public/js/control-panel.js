(function() {
  const toggle = document.getElementById('cpToggle');
  const body = document.getElementById('cpBody');
  const statusSelect = document.getElementById('statusSelect');
  const customStatus = document.getElementById('customStatus');
  const applyStatus = document.getElementById('applyStatus');
  const defaceSelect = document.getElementById('defaceSelect');
  const applyDeface = document.getElementById('applyDeface');

  toggle.addEventListener('click', function() {
    body.classList.toggle('open');
  });

  statusSelect.addEventListener('change', function() {
    customStatus.style.display = this.value === 'custom' ? 'inline-block' : 'none';
  });

  applyStatus.addEventListener('click', function() {
    var code = statusSelect.value === 'custom' ? customStatus.value : statusSelect.value;
    if (!code) return;
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statusCode: parseInt(code, 10) })
    }).then(function() {
      location.reload();
    });
  });

  applyDeface.addEventListener('click', function() {
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defacementType: defaceSelect.value })
    }).then(function() {
      location.reload();
    });
  });
})();
