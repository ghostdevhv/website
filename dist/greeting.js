(() => {
  const word = document.querySelector('.greeting-word');
  const motion = document.querySelector('#motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const greetings = {
    en: 'Hi,', hi: 'नमस्ते,', es: 'Hola,', fr: 'Bonjour,', de: 'Hallo,',
    ja: 'こんにちは、', ko: '안녕하세요,', zh: '你好，', pt: 'Olá,', it: 'Ciao,',
    nl: 'Hoi,', sv: 'Hej,', da: 'Hej,', no: 'Hei,', fi: 'Hei,', pl: 'Cześć,',
    tr: 'Merhaba,', id: 'Halo,', ms: 'Hai,', vi: 'Xin chào,',
    ta: 'வணக்கம்,', te: 'నమస్కారం,', kn: 'ನಮಸ್ಕಾರ,', ml: 'നമസ്കാരം,',
    bn: 'নমস্কার,', mr: 'नमस्कार,', gu: 'નમસ્તે,', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ,',
    ar: 'مرحبًا،', he: 'שלום,', ru: 'Привет,', uk: 'Привіт,', el: 'Γεια σου,'
  };
  const preferred = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase().split(/[-_]/)[0];
  const local = Object.hasOwn(greetings, preferred) ? preferred : 'en';
  const alternate = local === 'hi' ? 'en' : 'hi';
  let showingLocal = true, interval, transition;
  function render(language) { word.textContent = greetings[language];word.lang = language;word.dir = ['ar','he'].includes(language) ? 'rtl' : 'ltr'; }
  function clear() { clearInterval(interval);clearTimeout(transition);word.classList.remove('changing'); }
  function visible() { const r = word.getBoundingClientRect();return r.bottom > 0 && r.top < innerHeight; }
  function sync() {
    clear();
    if (document.hidden || reduced.matches || motion.getAttribute('aria-pressed') !== 'true') return;
    interval = setInterval(() => {
      if (!visible()) return;
      word.classList.add('changing');
      transition = setTimeout(() => { showingLocal = !showingLocal;render(showingLocal ? local : alternate);word.classList.remove('changing'); }, 250);
    }, 9000);
  }
  render(local);
  new MutationObserver(sync).observe(motion, {attributes:true,attributeFilter:['aria-pressed']});
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();
