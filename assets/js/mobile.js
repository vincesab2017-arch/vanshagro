document.addEventListener("DOMContentLoaded", () => {

    console.log("MAIN JS LOADED");

    /* ===============================
       HERO SLIDER
    ================================ */
    const slides = document.querySelectorAll(".hero-slider .slide");
    const dots = document.querySelectorAll(".hero-dots .dot");

    if (!slides.length) {
        console.warn("No hero slides found");
        return;
    }

    let currentSlide = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            if (dots[i]) {
                dots[i].classList.toggle("active", i === index);
            }
        });
        currentSlide = index;
    }

    function startSlider() {
        clearInterval(interval);
        interval = setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 6000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlider();
        });
    });

    showSlide(0);
    startSlider();

    /* ===============================
       SCROLL REVEAL
    ================================ */
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    reveals.forEach(el => observer.observe(el));

});
document.addEventListener("DOMContentLoaded", () => {

    const floating = document.querySelector(".reveal-float");

    if (!floating) return;

    /* Reveal */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(floating);

    /* Parallax */
    window.addEventListener("scroll", () => {
        if (!floating.classList.contains("visible")) return;

        const offset = window.scrollY * 0.04;
        floating.style.transform = `translateY(calc(-50% + ${offset}px))`;
    });

});
