// ================================
// HOME STYLE FURNITURE MART
// Main JavaScript
// ================================


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

}


// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("navbar");

function handleNavbar() {

  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", handleNavbar);
handleNavbar();


// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ESC KEY — CLOSE MOBILE MENU
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    if (navLinks) {
      navLinks.classList.remove("open");
    }

  }

});


// SMOOTH INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function(event) {

    const targetId = this.getAttribute("href");

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


// IMAGE ERROR HANDLING
// If an image filename is wrong, keep the layout clean
// instead of showing a broken-image icon.

document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", () => {

    img.style.opacity = "0";

  });

});


// REDUCED MOTION CHECK
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {

  document.documentElement.style.scrollBehavior = "auto";

}
