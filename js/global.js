export const is_mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
export const z0 = /Chrome/.test(navigator.userAgent) ? 0 : 0.01;
export function GLOBAL() {

  NAVIGATION();
  ANCHOR();
  LENIS();
  GSAP();
  
  function NAVIGATION() {
    const nav = document.querySelector("#nav");
    const navInner = nav.querySelector(".nav-inner");
    const indicator = document.querySelector("#nav-indicator");
    const links = Array.from(document.querySelectorAll("#nav a"));
    const toggle = document.querySelector("#nav-toggle");
    let activeLink = null;

    // initialize indicator to an .active link (or first link)
    const initial = document.querySelector("#nav a.active") || links[0];
    if (initial) {
      activeLink = initial;
      // position immediately (no spring)
      moveIndicator(activeLink, true);
    }

    // event binding
    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => moveIndicator(e.currentTarget));
      link.addEventListener("mouseleave", () => {
        if (activeLink) moveIndicator(activeLink);
        else gsap.to(indicator, { width: 0, duration: 0.28, ease: "power3.out" });
      });

      link.addEventListener("click", (e) => {
        // set active state
        links.forEach(l => l.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeLink = e.currentTarget;
        moveIndicator(activeLink, true);

        // collapse mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          // allow CSS transition then re-position
          setTimeout(() => moveIndicator(activeLink, true), 160);
        }
      });
    });

    // debounce resize to avoid over-updating
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        moveIndicator(activeLink, true);
      }, 120);
    });

    // toggle for mobile
    if (toggle) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        // reposition after toggle transition
        setTimeout(() => moveIndicator(activeLink, true), 220);
      });
    }

    /**
     * Move the underline indicator under `target`
     * @param {Element} target - anchor element
     * @param {boolean} snap - true => faster, non-spring animation
     */
    function moveIndicator(target, snap = false) {
      if (!target || !indicator || !navInner) return;

      // If nav is stacked vertically (mobile), optionally hide indicator
      const navInnerStyle = window.getComputedStyle(navInner);
      if (navInnerStyle.flexDirection === "column" || window.innerWidth <= 768) {
        gsap.to(indicator, { opacity: 0, duration: 0.12 });
        return;
      } else {
        gsap.to(indicator, { opacity: 1, duration: 0.08 });
      }

      // compute position relative to navInner (accounts for padding & scroll)
      const linkRect = target.getBoundingClientRect();
      const innerRect = navInner.getBoundingClientRect();
      const scrollLeft = navInner.scrollLeft || 0;
      const left = linkRect.left - innerRect.left + scrollLeft;
      const width = Math.round(linkRect.width);

      // animate left & width (use px values)
      gsap.to(indicator, {
        left: `${left}px`,
        width: `${width}px`,
        duration: snap ? 0.32 : 0.7,
        ease: snap ? "power3.out" : "elastic.out(1, 0.6)"
      });
    }

    // Public API optional
    return { moveIndicator, setActive: (el) => { activeLink = el; moveIndicator(el, true); } };

    // inside toggle click
    toggle.addEventListener("click", () => {
      const isActive = nav.classList.toggle("active");
      
      if (isActive) {
        gsap.fromTo("#nav-inner", { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" });
        gsap.fromTo("#nav-inner a", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" });
      } else {
        gsap.to("#nav-inner", { height: 0, opacity: 0, duration: 0.35, ease: "power2.in" });
      }
    });
  }

  function GSAP() {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    CSSPlugin.defaultTransformPerspective = 1000;
  }

  function LENIS() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;
  }

  function ANCHOR() {
    $("nav a, #cta-amazon, #cta-down, #cta-top").click(function (e) {
      if ($(this).hasClass("no-scroll")) return;
      e.preventDefault();

      let id = $(this).attr("id");
      let href = $(this).attr("href");
      let scrollY = $(href).offset().top;
      let scrollPos = document.documentElement.scrollTop;
      let duration = Math.abs(scrollPos - scrollY) / 2;

      switch (id) {
        case "cta-amazon":
          scrollY -= 20;
          break;
        case "cta-down":
          href = "#about";
          duration = 500;
          break;
        case "cta-top":
          scrollY = 0;
          duration = 500;
          break;
      }

      if (duration >= 1000) duration /= 2;
      $("html, body").animate({ scrollTop: scrollY + "px" }, duration);
    });
  }
}