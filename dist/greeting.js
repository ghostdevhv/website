(() => {
  const word = document.querySelector('.greeting-word');
  const motion = document.querySelector('#motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let english = false, interval, transition;
  function clear() { clearInterval(interval); clearTimeout(transition); word.classList.remove('changing'); }
  function visible() { const r = word.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }
  function sync() {
    clear();
    if (document.hidden || reduced.matches || motion.getAttribute('aria-pressed') !== 'true') return;
    interval = setInterval(() => {
      if (!visible()) return;
      word.classList.add('changing');
      transition = setTimeout(() => {
        english = !english;
        word.textContent = english ? 'Hi,' : 'नमस्ते,';
        word.lang = english ? 'en' : 'hi';
        word.classList.remove('changing');
      }, 250);
    }, 9000);
  }
  new MutationObserver(sync).observe(motion, { attributes: true, attributeFilter: ['aria-pressed'] });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  sync();
})();
