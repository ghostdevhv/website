(() => {
 const stops = [
  {title:'Where it began.',place:'IIT Kharagpur · Kharagpur',date:'2013–2018 · Bachelor’s + Master’s, Computer Science & Engineering',copy:'Five years of computer science: learning how systems fit together, from data structures to compilers.',detail:'I was a teaching assistant for Compilers and Data Structures. This is the foundation I carried into building software professionally.',tags:['Computer science','Compilers','Teaching'],name:'College'},
  {title:'Making sense of messy data.',place:'Flipkart · Bengaluru',date:'May–July 2016 · Software Development Intern',copy:'My first industry internship took me into unstructured text: customer queries, emails, and the challenge of finding useful meaning in them.',detail:'I worked with domain-specific chunking grammar, information extraction tools, word2vec embeddings, and hierarchical clustering.',tags:['NLP','Information extraction','Clustering'],name:'Flipkart'},
  {title:'An early taste of applied ML.',place:'Adobe · Bengaluru',date:'May–July 2017 · Product Development Intern',copy:'I explored how an algorithmic bidding system could handle keywords with too little historical data.',detail:'The approach grouped sparse keywords using features from richer keywords, then estimated click probability to expand the system’s coverage.',tags:['Machine learning','Prediction','Advertising'],name:'Adobe internship'},
  {title:'Building for everyday people.',place:'Adobe · India',date:'June 2018–January 2021 · Senior Member of Technical Staff',copy:'From Acrobat Liquid Mode to Adobe Connect, my work brought together machine learning, mobile apps, and accessible interfaces.',detail:'I worked on adaptive PDF reading, improved model precision, automated checkpoint selection to reduce manual effort by 66%, and helped ship Connect on iOS.',tags:['Acrobat','Adobe Connect','C++ / Python / React'],name:'Adobe'},
  {title:'Tools for the people who build.',place:'GitHub · India',date:'September 2021–October 2022 · Software Engineer II',copy:'At GitHub, I worked across npm security, accessibility, data exports, and the infrastructure behind development pipelines.',detail:'I built captcha integrations and a GDPR-compliant export pipeline, worked on MFA and JWT rotation, and improved Azure pipeline performance by 50% with custom VMSS agents.',tags:['npm','Platform security','Developer infrastructure'],name:'GitHub'},
  {title:'From infrastructure to intelligence.',place:'Onehouse · India',date:'Joined February 2023 · Former Senior Software Engineer',copy:'I built the infrastructure foundation, helped grow the team, and later moved into AI agents for Spark debugging and incident investigation.',detail:'I built Spark Agent end to end, led the RCA agent initiative, and worked on multi-cloud platforms, Kubernetes orchestration, and workload-aware autoscaling.',tags:['Spark Agent','AI agents','Multi-cloud infrastructure'],name:'Onehouse'},
  {title:'The next stretch of road.',place:'What I’m exploring now',date:'AI agents · Compute infrastructure',copy:'I’m interested in useful AI agents and the compute infrastructure that makes them work.',detail:'Away from the keyboard: house music, sunsets, drives, games, good food, and evenings with friends. Always curious. Usually up for a plan.',tags:['Curiosity','Good company','More to build'],name:'Now'}
 ];
 const hero=document.querySelector('#home'), actor=document.querySelector('#traveler'), road=document.querySelector('#journey-road');
 const panel=document.querySelector('#journey-panel'), title=document.querySelector('#stop-title');
 const prev=document.querySelector('#journey-prev'),next=document.querySelector('#journey-next'),close=document.querySelector('#journey-close');
 const motion=document.querySelector('#motion-toggle');
 let index=-1,progress=.88,frame=0,resetTimer;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const positions=[.82,.69,.56,.43,.31,.19,.08];
 function position(){
  const point=road.getPointAtLength(road.getTotalLength()*progress), matrix=road.getScreenCTM();
  if(!matrix)return;
  const screen=new DOMPoint(point.x,point.y).matrixTransform(matrix),r=hero.getBoundingClientRect();
  actor.style.left=`${Math.max(45,Math.min(r.width-50,screen.x-r.left))}px`;
  actor.style.top=`${Math.max(r.height*.55,Math.min(r.height-105,screen.y-r.top-55))}px`;
 }
 function move(target){
  cancelAnimationFrame(frame);actor.classList.remove('walking');
  if(reduced.matches||motion.getAttribute('aria-pressed')!=='true'){progress=target;position();return;}
  const start=progress,begin=performance.now();actor.classList.add('walking');
  function tick(now){const t=Math.min((now-begin)/1200,1);progress=start+(target-start)*(t*t*(3-2*t));position();if(t<1)frame=requestAnimationFrame(tick);else actor.classList.remove('walking');}
  frame=requestAnimationFrame(tick);
 }
 const dots=document.querySelector('#journey-stops');
 stops.forEach((stop,i)=>{const b=document.createElement('button');b.type='button';b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label',`Go to ${stop.name}`);b.addEventListener('click',()=>show(i));dots.append(b);});
 function show(i){
  clearTimeout(resetTimer);index=i;const stop=stops[i];
  panel.hidden=false;hero.classList.add('journey-active');actor.setAttribute('aria-expanded','true');actor.setAttribute('aria-label',`Continue journey: ${stop.name}`);
  document.querySelector('#stop-count').textContent=`CHAPTER ${i+1} / ${stops.length}`;
  for(const [selector,key]of [['#stop-place','place'],['#stop-title','title'],['#stop-date','date'],['#stop-copy','copy'],['#stop-detail','detail']])document.querySelector(selector).textContent=stop[key];
  const tags=document.querySelector('#stop-tags');tags.replaceChildren(...stop.tags.map(t=>{const el=document.createElement('span');el.textContent=t;return el;}));
  prev.disabled=i===0;next.textContent=i===stops.length-1?'Back to the beginning ↺':'Next stop →';
  [...dots.children].forEach((b,n)=>{if(n===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  move(positions[i]);title.focus({preventScroll:true});
 }
 function exit(){panel.hidden=true;hero.classList.remove('journey-active');actor.setAttribute('aria-expanded','false');actor.setAttribute('aria-label','Walk with me: explore my journey');index=-1;move(.88);actor.focus({preventScroll:true});}
 actor.addEventListener('click',()=>show(index<0?0:Math.min(index+1,stops.length-1)));
 prev.addEventListener('click',()=>{if(index>0)show(index-1);});next.addEventListener('click',()=>{if(index===stops.length-1)exit();else show(index+1);});close.addEventListener('click',exit);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&index>=0)exit();});
 function stopMotion(){if(reduced.matches||motion.getAttribute('aria-pressed')!=='true'){cancelAnimationFrame(frame);actor.classList.remove('walking');progress=index<0?.88:positions[index];position();}}
 reduced.addEventListener('change',stopMotion);new MutationObserver(stopMotion).observe(motion,{attributes:true,attributeFilter:['aria-pressed']});
 window.addEventListener('resize',position);hero.addEventListener('pointermove',position,{passive:true});hero.addEventListener('pointerleave',()=>{resetTimer=setTimeout(position,180);});position();
})();
