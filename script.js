// MOBILE MENU
const menuBtn=document.getElementById('menuBtn');
const navlinks=document.getElementById('navlinks');

menuBtn.addEventListener('click',()=>{
  navlinks.classList.toggle('open');
});

navlinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    navlinks.classList.remove('open');
  });
});

// CURSOR FOLLOW
const cursor=document.querySelector('.cursor');
const ring=document.querySelector('.cursor-ring');

let mx=innerWidth/2;
let my=innerHeight/2;
let rx=mx;
let ry=my;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;
  my=e.clientY;
  cursor.style.left=mx+'px';
  cursor.style.top=my+'px';
});

function animateRing(){
  rx+=(mx-rx)*.15;
  ry+=(my-ry)*.15;

  ring.style.left=rx+'px';
  ring.style.top=ry+'px';

  requestAnimationFrame(animateRing);
}

animateRing();

// REVEAL ON SCROLL
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>{
  observer.observe(el);
});

// TYPING EFFECT
const words=['.','Creator.','Builder.','Dreamer.','Explorer.'];

let wordIndex=0;
let charIndex=0;
let deleting=false;

const typing=document.getElementById('typing');

function type(){
  const word=words[wordIndex];

  typing.textContent=deleting
    ?word.substring(0,charIndex--)
    :word.substring(0,charIndex++);

  if(!deleting&&charIndex>word.length){
    deleting=true;
    setTimeout(type,1100);
    return;
  }

  if(deleting&&charIndex<0){
    deleting=false;
    wordIndex=(wordIndex+1)%words.length;
    charIndex=0;
  }

  setTimeout(type,deleting?65:110);
}

type();

// PARTICLE FIELD
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');

let particles=[];

function resizeCanvas(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;

  ctx.setTransform(
    devicePixelRatio,0,0,
    devicePixelRatio,0,0
  );

  particles=Array.from({
    length:Math.min(90,Math.floor(innerWidth/14))
  },()=>({
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,
    r:Math.random()*1.8+.3,
    vx:(Math.random()-.5)*.35,
    vy:(Math.random()-.5)*.35,
    a:Math.random()*.6+.15
  }));
}

resizeCanvas();
addEventListener('resize',resizeCanvas);

function drawParticles(){
  ctx.clearRect(0,0,innerWidth,innerHeight);

  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(190,140,255,${p.a})`;
    ctx.fill();
  });

  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i];
      const b=particles[j];
      const d=Math.hypot(a.x-b.x,a.y-b.y);

      if(d<105){
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(165,105,230,${(1-d/105)*.12})`;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();

// SUBTLE SCROLL PARALLAX
let ticking=false;

addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const y=scrollY;
      const heroVisual=document.querySelector('.hero-visual');

      if(heroVisual){
        heroVisual.style.transform=`translateY(${y*.08}px)`;
      }

      ticking=false;
    });

    ticking=true;
  }
},{passive:true});

// CARD TILT ON DESKTOP
if(matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.project,.skill,.brand-card').forEach(card=>{

    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;

      card.style.transform=
        `perspective(800px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave',()=>{
      card.style.transform='';
    });

  });
}
