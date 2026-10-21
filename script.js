
document.addEventListener("DOMContentLoaded", () => {
  // Smooth reveal animations
  const revealElements = document.querySelectorAll(
    "section, .card, .project-card, .video-card, .brand-card, .skill-card"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
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

  revealElements.forEach((element) => observer.observe(element));

  // Scroll progress bar
  const updateScrollProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    const bar = document.querySelector(
      "#progress, .scroll-progress, .progress-bar"
    );

    if (bar) {
      bar.style.width = `${progress}%`;
    }
  };

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();

  // Navbar background on scroll
  const navbar = document.querySelector(
    "nav, .navbar, .site-nav, header"
  );

  const updateNavbar = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  };

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();

  // Mobile navigation
  const menuButton = document.querySelector(
    ".menu-toggle, .hamburger, [data-menu-toggle]"
  );

  const navLinks = document.querySelector(
    ".nav-links, .navbar-links, nav ul"
  );

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.classList.toggle("active", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active navigation link while scrolling
  const sections = document.querySelectorAll("main section[id], section[id]");
  const links = document.querySelectorAll(
    'nav a[href^="#"], .nav-links a[href^="#"]'
  );

  if (sections.length && links.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Gentle mouse-follow glow
  document.querySelectorAll(
    ".card, .project-card, .video-card, .brand-card, .skill-card"
  ).forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      card.style.setProperty(
        "--mouse-x",
        `${event.clientX - rect.left}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${event.clientY - rect.top}px`
      );
    });
  });

  // Copy email button
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const email =
        button.dataset.copyEmail || "pawversecollective@gmail.com";

      try {
        await navigator.clipboard.writeText(email);

        const originalText = button.textContent;
        button.textContent = "Email Copied! ✓";

        setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // Current year
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Hero parallax effect
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(
    ".hero-content, .hero-inner"
  );

  if (hero && heroContent) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY < window.innerHeight) {
          heroContent.style.transform =
            `translateY(${window.scrollY * 0.12}px)`;
        }
      },
      { passive: true }
    );
  }

  // Image fallback if a portfolio image is missing
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("image-missing");
      img.alt = img.alt || "Portfolio image";
    });
  });

  // Footer year fallback
  const footerYear = document.querySelector("#year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  console.log("✨ Bhagyashri's portfolio animations initialized!");
});
