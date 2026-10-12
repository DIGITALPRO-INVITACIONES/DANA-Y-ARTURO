'use strict';
const $ = id => document.getElementById(id);
const music = $('music');
music.volume = .6;
function musicState(){const playing=!music.paused;$('music-toggle').setAttribute('aria-pressed',String(playing));$('music-toggle').setAttribute('aria-label',playing?'Pausar música':'Reproducir música');$('music-toggle').innerHTML=(playing?'Ⅱ':'♫')+' <span>Música</span>';}
music.addEventListener('play',musicState);music.addEventListener('pause',musicState);
$('open').addEventListener('click',()=>{
  $('open').disabled=true;$('invitation').hidden=false;$('controls').hidden=false;
  music.play().catch(musicState);$('cover').classList.add('opening');
  setTimeout(()=>{$('cover').hidden=true;document.body.classList.remove('sealed');window.scrollTo(0,0);document.querySelector('h1').focus({preventScroll:true});},850);
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
});
$('music-toggle').addEventListener('click',()=>{if(music.paused)music.play().catch(musicState);else music.pause();});
for(let n=0;n<40;n++){const star=document.createElement('span');star.className='sparkle';star.textContent=n%3?'✦':'✧';star.style.cssText=`--x:${Math.random()*100}%;--y:${Math.random()*100}%;--size:${8+Math.random()*15}px;--speed:${3+Math.random()*5}s;--delay:-${Math.random()*8}s`;$('sparkles').append(star);}
$('effects-toggle').addEventListener('click',()=>{const off=document.body.classList.toggle('effects-off');$('effects-toggle').setAttribute('aria-pressed',String(!off));$('effects-toggle').setAttribute('aria-label',off?'Activar destellos':'Pausar destellos');});
const wedding=new Date('2026-11-28T17:30:00-04:00').getTime();
function countdown(){const remaining=Math.max(0,wedding-Date.now());const values=[Math.floor(remaining/86400000),Math.floor(remaining/3600000)%24,Math.floor(remaining/60000)%60,Math.floor(remaining/1000)%60];$('countdown').innerHTML=values.map((v,i)=>`<div><strong>${String(v).padStart(2,'0')}</strong><span>${['DÍAS','HORAS','MINUTOS','SEGUNDOS'][i]}</span></div>`).join('');if(!remaining)document.querySelector('.countdown-note').textContent='Nuestra fecha, un recuerdo para siempre.';}
countdown();setInterval(countdown,1000);
for(let i=0;i<36;i++){const day=document.createElement('span');if(i>=6){day.textContent=i-5;if(i===33){day.className='selected';day.setAttribute('aria-label','28 de noviembre: nuestra boda');}}else day.setAttribute('aria-hidden','true');$('calendar-days').append(day);}
function publicURL(){if(location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname)){$('share-status').textContent='El enlace para compartir estará disponible cuando se publique la invitación.';return null;}return location.href.split('#')[0];}
async function copyLink(){const url=publicURL();if(!url)return;try{await navigator.clipboard.writeText(url);$('share-status').textContent='Enlace copiado. Ya puedes compartir nuestra invitación.';}catch{$('share-status').textContent='Copia el enlace de la barra del navegador para compartirlo.';}}
$('copy-link').addEventListener('click',copyLink);$('share').addEventListener('click',async()=>{const url=publicURL();if(!url)return;if(navigator.share){try{await navigator.share({title:'Dana & Arturo · Nuestra boda',text:'Con mucho amor, te invitamos a celebrar nuestra boda el 28 de noviembre de 2026.',url});}catch(e){if(e.name!=='AbortError')await copyLink();}}else await copyLink();});
const photos = [
 {src:'assets/recuerdo-juntos.webp',caption:'El comienzo de nuestro siempre',alt:'Dana y Arturo juntos, en blanco y negro'},
 {src:'assets/recuerdo-pasos.webp',caption:'Cada paso, contigo',alt:'Un recuerdo de los pasos compartidos por Dana y Arturo'},
 {src:'assets/recuerdo-sonrisas.webp',caption:'Los recuerdos que nos unen',alt:'Dana y Arturo juntos al aire libre con mascarillas'}
];
let activePhoto=0;
function showPhoto(index){activePhoto=(index+photos.length)%photos.length;const photo=photos[activePhoto];$('photo-full').src=photo.src;$('photo-full').alt=photo.alt;$('photo-title').textContent=photo.caption;$('photo-count').textContent=`${activePhoto+1} / ${photos.length}`;}
document.querySelectorAll('.photo-open').forEach(button=>button.addEventListener('click',()=>{showPhoto(Number(button.dataset.photo));$('photo-dialog').showModal();}));
$('photo-close').addEventListener('click',()=>$('photo-dialog').close());
$('photo-prev').addEventListener('click',()=>showPhoto(activePhoto-1));
$('photo-next').addEventListener('click',()=>showPhoto(activePhoto+1));
$('photo-dialog').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(activePhoto-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(activePhoto+1);}});
$('photo-dialog').addEventListener('click',event=>{if(event.target===$('photo-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});

