(() => {
 const button = document.querySelector('#playlist-toggle');
 const player = document.querySelector('#spotify-player');
 const tracks = document.querySelector('#playlist-tracks');
 button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  if (!expanded && !player.firstElementChild) {
   const iframe = document.createElement('iframe');
   iframe.src = 'https://open.spotify.com/embed/playlist/21MAun2uYN8GzSoSbITVtu?theme=0';
   iframe.title = 'BKK to BLR, Himanshu’s Spotify playlist';
   iframe.width = '100%';iframe.height = '352';
   iframe.allow = 'encrypted-media; fullscreen; picture-in-picture';
   iframe.loading = 'lazy';
   player.append(iframe);
  }
  if (expanded) player.replaceChildren();
  player.hidden = expanded;tracks.hidden = !expanded;
  button.setAttribute('aria-expanded', String(!expanded));
  button.textContent = expanded ? '▷ Open player' : '← Show tracks';
 });
})();
