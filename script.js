/* ===============================
HOME STYLE FURNITURE MART — V4
================================ */

/* ===============================
MOBILE MENU
================================ */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

menuBtn.addEventListener("click", () => {

const isOpen = navLinks.classList.toggle("open");

menuBtn.setAttribute(
  "aria-expanded",
  isOpen ? "true" : "false"
);

menuBtn.setAttribute(
  "aria-label",
  isOpen ? "Close menu" : "Open menu"
);

});

document.querySelectorAll(".nav-links a").forEach((link) => {

link.addEventListener("click", () => {

  navLinks.classList.remove("open");

  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );

  menuBtn.setAttribute(
    "aria-label",
    "Open menu"
  );

});

});

}

/* ===============================
SCROLL REVEAL
================================ */

const revealElements =
document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

const revealObserver =
new IntersectionObserver(
(entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
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

/* ===============================
LIGHTBOX
Works for:

- Products
- Decor
- Seating
- Showroom
- Interior
- Exterior
- Gallery
  ================================ */

const lightbox =
document.querySelector(".lightbox");

const lightboxImage =
lightbox
? lightbox.querySelector("img")
: null;

const lightboxClose =
document.querySelector(".lightbox-close");

const imageButtons =
document.querySelectorAll(
".image-button, .gallery-item"
);

let lastFocusedElement = null;

function openLightbox(fullImage, altText = "") {

if (!lightbox || !lightboxImage || !fullImage) {
return;
}

lastFocusedElement =
document.activeElement;

lightboxImage.src = fullImage;

lightboxImage.alt =
altText || "Furniture image preview";

lightbox.classList.add("open");

lightbox.setAttribute(
"aria-hidden",
"false"
);

document.body.style.overflow = "hidden";

if (lightboxClose) {

setTimeout(() => {
  lightboxClose.focus();
}, 50);

}

}

imageButtons.forEach((button) => {

button.addEventListener("click", () => {

const fullImage =
  button.dataset.full;


if (!fullImage) {
  return;
}


const image =
  button.querySelector("img");


const altText =
  image
    ? image.alt
    : "";


openLightbox(
  fullImage,
  altText
);

});

});

/* ===============================
CLOSE LIGHTBOX
================================ */

function closeLightbox() {

if (!lightbox) {
return;
}

lightbox.classList.remove("open");

lightbox.setAttribute(
"aria-hidden",
"true"
);

document.body.style.overflow = "";

if (lightboxImage) {

setTimeout(() => {

  lightboxImage.src = "";

}, 250);

}

if (
lastFocusedElement &&
typeof lastFocusedElement.focus === "function"
) {

lastFocusedElement.focus();

}

}

if (lightboxClose) {

lightboxClose.addEventListener(
"click",
closeLightbox
);

}

/* ===============================
CLOSE ON BACKDROP
================================ */

if (lightbox) {

lightbox.addEventListener(
"click",
(event) => {

  if (
    event.target === lightbox
  ) {

    closeLightbox();

  }

}

);

}

/* ===============================
ESC KEY
================================ */

document.addEventListener(
"keydown",
(event) => {

if (
  event.key === "Escape" &&
  lightbox &&
  lightbox.classList.contains("open")
) {

  closeLightbox();

}

}
);

/* ===============================
IMAGE LOADING
================================ */

document.querySelectorAll("img").forEach(
(image) => {

/*
  Hero loads immediately.
  Everything else can lazy-load.
*/

if (!image.closest(".hero")) {

  image.loading = "lazy";

}


image.decoding = "async";


/*
  If an image fails,
  keep the layout clean.
*/

image.addEventListener(
  "error",
  () => {

    image.style.background =
      "#d8d1c5";

    image.style.minHeight =
      "80px";

  }
);

}
);

/* ===============================
NAVIGATION RESIZE FIX
================================ */

window.addEventListener(
"resize",
() => {

if (
  window.innerWidth > 1000
) {

  if (navLinks) {

    navLinks.classList.remove(
      "open"
    );

  }


  if (menuBtn) {

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open menu"
    );

  }

}

}
);

/* ===============================
SMOOTH INTERNAL NAVIGATION
================================ */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach((link) => {

link.addEventListener(
  "click",
  (event) => {

    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {

      return;

    }


    const target =
      document.querySelector(
        targetId
      );


    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);

});

/* ===============================
LIGHTBOX IMAGE PRELOAD
================================ */

imageButtons.forEach((button) => {

const fullImage =
button.dataset.full;

if (!fullImage) {
return;
}

/*
Preload only when the user
hovers/focuses the image.
This keeps initial loading light.
*/

const preload = () => {

const image =
  new Image();

image.src =
  fullImage;

};

button.addEventListener(
"mouseenter",
preload,
{ once: true }
);

button.addEventListener(
"focus",
preload,
{ once: true }
);

});

/* ===============================
LIGHTBOX IMAGE ERROR
================================ */

if (lightboxImage) {

lightboxImage.addEventListener(
"error",
() => {

  lightboxImage.alt =
    "Image could not be loaded.";

}

);

}

/* ===============================
PREVENT PAGE JUMP FROM
BUTTON ELEMENTS
================================ */

document
.querySelectorAll(
".image-button, .gallery-item"
)
.forEach((button) => {

button.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === " " ||
      event.key === "Enter"
    ) {

      /*
        Native button behavior is
        already handled by click.
        This keeps keyboard interaction
        accessible without adding
        duplicate actions.
      */

    }

  }
);

});

/* ===============================
INITIAL PAGE STATE
================================ */

document.documentElement.classList.add(
"js-ready"
);
