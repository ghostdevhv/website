(() => {
 const stops = [
  {title:'Where it began.',place:'IIT Kharagpur · Kharagpur',date:'2013–2018 · Bachelor’s + Master’s, Computer Science & Engineering',copy:'Five years of computer science: learning how systems fit together, from data structures to compilers.',detail:'I was a teaching assistant for Compilers and Data Structures. This is the foundation I carried into building software professionally.',tags:['Computer science','Compilers','Teaching'],name:'College'},
  {title:'Making sense of messy data.',place:'Flipkart · Bengaluru',date:'May–July 2016 · Software Development Intern',copy:'My first industry internship took me into unstructured text: customer queries, emails, and the challenge of finding useful meaning in them.',detail:'I worked with domain-specific chunking grammar, information extraction tools, word2vec embeddings, and hierarchical clustering.',tags:['NLP','Information extraction','Clustering'],name:'Flipkart'},
  {title:'Building for everyday people.',place:'Adobe · India',date:'Intern: May–July 2017 · Full-time: June 2018–January 2021',copy:'I first joined Adobe as an intern, exploring click prediction for sparse bidding keywords. I returned full-time and worked on Acrobat Liquid Mode and Adobe Connect.',detail:'As Senior Member of Technical Staff, I built adaptive PDF reading, improved model precision, automated checkpoint selection to cut manual effort by 66%, and helped ship Connect on iOS.',tags:['Acrobat','Adobe Connect','C++ / Python / React'],name:'Adobe'},
  {title:'Tools for the people who build.',place:'GitHub · India',date:'September 2021–October 2022 · Software Engineer II',copy:'At GitHub, I worked across npm security, accessibility, data exports, and the infrastructure behind development pipelines.',detail:'I built captcha integrations and a GDPR-compliant export pipeline, worked on MFA and JWT rotation, and improved Azure pipeline performance by 50% with custom VMSS agents.',tags:['npm','Platform security','Developer infrastructure'],name:'GitHub'},
  {title:'From infrastructure to intelligence.',place:'Onehouse · India',date:'Joined February 2023 · Former Senior Software Engineer',copy:'I built the infrastructure foundation, helped grow the team, and later moved into AI agents for Spark debugging and incident investigation.',detail:'I built Spark Agent end to end, led the RCA agent initiative, and worked on multi-cloud platforms, Kubernetes orchestration, and workload-aware autoscaling.',tags:['Spark Agent','AI agents','Multi-cloud infrastructure'],name:'Onehouse'},
  {title:'The next stretch of road.',place:'What I’m exploring now',date:'AI agents · Compute infrastructure',copy:'I’m interested in useful AI agents and the compute infrastructure that makes them work.',detail:'Away from the keyboard: music, sunsets, drives, games, good food, and evenings with friends. Always curious. Usually up for a plan.',tags:['Curiosity','Good company','More to build'],name:'Now'}
 ];
 const hero=document.querySelector('#home'), actor=document.querySelector('#traveler'), road=document.querySelector('#journey-road');
 const panel=document.querySelector('#journey-panel'), title=document.querySelector('#stop-title');
 const prev=document.querySelector('#journey-prev'),next=document.querySelector('#journey-next'),close=document.querySelector('#journey-close');
 let index=-1,progress=.95,walkFrame=0,walkVersion=0,hoverTimer;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const positions=[.91,.74,.57,.40,.23,.06];
 const stations=document.querySelector('#road-stations');
 const marks=['IIT KGP','Flipkart','Adobe','GitHub','Onehouse','→'];
 const brands=['college','flipkart','adobe','github','onehouse','now'];
 const assets={flipkart:'/assets/flipkart.png',adobe:'/assets/adobe.svg',github:'/assets/github.svg',onehouse:'/assets/onehouse.png',college:'/assets/kgp.png'};
 const labels=['IIT Kharagpur','Flipkart','Adobe · intern + work','GitHub','Onehouse','Now'];
 const stationButtons=stops.map((stop,i)=>{
   const button=document.createElement('button');button.type='button';button.className='road-station';
   button.dataset.brand=brands[i];
   button.setAttribute('aria-label',`Visit ${stop.name}`);
   const mark=document.createElement('span');mark.className='station-mark';if(assets[brands[i]]){const img=document.createElement('img');img.src=assets[brands[i]];img.alt=marks[i];img.addEventListener('error',()=>{mark.textContent=marks[i];},{once:true});mark.append(img);}else mark.textContent=marks[i];
   button.append(mark);button.addEventListener('click',()=>show(i));
   button.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||index>=0)return;clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>show(i,false),450);});
   button.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));stations.append(button);return button;
 });
 function position(){
  const point=road.getPointAtLength(road.getTotalLength()*progress), matrix=road.getScreenCTM();
  if(!matrix)return;
  const screen=new DOMPoint(point.x,point.y).matrixTransform(matrix),r=hero.getBoundingClientRect();
  stationButtons.forEach((button,i)=>{
    const p=road.getPointAtLength(road.getTotalLength()*positions[i]);
    const q=new DOMPoint(p.x,p.y).matrixTransform(matrix);
    button.style.left=`${Math.max(40,Math.min(r.width-55,q.x-r.left))}px`;
    button.style.top=`${Math.max(100,Math.min(r.height-38,q.y-r.top))}px`;
  });
  actor.style.left=`${Math.max(45,Math.min(r.width-50,screen.x-r.left))}px`;
  actor.style.top=`${Math.max(150,Math.min(r.height-75,screen.y-r.top-50))}px`;
 }
 function anchorPanel(){
  if(index<0||panel.hidden)return;
  const r=hero.getBoundingClientRect(),b=stationButtons[index].getBoundingClientRect();
  const x=b.left+b.width/2-r.left,y=b.top+b.height/2-r.top;
  const w=panel.offsetWidth,h=panel.offsetHeight,pad=16;
  let left=x-w-40,side='left';
  if(left<pad&&x+40+w<r.width-pad){left=x+40;side='right';}
  left=Math.max(pad,Math.min(r.width-w-pad,left));
  const top=Math.max(80,Math.min(r.height-h-pad,y-h*.55));
  panel.style.left=`${left}px`;panel.style.top=`${top}px`;
  panel.style.setProperty('--arrow-y',`${Math.max(24,Math.min(h-24,y-top))}px`);
  panel.style.setProperty('--origin-y',`${Math.max(0,Math.min(h,y-top))}px`);
  panel.dataset.side=side;
 }
 function move(target,arrived=()=>{}){
  cancelAnimationFrame(walkFrame);const version=++walkVersion;
  if(reduced.matches){progress=target;position();actor.classList.remove('walking');arrived();return;}
  const start=progress,begin=performance.now(),duration=Math.max(550,Math.min(2300,Math.abs(target-start)*4000));
  actor.classList.add('walking');
  function step(now){
   if(version!==walkVersion)return;
   const t=Math.min(1,(now-begin)/duration),ease=t*t*(3-2*t);
   progress=start+(target-start)*ease;position();
   if(t<1)walkFrame=requestAnimationFrame(step);else{actor.classList.remove('walking');arrived();}
  }
  walkFrame=requestAnimationFrame(step);
 }
 function show(i,focus=true){
  if(i===index)return;
  index=i;const stop=stops[i];
  panel.classList.remove('arrived');panel.hidden=true;hero.classList.add('journey-active');actor.setAttribute('aria-expanded','true');actor.setAttribute('aria-label',`Continue journey: ${stop.name}`);
  for(const [selector,key]of [['#stop-place','place'],['#stop-title','title'],['#stop-date','date'],['#stop-copy','copy'],['#stop-detail','detail']])document.querySelector(selector).textContent=stop[key];
  prev.disabled=false;prev.textContent='←';prev.setAttribute('aria-label',i===0?'Return to starting position':'Previous stop');next.textContent=i===stops.length-1?'↺':'→';next.setAttribute('aria-label',i===stops.length-1?'Return to starting position':'Next stop');
  stationButtons.forEach((b,n)=>{if(n===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  move(positions[i],()=>{
   panel.hidden=false;anchorPanel();
   requestAnimationFrame(()=>{panel.classList.add('arrived');if(focus)title.focus({preventScroll:true});});
  });
 }
 function exit(){clearTimeout(hoverTimer);panel.classList.remove('arrived');panel.hidden=true;hero.classList.remove('journey-active');actor.setAttribute('aria-expanded','false');actor.setAttribute('aria-label','Explore my journey');index=-1;stationButtons.forEach(b=>b.removeAttribute("aria-current"));move(.95);actor.blur();}
 actor.addEventListener('click',()=>show(index<0?0:Math.min(index+1,stops.length-1)));
 document.addEventListener('click',event=>{
  if(index<0||event.target.closest('#journey-panel'))return;
  exit();event.preventDefault();event.stopPropagation();
 },true);
 prev.addEventListener('click',()=>{if(index===0)exit();else if(index>0)show(index-1);});next.addEventListener('click',()=>{if(index===stops.length-1)exit();else show(index+1);});close.addEventListener('click',exit);
 document.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select,[contenteditable=true]'))return;
  if(e.key==='Escape'&&index>=0){exit();return;}
  if(!['ArrowUp','ArrowDown'].includes(e.key)||e.repeat)return;
  actor.blur();e.preventDefault();
  if(index<0){if(e.key==='ArrowUp')show(0,false);return;}
  if(index===0&&e.key==='ArrowDown'){exit();return;}
  show(Math.max(0,Math.min(stops.length-1,index+(e.key==='ArrowUp'?1:-1))),false);
 });
 // One chapter per trackpad gesture. Small deltas accumulate; momentum cannot skip stops.
 let wheelTotal=0,lastWheel=0,gestureUsed=false,touchY=null;
 hero.addEventListener('wheel',event=>{
   if(event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
   event.preventDefault();
   const now=performance.now();
   if(now-lastWheel>220){wheelTotal=0;gestureUsed=false;}
   lastWheel=now;
   if(gestureUsed)return;
   const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
   if(wheelTotal&&Math.sign(delta)!==Math.sign(wheelTotal))wheelTotal=0;
   wheelTotal+=delta;
   if(Math.abs(wheelTotal)<24)return;
   gestureUsed=true;
   const direction=wheelTotal<0?1:-1;
   if(index<0){if(direction>0)show(0,false);return;}
   if(index===0&&direction<0){exit();return;}
   const target=Math.max(0,Math.min(stops.length-1,index+direction));
   show(target,false);
 },{passive:false});
 hero.addEventListener('touchstart',event=>{if(!event.target.closest('.journey-panel')&&event.touches.length===1)touchY=event.touches[0].clientY;},{passive:true});
 hero.addEventListener('touchend',event=>{if(touchY===null)return;const delta=touchY-event.changedTouches[0].clientY;touchY=null;if(Math.abs(delta)<40)return;if(index===0&&delta>0){exit();return;}if(index<0&&delta>0)return;show(index<0?0:Math.max(0,Math.min(stops.length-1,index+(delta<0?1:-1))),false);},{passive:true});
 window.addEventListener('resize',()=>{position();anchorPanel();});position();
})();
