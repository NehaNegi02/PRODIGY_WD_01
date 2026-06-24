// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('sc', scrollY > 60);
  document.getElementById('top').classList.toggle('show', scrollY > 300);
  document.querySelectorAll('section[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 120)
      document.querySelectorAll('.nl').forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + s.id));
  });
});

// Mobile menu
function toggleMenu() {
  const open = document.getElementById('links').classList.toggle('open');
  document.getElementById('hbi').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => {
  document.getElementById('links').classList.remove('open');
  document.getElementById('hbi').className = 'fa-solid fa-bars';
}));

// Scroll reveal
new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('on')), {threshold:.12})
  .observe && document.querySelectorAll('.reveal').forEach(el =>
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('on')), {threshold:.12}).observe(el));

// Typing badge
const msgs = ['Version 3.0 Live', 'Trusted by 12K teams', 'Ship 10× faster'];
let mi=0,ci=0,del=false;
const badge = document.getElementById('badge');
(function type(){
  const cur = msgs[mi];
  badge.textContent = del ? cur.slice(0,--ci) : cur.slice(0,++ci);
  if(!del && ci===cur.length){del=true;setTimeout(type,1800);return}
  if(del && ci===0){del=false;mi=(mi+1)%msgs.length}
  setTimeout(type, del?45:80);
})();

// Card tilt
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r=c.getBoundingClientRect(), x=((e.clientX-r.left)/r.width-.5)*12, y=((e.clientY-r.top)/r.height-.5)*12;
    c.style.cssText+=`;transform:translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg);transition:none`;
  });
  c.addEventListener('mouseleave', () => { c.style.transform=''; c.style.transition='.3s'; });
});

// Form submit
function send(e) {
  e.preventDefault();
  const btn=document.getElementById('sbtn'), fb=document.getElementById('fb');
  btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled=true;
  setTimeout(()=>{
    btn.innerHTML='<i class="fa-solid fa-check"></i> Sent!';
    fb.textContent='✓ We\'ll reply within 24 hours!';
    e.target.reset();
    setTimeout(()=>{btn.innerHTML='<i class="fa-solid fa-paper-plane"></i> Send Message';btn.disabled=false;fb.textContent=''},4000);
  },1400);
}
