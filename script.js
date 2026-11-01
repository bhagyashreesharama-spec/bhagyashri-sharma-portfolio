// Enable animations only after JavaScript is available.
// Without JavaScript, all website content remains visible.
document.documentElement.classList.add("js-motion");

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
    });
  });
}

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

// HERO CHANGING WORDS
const changingWord = document.getElementById("changing-word");

const roles = [
  "DIGITAL EXPERIENCES",
  "CREATIVE WEBSITES",
  "AI-POWERED CONTENT",
  "VISUAL STORIES",
  "NEW POSSIBILITIES"
];

let roleIndex = 0;
let letterIndex = roles[0].length;
let deleting = true;

function animateRole() {
  if (!changingWord) return;

  const currentRole = roles[roleIndex];

  if (deleting) {
    letterIndex--;
    changingWord.textContent = currentRole.substring(0, letterIndex);

    if (letterIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(animateRole, 300);
      return;
    }
  } else {
    const nextRole = roles[roleIndex];
    letterIndex++;
    changingWord.textContent = nextRole.substring(0, letterIndex);

    if (letterIndex >= nextRole.length) {
      deleting = true;
      setTimeout(animateRole, 1500);
      return;
    }
  }

  setTimeout(animateRole, deleting ? 45 : 75);
}

setTimeout(animateRole, 1800);

// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const context = canvas ? canvas.getContext("2d") : null;

let particles = [];
let canvasWidth = 0;
let canvasHeight = 0;

function createParticles() {
  if (!canvas || !context) return;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * pixelRatio;
  canvas.height = canvasHeight * pixelRatio;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const total = Math.min(75, Math.floor(canvasWidth / 17));

  particles = [];

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.15
    });
  }
}

function drawParticles() {
  if (!canvas || !context) return;

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvasWidth) {
      particle.speedX *= -1;
    }

    if (particle.y < 0 || particle.y > canvasHeight) {
      particle.speedY *= -1;
    }

    context.beginPath();
    context.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    context.fillStyle = `rgba(190,145,255,${particle.opacity})`;
    context.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];

      const distance = Math.hypot(
        particle.x - other.x,
        particle.y - other.y
      );

      if (distance < 100) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle =
          `rgba(170,115,235,${(1 - distance / 100) * 0.13})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

if (canvas && context) {
  createParticles();
  drawParticles();

  window.addEventListener("resize", createParticles);
}

// CURSOR LIGHT EFFECT
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", event => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
  });
}

// PROJECT CARD TILT
const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover) {
  document.querySelectorAll(".project-card, .skill-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
