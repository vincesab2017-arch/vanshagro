document.addEventListener("DOMContentLoaded", () => {

    console.log("MAIN JS LOADED");

    /* =====================================================
       MOBILE NAVIGATION
    ==================================================== */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {
        const navLinks = nav.querySelectorAll("a");

        function openMenu() {
            toggle.classList.add("open");
            nav.classList.add("active");
            document.body.classList.add("nav-open");
            toggle.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            toggle.classList.remove("open");
            nav.classList.remove("active");
            document.body.classList.remove("nav-open");
            toggle.setAttribute("aria-expanded", "false");
        }

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.contains("active") ? closeMenu() : openMenu();
        });

        document.addEventListener("click", (e) => {
            if (
                nav.classList.contains("active") &&
                !nav.contains(e.target) &&
                !toggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    /* =====================================================
       HERO SLIDER (index.html only)
    ==================================================== */
    const slides = document.querySelectorAll(".hero-slider .slide");
    if (slides.length) {
        const dots = document.querySelectorAll(".hero-dots .dot");
        let currentSlide = 0;
        let interval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
                if (dots[i]) dots[i].classList.toggle("active", i === index);
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
    }

    /* =====================================================
       SCROLL REVEAL
    ==================================================== */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        reveals.forEach(el => observer.observe(el));
    }

    /* =====================================================
       FLOATING PARALLAX
    ==================================================== */
    const floating = document.querySelector(".reveal-float");
    if (floating) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.3 });

        observer.observe(floating);

        window.addEventListener("scroll", () => {
            if (!floating.classList.contains("visible")) return;
            floating.style.transform =
                `translateY(calc(-50% + ${window.scrollY * 0.04}px))`;
        });
    }

    /* =====================================================
       PRODUCTS PAGE LOGIC (products.html only)
    ==================================================== */
    const products = [...document.querySelectorAll('.product-card')];
    const loadMoreBtn = document.getElementById('loadMoreProducts');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('productSearch');

    if (products.length && loadMoreBtn && filterButtons.length && searchInput) {
        let visibleCount = 0;
        let activeFilter = 'all';
        let searchTerm = '';

        function isMobile() {
            return window.innerWidth <= 768;
        }

        function baseVisibleCount() {
            return isMobile() ? 6 : 16;
        }

        function loadIncrement() {
            return isMobile() ? 6 : 8;
        }

        function filteredProducts() {
            return products.filter(p => {
                const matchesFilter =
                    activeFilter === 'all' || p.dataset.category === activeFilter;
                const matchesSearch =
                    p.dataset.name.toLowerCase().includes(searchTerm);
                return matchesFilter && matchesSearch;
            });
        }

        function renderProducts() {
            const visibleProducts = filteredProducts();
            products.forEach(p => p.classList.add('hidden'));
            visibleProducts.slice(0, visibleCount).forEach(p => {
                p.classList.remove('hidden');
                p.style.animation = 'none';
                p.offsetHeight; // force reflow
                p.style.animation = '';
            });

            loadMoreBtn.style.display =
                visibleCount < visibleProducts.length ? 'inline-block' : 'none';
        }

        // FILTER BUTTONS
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                visibleCount = baseVisibleCount();
                renderProducts();
            });
        });

        // SEARCH
        searchInput.addEventListener('input', e => {
            searchTerm = e.target.value.toLowerCase();
            visibleCount = baseVisibleCount();
            renderProducts();
        });

        // LOAD MORE
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += loadIncrement();
            renderProducts();
        });

        // RESIZE
        window.addEventListener('resize', () => {
            visibleCount = baseVisibleCount();
            renderProducts();
        });

        // INIT
        visibleCount = baseVisibleCount();
        renderProducts();

        // WHATSAPP QUOTE BUTTON
        const whatsappNumber = "+256781898546";
        document.querySelectorAll('.quote-btn').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.product-card');
                const productName = card.dataset.name;
                const productSize = card.dataset.size;

                const message = `
Hello Alokah Ventures,

I would like a quote for the following product:

Product: ${productName}
Specification / Size: ${productSize}

Kindly advise on price and availability.
                `.trim();

                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
            });
        });
    }

});
