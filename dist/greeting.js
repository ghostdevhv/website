(() => {
  const word = document.querySelector('.greeting-word');
  const journey = document.querySelector('.journey-line');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Timezone is a regional hint, never a claim about nationality or precise location.
  const regions = {
    hi:['Asia/Kolkata','Asia/Calcutta'],
    ja:['Asia/Tokyo'],ko:['Asia/Seoul'],zh:['Asia/Shanghai','Asia/Chongqing','Asia/Harbin','Asia/Hong_Kong','Asia/Taipei','Asia/Macau'],
    fr:['Europe/Paris','Europe/Monaco'],de:['Europe/Berlin','Europe/Busingen','Europe/Vienna'],
    es:['Europe/Madrid','Africa/Ceuta','Atlantic/Canary','America/Mexico_City','America/Cancun','America/Monterrey','America/Tijuana','America/Bogota','America/Lima','America/Santiago','America/Argentina/Buenos_Aires','America/Buenos_Aires','America/Caracas','America/Montevideo','America/La_Paz','America/Guayaquil','America/Havana','America/Costa_Rica','America/Guatemala','America/Panama','America/El_Salvador','America/Managua','America/Tegucigalpa','America/Santo_Domingo'],
    pt:['Europe/Lisbon','Atlantic/Madeira','Atlantic/Azores','America/Sao_Paulo','America/Fortaleza','America/Recife','America/Manaus','America/Bahia','America/Belem'],
    it:['Europe/Rome','Europe/Vatican','Europe/San_Marino'],nl:['Europe/Amsterdam'],
    sv:['Europe/Stockholm'],da:['Europe/Copenhagen'],no:['Europe/Oslo'],fi:['Europe/Helsinki'],
    pl:['Europe/Warsaw'],tr:['Europe/Istanbul','Asia/Istanbul'],
    id:['Asia/Jakarta','Asia/Pontianak','Asia/Makassar','Asia/Jayapura'],ms:['Asia/Kuala_Lumpur','Asia/Kuching'],
    vi:['Asia/Ho_Chi_Minh','Asia/Saigon'],th:['Asia/Bangkok'],bn:['Asia/Dhaka','Asia/Dacca'],
    ar:['Asia/Riyadh','Asia/Dubai','Asia/Muscat','Asia/Qatar','Asia/Kuwait','Asia/Bahrain','Asia/Baghdad','Asia/Amman','Asia/Beirut','Asia/Damascus','Africa/Cairo','Africa/Algiers','Africa/Tunis','Africa/Tripoli','Africa/Casablanca'],
    he:['Asia/Jerusalem','Asia/Tel_Aviv'],ru:['Europe/Moscow','Europe/Kaliningrad','Europe/Samara','Asia/Yekaterinburg','Asia/Novosibirsk','Asia/Vladivostok'],
    uk:['Europe/Kyiv','Europe/Kiev'],el:['Europe/Athens'],ne:['Asia/Kathmandu','Asia/Katmandu']
  };
  const text = {
    en:['Hi,','The journey continues.'],hi:['नमस्ते,','सफ़र जारी है।'],
    es:['Hola,','El viaje continúa.'],fr:['Bonjour,','Le voyage continue.'],de:['Hallo,','Die Reise geht weiter.'],
    ja:['こんにちは、','旅は続く。'],ko:['안녕하세요,','여정은 계속됩니다.'],zh:['你好，','旅程仍在继续。'],
    pt:['Olá,','A jornada continua.'],it:['Ciao,','Il viaggio continua.'],nl:['Hoi,','De reis gaat verder.'],
    sv:['Hej,','Resan fortsätter.'],da:['Hej,','Rejsen fortsætter.'],no:['Hei,','Reisen fortsetter.'],fi:['Hei,','Matka jatkuu.'],
    pl:['Cześć,','Podróż trwa.'],tr:['Merhaba,','Yolculuk devam ediyor.'],id:['Halo,','Perjalanan berlanjut.'],
    ms:['Hai,','Perjalanan diteruskan.'],vi:['Xin chào,','Hành trình tiếp tục.'],th:['สวัสดี,','การเดินทางยังคงดำเนินต่อไป'],
    bn:['নমস্কার,','যাত্রা চলছে।'],ar:['مرحبًا،','الرحلة مستمرة.'],he:['שלום,','המסע נמשך.'],
    ru:['Привет,','Путешествие продолжается.'],uk:['Привіт,','Подорож триває.'],el:['Γεια σου,','Το ταξίδι συνεχίζεται.'],ne:['नमस्ते,','यात्रा जारी छ।']
  };
  let timezone = '';
  try { timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}
  const local = Object.keys(regions).find(language => regions[language].includes(timezone)) || 'en';
  let showingLocal = true, interval, transition;
  function render(language) {
    [word,journey].forEach((element,index) => {
      element.textContent = text[language][index];element.lang = language;
      element.dir = ['ar','he'].includes(language) ? 'rtl' : 'ltr';
    });
  }
  function clear() { clearInterval(interval);clearTimeout(transition);word.classList.remove('changing');journey.classList.remove('changing'); }
  function visible() { const r = word.getBoundingClientRect();return r.bottom > 0 && r.top < innerHeight; }
  function sync() {
    clear();
    if (local === 'en' || document.hidden || reduced.matches) return;
    interval = setInterval(() => {
      if (!visible()) return;
      word.classList.add('changing');journey.classList.add('changing');
      transition = setTimeout(() => { showingLocal = !showingLocal;render(showingLocal ? local : 'en');word.classList.remove('changing');journey.classList.remove('changing'); },250);
    },9000);
  }
  render(local);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();
