document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(
    ".feature-card, .plan-card"
  );
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // Ripple effect for buttons
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .plan-button, .cta-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    });
  });

  // Lazy loading for images (if any are added later)
  const lazyImages = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window && lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // Enhanced mobile touch feedback
  if ("ontouchstart" in window) {
    const touchElements = document.querySelectorAll(
      ".feature-card, .plan-card"
    );
    touchElements.forEach((element) => {
      element.addEventListener(
        "touchstart",
        function () {
          this.style.transition = "transform 0.1s ease";
          this.style.transform = "scale(0.98)";
        },
        { passive: true }
      );

      element.addEventListener("touchend", function () {
        this.style.transform = "";
      });
    });
  }

  // Simple analytics tracking placeholder
  function trackEvent(eventName, properties = {}) {
    console.log(`Analytics Event: ${eventName}`, properties);
    // Future integration with GA, Mixpanel, etc. can go here.
  }

  // Track all WhatsApp clicks using data-attributes for cleaner HTML
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("WhatsApp Link Clicked", {
        destination: link.href,
      });
    });
  });
});
