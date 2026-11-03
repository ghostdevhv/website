(() => {
  const hero = document.querySelector('.sunset-intro');
  const button = document.querySelector('#motion-toggle');
  const label = document.querySelector('#motion-label');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !preference.matches;
  function sync() {
    document.body.classList.toggle('paused', !enabled || document.hidden);
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Pause animation' : 'Play animation');
    label.textContent = enabled ? 'on' : 'off';
    if (!enabled) {hero.style.setProperty('--px','0px');hero.style.setProperty('--py','0px');}
  }
  hero.addEventListener('pointermove', event => {
    if (!enabled || event.pointerType === 'touch') return;
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--px', `${((event.clientX-r.left)/r.width-.5)*30}px`);
    hero.style.setProperty('--py', `${((event.clientY-r.top)/r.height-.5)*20}px`);
  }, {passive:true});
  hero.addEventListener('pointerleave', () => {hero.style.setProperty('--px','0px');hero.style.setProperty('--py','0px');});
  button.addEventListener('click', () => {enabled=!enabled;sync();});
  preference.addEventListener('change', e => {enabled=!e.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  sync();
})();

(() => {
  const picker = document.querySelector('#scene-select');
  const caption = document.querySelector('#scene-caption');
  function localScene(hour) {
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }
  function update() {
    const scene = picker.value === 'auto' ? localScene(new Date().getHours()) : picker.value;
    document.body.dataset.scene = scene;
    caption.textContent = `${scene[0].toUpperCase()}${scene.slice(1)}${picker.value === 'auto' ? ' · your time' : ''}`;
  }
  picker.addEventListener('change',update);
  document.addEventListener('visibilitychange',() => {if (!document.hidden) update();});
  setInterval(update,60000);
  update();
})();
