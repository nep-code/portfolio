import { is_mobile } from "../global.js";

export function init() {
  AUTOSCALE();

  if(!is_mobile) SCROLL_TRIGGER();

  $('#interactive .interactive a').on('click', function () {
    $('body, #lightbox').addClass('active');
    disableScroll();
  });

  $('#cta-close').on('click', function () {
    $('body, #lightbox').removeClass('active');
    $("#lightbox iframe").attr("src", "about:blank");
    enableScroll();
  });

  // Debounced resize (prevents over-triggering on mobile rotation)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(AUTOSCALE, 150);
  });

  function SCROLL_TRIGGER() {
    gsap.utils.toArray(".interactive").forEach((el, i) => {
        const direction = i % 2 === 0 ? 500 : -500;

        gsap.from(el, {
            x: direction,
            opacity: 0,
            ease: "back.out(0.5)",
            duration:0.5,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "150% 20%",
                scrub: false,
                markers: false,
                toggleActions: "play none none reverse",
            }
        });

    });
  }

  function AUTOSCALE() {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const iframeW = 960;
    const iframeH = 500;
    const iframe = $("#lightbox iframe");

    if (screenW < 960 || screenH < 500) {
      const s = Math.min(screenW / iframeW, screenH / iframeH);
      iframe.css({
        transform: `scale(${s})`,
        width: `${iframeW}px`,
        height: `${iframeH}px`,
      });
    } else {
      iframe.css({
        transform: "scale(1)",
        width: `${iframeW}px`,
        height: `${iframeH}px`,
      });
    }
  }

  function disableScroll() {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }

  function enableScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  }
}
