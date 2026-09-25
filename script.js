/* HOME STYLE FURNITURE MART — V4 FINAL SCRIPT */

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

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

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
     IMAGE PERFORMANCE
  ========================= */
  const allImages = document.querySelectorAll("img");

  allImages.forEach((image) => {
    /*
      Hero is handled separately below.
      Everything else loads lazily.
    */
    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    image.setAttribute("decoding", "async");

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =========================
     HERO IMAGE
  ========================= */
  const heroImage = document.querySelector(".hero img");

  if (heroImage) {
    heroImage.setAttribute("loading", "eager");
    heroImage.setAttribute("fetchpriority", "high");
    heroImage.setAttribute("decoding", "async");
  }

  /* =========================
     VIEW MORE LINKS
     Separate category pages
  ========================= */

  const viewMoreLinks = document.querySelectorAll(
    ".view-more, [data-view-more]"
  );

  viewMoreLinks.forEach((link) => {
    link.addEventListener("click", () => {
      /*
        Navigation is handled normally by the browser.
        This listener only closes the mobile menu.
      */
      if (nav && menuToggle) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    });
  });

  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        /*
          Keep URL hash updated without jumping.
        */
        if (history.replaceState) {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });

  /* =========================
     RESET MENU ON RESIZE
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000 && nav && menuToggle) {
      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    }
  });

  /* =========================
     JS READY
  ========================= */
  document.documentElement.classList.add("js-ready");
});
