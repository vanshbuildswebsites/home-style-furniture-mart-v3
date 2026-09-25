/* HOME STYLE FURNITURE MART — V4 FIXED SCRIPT */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =========================
     MOBILE MENU
  ========================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  const revealItems = document.querySelectorAll(".reveal");

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
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  /* =========================
     LIGHTBOX
     FIXED VERSION
  ========================= */
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox img");
  const lightboxClose = document.querySelector(".lightbox-close");

  const clickableImages = document.querySelectorAll(
    ".image-button, .gallery-item"
  );

  let lastFocusedElement = null;

  function getImageSource(element) {
    if (!element) return null;

    /* First priority: data-full */
    const fullImage = element.getAttribute("data-full");

    if (fullImage && fullImage.trim() !== "") {
      return fullImage.trim();
    }

    /* Fallback: find image inside button */
    const image = element.querySelector("img");

    if (image) {
      return (
        image.getAttribute("src") ||
        image.getAttribute("data-src") ||
        null
      );
    }

    return null;
  }

  function openLightbox(element) {
    if (!lightbox || !lightboxImage) return;

    const source = getImageSource(element);

    if (!source) {
      console.warn("Lightbox image source missing:", element);
      return;
    }

    lastFocusedElement = element;

    /* Reset old image first */
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    /* Set correct image */
    lightboxImage.src = source;

    const thumbnail = element.querySelector("img");

    if (thumbnail && thumbnail.alt) {
      lightboxImage.alt = thumbnail.alt;
    } else {
      lightboxImage.alt = "Home Style Furniture Mart";
    }

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    body.classList.add("lightbox-open");
    body.style.overflow = "hidden";

    /* Focus close button */
    if (lightboxClose) {
      setTimeout(() => {
        lightboxClose.focus();
      }, 50);
    }
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    body.classList.remove("lightbox-open");
    body.style.overflow = "";

    /* Remove image after closing */
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
    }

    /* Return focus */
    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {
      lastFocusedElement.focus();
    }

    lastFocusedElement = null;
  }

  /* Open image */
  clickableImages.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(element);
    });
  });

  /* Close button */
  if (lightboxClose) {
    lightboxClose.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    });
  }

  /* Click outside image closes lightbox */
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* Escape key */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
      closeLightbox();
    }
  });

  /* =========================
     IMAGE PERFORMANCE
  ========================= */
  const allImages = document.querySelectorAll("img");

  allImages.forEach((image) => {
    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    image.setAttribute("decoding", "async");

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* Hero should load immediately */
  const heroImage = document.querySelector(".hero img");

  if (heroImage) {
    heroImage.setAttribute("loading", "eager");
    heroImage.setAttribute("fetchpriority", "high");
  }

  /* =========================
     PRELOAD FULL IMAGES
  ========================= */
  clickableImages.forEach((element) => {
    const source = getImageSource(element);

    if (!source) return;

    element.addEventListener("mouseenter", () => {
      const preload = new Image();
      preload.src = source;
    });

    element.addEventListener("focus", () => {
      const preload = new Image();
      preload.src = source;
    });
  });

  /* =========================
     LIGHTBOX IMAGE ERROR
  ========================= */
  if (lightboxImage) {
    lightboxImage.addEventListener("error", () => {
      console.warn(
        "Could not load lightbox image:",
        lightboxImage.src
      );

      lightboxImage.alt = "Image could not be loaded";
    });
  }

  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =========================
     RESET MENU ON RESIZE
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000 && nav && menuToggle) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });

  /* =========================
     JS READY
  ========================= */
  document.documentElement.classList.add("js-ready");
});
