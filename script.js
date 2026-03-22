
// Cursor
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function a(){rx+=(mx-rx)*0.13;ry+=(my-ry)*0.13;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(a);})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='scale(2.5)';curR.style.transform='scale(1.4)';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='scale(1)';curR.style.transform='scale(1)';});
});

// Floating particles
const pc=document.getElementById('particles');
const cols=['#52b788','#40916c','#95d5b2','#2d6a4f','#b7e4c7'];
for(let i=0;i<20;i++){
  const p=document.createElement('div');p.className='pdot';
  const s=2+Math.random()*5;
  p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;bottom:0;background:${cols[Math.floor(Math.random()*cols.length)]};animation-duration:${10+Math.random()*20}s;animation-delay:${Math.random()*20}s;`;
  pc.appendChild(p);
}

// Hamburger
const ham=document.getElementById('hamburger'),mob=document.getElementById('mobileNav'),cls=document.getElementById('closeNav');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open');});
cls.addEventListener('click',()=>closeMobileNav());
function closeMobileNav(){ham.classList.remove('open');mob.classList.remove('open');}

// BOOM
function spawnParticles(wrap){
  const cols=['#52b788','#40916c','#95d5b2','#2d6a4f','#b7e4c7','#d4a017'];
  for(let i=0;i<18;i++){
    const p=document.createElement('div');p.className='particle';
    const angle=Math.random()*360,dist=50+Math.random()*80;
    const tx=`translate(${Math.cos(angle*Math.PI/180)*dist}px,${Math.sin(angle*Math.PI/180)*dist}px)`;
    p.style.cssText=`left:50%;top:50%;background:${cols[Math.floor(Math.random()*cols.length)]};--tx:${tx};animation-delay:${Math.random()*0.1}s;animation-duration:${0.5+Math.random()*0.4}s;width:${4+Math.random()*7}px;height:${4+Math.random()*7}px;`;
    wrap.appendChild(p);setTimeout(()=>p.remove(),900);
  }
}

const revealed={'profilePhoto':false,'profilePhotoM':false};
function hidePhoto(oid,pid,wid){
  const o=document.getElementById(oid),p=document.getElementById(pid),w=document.getElementById(wid);
  spawnParticles(w);p.style.opacity='0';
  setTimeout(()=>{p.classList.remove('revealed');p.style.opacity='';o.classList.remove('gone');o.classList.remove('booming');revealed[pid]=false;},400);
}
function triggerBoom(oid,pid,wid){
  const o=document.getElementById(oid),p=document.getElementById(pid),w=document.getElementById(wid);
  if(!revealed[pid]){spawnParticles(w);o.classList.add('booming');setTimeout(()=>{o.classList.add('gone');p.classList.add('revealed');revealed[pid]=true;},500);}
  else{hidePhoto(oid,pid,wid);}
}
document.getElementById('boomBtn').addEventListener('click',()=>triggerBoom('boomOverlay','profilePhoto','imgWrap'));
document.getElementById('boomBtnM').addEventListener('click',()=>triggerBoom('boomOverlayM','profilePhotoM','imgWrapM'));
document.getElementById('profilePhoto').addEventListener('click',()=>{if(revealed['profilePhoto'])hidePhoto('boomOverlay','profilePhoto','imgWrap');});
document.getElementById('profilePhotoM').addEventListener('click',()=>{if(revealed['profilePhotoM'])hidePhoto('boomOverlayM','profilePhotoM','imgWrapM');});

// Reveal
function check(){document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-60)el.classList.add('visible');});}
check();window.addEventListener('scroll',check);window.addEventListener('load',check);

