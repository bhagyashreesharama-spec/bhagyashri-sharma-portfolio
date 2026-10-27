
/* =========================================
   BHAGYASHRI SHARMA — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. AUTOMATIC FOOTER YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION MENU
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    // Close menu when a navigation link is selected
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 4. TOP SCROLL PROGRESS BAR
  const scrollProgress = document.getElementById("scrollProgress");
  let scrollTicking = false;

  function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    scrollTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollProgress);
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  updateScrollProgress();

  // 5. BACK TO TOP
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. SUBTLE HERO PARALLAX ON DESKTOP
  const heroVisual = document.querySelector("[data-parallax]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (
    heroVisual &&
    window.matchMedia("(min-width: 761px)").matches &&
    !prefersReducedMotion.matches
  ) {
    let pointerTicking = false;
    let pointerX = 0;
    let pointerY = 0;

    document.addEventListener("pointermove", (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 8;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 8;

      if (!pointerTicking) {
        window.requestAnimationFrame(() => {
          heroVisual.style.setProperty("--parallax-x", `${pointerX}px`);
          heroVisual.style.setProperty("--parallax-y", `${pointerY}px`);
          heroVisual.style.transform =
            `translate3d(${pointerX}px, ${pointerY}px, 0)`;

          pointerTicking = false;
        });

        pointerTicking = true;
      }
    });
  }

  // 7. PROJECT CARD TILT ON DESKTOP
  const projectCards = document.querySelectorAll(".project-card");

  if (
    window.matchMedia("(min-width: 1000px)").matches &&
    !prefersReducedMotion.matches
  ) {
    projectCards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 4;
        const rotateX = (0.5 - y) * 4;

        card.style.transform =
          `translateY(-7px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // 8. HIGHLIGHT THE CURRENT SECTION IN NAVIGATION
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navAnchors = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navAnchors.forEach((anchor) => {
              const matches =
                anchor.getAttribute("href") === `#${entry.target.id}`;

              if (matches) {
                anchor.setAttribute("aria-current", "location");
              } else {
                anchor.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 9. KEEP VIDEOS PAUSED UNTIL THE VISITOR PRESSES PLAY
  document.querySelectorAll("video").forEach((video) => {
    video.preload = "metadata";
    video.addEventListener("error", () => {
      console.info(
        "A portfolio video could not load. Check its filename and assets folder."
      );
    });
  });

  console.log("Bhagyashri's portfolio is ready ✨");
});

