// ======================================
// BudgetWise - Main JavaScript
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Sticky Navbar
    // -------------------------------

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            nav.style.background = "rgba(7,11,20,.85)";
            nav.style.backdropFilter = "blur(18px)";
            nav.style.borderBottom = "1px solid rgba(255,255,255,.08)";

        } else {

            nav.style.background = "transparent";
            nav.style.backdropFilter = "none";
            nav.style.borderBottom = "none";

        }

    });

    // -------------------------------
    // Smooth Scroll
    // -------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    // -------------------------------
    // Fade Up Animation
    // -------------------------------

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(
        ".feature-card,.algorithm-card,.stat-card,.preview,.cta-box,.section-header"
    ).forEach(item => {

        item.classList.add("fade-up");

        observer.observe(item);

    });

    // -------------------------------
    // Active Navigation
    // -------------------------------

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

});