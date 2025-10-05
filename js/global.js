export const is_mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
export const z0 = /Chrome/.test(navigator.userAgent) ? 0 : 0.01;
export function GLOBAL() {

  ANCHOR();
  LENIS();
  GSAP();

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
    $("header a, #cta-amazon, #cta-down, #cta-top").click(function (e) {
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