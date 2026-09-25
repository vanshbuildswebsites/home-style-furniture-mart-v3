// ===============================
// HOME STYLE FURNITURE MART — V4
// ===============================


// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu after clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

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
      threshold: 0.08
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


// ===============================
// GALLERY LIGHTBOX
// ===============================

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox
  ? lightbox.querySelector("img")
  : null;

const lightboxClose = document.querySelector(".lightbox-close");

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    const image = item.querySelector("img");
    const fullImage = item.dataset.full;

    if (!fullImage) return;

    lightboxImage.src = fullImage;

    if (image) {
      lightboxImage.alt = image.alt;
    }

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  });
});


// Close lightbox
function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}


// Close when clicking outside the image
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}


// Close with ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});


// ===============================
// IMAGE LAZY LOADING
// ===============================

document.querySelectorAll("img").forEach((image) => {

  // Hero image loads immediately for faster first screen
  if (!image.closest(".hero")) {
    image.loading = "lazy";
  }

  // If an image fails to load
  image.addEventListener("error", () => {
    image.style.background = "#d8d1c5";
    image.style.minHeight = "80px";
  });

});


// ===============================
// PREVENT BROKEN MOBILE MENU
// ===============================

window.addEventListener("resize", () => {

  if (window.innerWidth > 900) {
    if (navLinks) {
      navLinks.classList.remove("open");
    }

    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }

});


// ===============================
// SMOOTH INTERNAL LINKS
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
