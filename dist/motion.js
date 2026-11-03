(() => {
  'use strict';
  const canvas = document.querySelector('#flow');
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.hidden = true; return; }
  const button = document.querySelector('#motion-toggle');
  const label = document.querySelector('#motion-label');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !preference.matches, width = 1, height = 1, frame = 0;
  let time = 0, previous = 0, lastDraw = 0;
  let lines = [], ripples = [];
  const cursor = { x: -1000, y: -1000, tx: -1000, ty: -1000, strength: 0, active: false };
  const palettes = [
    ['rgba(42,103,235,.21)', 'rgba(115,73,225,.18)', 'rgba(8,166,181,.19)'],
    ['rgba(255,104,61,.13)', 'rgba(230,86,145,.12)', 'rgba(111,90,225,.14)']
  ];
  function shape(t, strand, ribbon) {
    const spread = (strand - 17) / 17;
    const phase = time * .16;
    const x = width * (t * 1.24 - .12);
    const base = ribbon ? height * (.23 + t * .82) : height * (1.02 - t * .83);
    const wave = Math.sin(t * 7.8 + phase + ribbon * 2.2) * height * .105;
    const envelope = .35 + .65 * Math.pow(Math.sin(t * Math.PI * 2.3 + phase * .3), 2);
    return [x, base + wave + spread * height * .18 * envelope];
  }
  function reset() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lines = [];
    const samples = width < 700 ? 66 : 100;
    for (let ribbon = 0; ribbon < 2; ribbon++) {
      for (let strand = 0; strand < (ribbon ? 22 : 35); strand++) {
        const nodes = Array.from({ length: samples + 1 }, (_, i) => {
          const t = i / samples, [x, y] = shape(t, strand, ribbon);
          return { t, x, y, vx: 0, vy: 0 };
        });
        lines.push({ ribbon, strand, nodes });
      }
    }
    draw(1, false);
  }
  function wash(x, y, radius, color) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color); gradient.addColorStop(1, 'rgba(245,247,250,0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  }
  function draw(dt, simulate) {
    ctx.clearRect(0, 0, width, height);
    const mobile = width < 700;
    ctx.globalAlpha = mobile ? .55 : 1;
    wash(width * .85, height * .37, Math.max(width, height) * .4, 'rgba(102,139,255,.09)');
    wash(width * .53, height * .94, width * .38, 'rgba(73,203,199,.065)');
    const radius = Math.min(250, Math.max(155, width * .18));
    for (const line of lines) {
      ctx.beginPath();
      for (let i = 0; i < line.nodes.length; i++) {
        const p = line.nodes[i];
        const [baseX, baseY] = shape(p.t, line.strand, line.ribbon);
        if (simulate) {
          let forceX = 0, forceY = 0;
          const dx = baseX - cursor.x, dy = baseY - cursor.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius && cursor.strength > .001) {
            const influence = Math.pow(1 - distance / radius, 2) * cursor.strength;
            const d = Math.max(distance, 12);
            // Repulsion plus a small tangential force makes the strands flow around the hand.
            forceX += (dx / d * 145 - dy / d * 40) * influence;
            forceY += (dy / d * 145 + dx / d * 40) * influence;
          }
          for (const ripple of ripples) {
            const dx = baseX - ripple.x, dy = baseY - ripple.y;
            const distance = Math.hypot(dx, dy);
            const wave = Math.exp(-Math.pow((distance - ripple.age * 240) / 55, 2)) * Math.exp(-ripple.age * 1.8) * 26;
            forceX += dx / Math.max(distance, 1) * wave;
            forceY += dy / Math.max(distance, 1) * wave;
          }
          const targetX = baseX + forceX, targetY = baseY + forceY;
          p.vx = (p.vx + (targetX - p.x) * .035 * dt) * Math.pow(.78, dt);
          p.vy = (p.vy + (targetY - p.y) * .035 * dt) * Math.pow(.78, dt);
          p.x += p.vx * dt; p.y += p.vy * dt;
        }
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
      }
      ctx.strokeStyle = palettes[line.ribbon][Math.floor(line.strand / 6) % 3];
      ctx.lineWidth = line.strand % 9 === 0 ? 1 : .65;
      ctx.stroke();
    }
    // Keep the reading area quiet without adding a visible panel.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const quiet = ctx.createRadialGradient(width * .24, height * .29, 0, width * .24, height * .29, width * .65);
    quiet.addColorStop(0, 'rgba(0,0,0,.93)'); quiet.addColorStop(.48, 'rgba(0,0,0,.68)'); quiet.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = quiet; ctx.fillRect(0, 0, width, height);ctx.restore();
    ctx.globalAlpha = mobile ? .4 : .8;
    for (let i = 0; i < 4; i++) {
      const line = lines[i * 8];
      const t = ((time * .025 + i * .21) % .7) + .2;
      const p = line.nodes[Math.min(line.nodes.length - 1, Math.floor(t * (line.nodes.length - 1)))];
      ctx.fillStyle = ['#ff683d', '#6266e8', '#12aeb3', '#ff8753'][i];
      ctx.beginPath();ctx.arc(p.x, p.y, i ? 2 : 3.5, 0, Math.PI * 2);ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function tick(now) {
    frame = 0;
    if (!enabled || document.hidden) return;
    frame = requestAnimationFrame(tick);
    if (now - lastDraw < 30) return; // Cap at 30fps; ample for ambient movement.
    lastDraw = now;
    const seconds = Math.min((now - previous) / 1000 || 0, .05);
    previous = now; time += seconds;
    const dt = seconds * 60;
    const follow = 1 - Math.pow(.75, dt);
    cursor.x += (cursor.tx - cursor.x) * follow;
    cursor.y += (cursor.ty - cursor.y) * follow;
    cursor.strength += ((cursor.active ? 1 : 0) - cursor.strength) * follow;
    ripples.forEach(ripple => { ripple.age += seconds; });
    ripples = ripples.filter(ripple => ripple.age < 2);
    draw(dt, true);
  }
  function sync() {
    cancelAnimationFrame(frame);frame = 0;
    document.body.classList.toggle('paused', !enabled);
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Pause background animation' : 'Play background animation');
    label.textContent = enabled ? 'on' : 'off';
    previous = performance.now();lastDraw = 0;
    if (enabled && !document.hidden) frame = requestAnimationFrame(tick);
  }
  button.addEventListener('click', () => { enabled = !enabled;sync(); });
  preference.addEventListener('change', event => { enabled = !event.matches;sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pointermove', event => {
    if (!enabled || event.pointerType === 'touch') return;
    if (!cursor.active) { cursor.x = event.clientX;cursor.y = event.clientY; }
    cursor.tx = event.clientX;cursor.ty = event.clientY;cursor.active = true;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { cursor.active = false; });
  window.addEventListener('blur', () => { cursor.active = false; });
  window.addEventListener('pointerdown', event => {
    if (enabled && !event.target.closest('a, button, summary, details')) {
      ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
      ripples = ripples.slice(-4);
    }
  }, { passive: true });
  window.addEventListener('resize', reset);
  reset();sync();
})();
