/* =====================================================
   HOME STYLE FURNITURE MART
   JAVASCRIPT
===================================================== */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        if (mobileMenu.classList.contains("open")) {

            menuBtn.textContent = "✕";

        } else {

            menuBtn.textContent = "☰";

        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuBtn.textContent = "☰";

        });

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 15px 45px rgba(0,0,0,.12)";

    } else {

        navbar.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.08)";

    }

});


/* =========================
   CLOSE MENU ON ESC
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (mobileMenu) {

            mobileMenu.classList.remove("open");

        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

        }

    }

});
