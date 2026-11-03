(() => {
  const canvas = document.querySelector('#flow');
  const ctx = canvas.getContext('2d');
  const button = document.querySelector('#motion-toggle');
  const label = document.querySelector('#motion-label');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !preference.matches, width = 0, height = 0, frame = 0, time = 0, previous = 0;
  const pointer = { x: .7, y: .5, tx: .7, ty: .5 };
  function resize() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!enabled) draw();
  }
  function position(t, line) {
    const phase = time * .12;
    const spread = (line - 20) / 20;
    const x = width * (t * 1.24 - .12);
    const base = height * (.99 - .77 * t);
    const wave = Math.sin(t * Math.PI * 3.2 + phase) * height * .115;
    const fan = Math.sin(t * Math.PI * 3.5 - phase * .4) * spread * height * .13;
    const influence = Math.exp(-Math.pow((t - pointer.x) * 4, 2));
    return [x, base + wave + fan + influence * (pointer.y - .5) * 38];
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const mobile = width < 700;
    ctx.globalAlpha = mobile ? .38 : .78;
    for (let line = 0; line < 41; line++) {
      ctx.beginPath();
      for (let step = 0; step <= 220; step++) {
        const [x, y] = position(step / 220, line);
        step ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = line === 20 ? 'rgba(20,40,75,.42)' : 'rgba(74,129,221,.24)';
      ctx.lineWidth = line === 20 ? .85 : .55;
      ctx.stroke();
    }
    const [x,y] = position(.72 + Math.sin(time * .16) * .11, 20);
    ctx.globalAlpha = mobile ? .5 : .95;
    const glow = ctx.createRadialGradient(x,y,0,x,y,17);
    glow.addColorStop(0,'rgba(255,93,37,.3)'); glow.addColorStop(1,'rgba(255,93,37,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x,y,17,0,Math.PI*2);ctx.fill();
    ctx.fillStyle = '#ff5d25'; ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();ctx.globalAlpha = 1;
  }
  function tick(now) {
    frame = 0;
    if (!enabled || document.hidden) return;
    time += Math.min((now - previous) / 1000 || 0, .05); previous = now;
    pointer.x += (pointer.tx - pointer.x) * .025;
    pointer.y += (pointer.ty - pointer.y) * .025;
    draw(); frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0;
    document.body.classList.toggle('paused', !enabled);
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Pause background animation' : 'Play background animation');
    label.textContent = enabled ? 'on' : 'off';
    draw(); previous = performance.now();
    if (enabled && !document.hidden) frame = requestAnimationFrame(tick);
  }
  button.addEventListener('click', () => { enabled = !enabled; sync(); });
  preference.addEventListener('change', event => { enabled = !event.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pointermove', event => { pointer.tx = event.clientX / width; pointer.ty = event.clientY / height; }, { passive: true });
  window.addEventListener('resize', resize);
  resize(); sync();
})();
