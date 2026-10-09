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
const wedding=new Date('2026-11-28T00:00:00-04:00').getTime();
function countdown(){const remaining=Math.max(0,wedding-Date.now());const values=[Math.floor(remaining/86400000),Math.floor(remaining/3600000)%24,Math.floor(remaining/60000)%60,Math.floor(remaining/1000)%60];$('countdown').innerHTML=values.map((v,i)=>`<div><strong>${String(v).padStart(2,'0')}</strong><span>${['DÍAS','HORAS','MINUTOS','SEGUNDOS'][i]}</span></div>`).join('');if(!remaining)document.querySelector('.countdown-note').textContent='Nuestra fecha, un recuerdo para siempre.';}
countdown();setInterval(countdown,1000);
for(let i=0;i<36;i++){const day=document.createElement('span');if(i>=6){day.textContent=i-5;if(i===33){day.className='selected';day.setAttribute('aria-label','28 de noviembre: nuestra boda');}}else day.setAttribute('aria-hidden','true');$('calendar-days').append(day);}
document.querySelectorAll('.location-pending').forEach(button=>button.addEventListener('click',()=>{const event=button.dataset.event;$('location-message').textContent=`El lugar y el horario de la ${event} son ejemplos para esta invitación. Pronto compartiremos los datos definitivos. Puedes consultar con nosotros por WhatsApp.`;$('ask-location').href='https://wa.me/59161612739?text='+encodeURIComponent(`Hola Dana y Arturo, quisiera conocer la ubicación y el horario confirmados de la ${event} de su boda.`);$('location-dialog').showModal();}));
$('close-dialog').addEventListener('click',()=>$('location-dialog').close());$('location-dialog').addEventListener('click',event=>{if(event.target===$('location-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
function publicURL(){if(location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname)){$('share-status').textContent='El enlace para compartir estará disponible cuando se publique la invitación.';return null;}return location.href.split('#')[0];}
async function copyLink(){const url=publicURL();if(!url)return;try{await navigator.clipboard.writeText(url);$('share-status').textContent='Enlace copiado. Ya puedes compartir nuestra invitación.';}catch{$('share-status').textContent='Copia el enlace de la barra del navegador para compartirlo.';}}
$('copy-link').addEventListener('click',copyLink);$('share').addEventListener('click',async()=>{const url=publicURL();if(!url)return;if(navigator.share){try{await navigator.share({title:'Dana & Arturo · Nuestra boda',text:'Con mucho amor, te invitamos a celebrar nuestra boda el 28 de noviembre de 2026.',url});}catch(e){if(e.name!=='AbortError')await copyLink();}}else await copyLink();});
