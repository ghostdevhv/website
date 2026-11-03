(() => {
  const allowed = new Set(['morning', 'afternoon', 'evening', 'night']);
  function localScene(hour) {
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }
  function update() {
    const override = new URLSearchParams(location.search).get('view');
    document.body.dataset.scene = allowed.has(override) ? override : localScene(new Date().getHours());
  }
  window.addEventListener('popstate', update);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
  setInterval(update, 60000);
  update();
})();
