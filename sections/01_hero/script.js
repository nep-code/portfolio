(function () {

  const hero = document.querySelector("#hero");

  // ── NΞP | Wait & Init ──

  /* Scroll to next section */
  function initScrollArrow() {
    const arrow = document.getElementById('scroll-down-arrow');
    const about = document.getElementById('about');
    if (!arrow || !about) {
      console.warn("NΞP | scroll-down-arrow or about section not found");
      return;
    }
    arrow.addEventListener('click', () => {
      about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── NΞP | Scroll-triggered parallax ──

  function initScrollTrigger() {
    if (!hero) {
      console.warn("NΞP | #hero not found, skipping scroll trigger");
      return;
    }

    const layers = [
      { id: "#indoor", y: -300 },
      { id: "#character", y: 300 },
      { id: "#headline", y: 300 },
      { id: "#nametag", y: 100 },
    ];

    layers.forEach(({ id, y }) => {
      gsap.to(id, {
        y,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    gsap.to("#cta-down", {
      pointerEvents: "none",
      y: 100,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#cta-down",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ── NΞP | Headline SVG draw-on animation ──

  function initHeadline() {

    gsap.set(".hl1 path, .hl2 path, .hl3 path", {
      opacity: 1
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out"
      }
    });

    tl
    .from(".hl1", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.4,
      ease: "expo.inOut"
    }, 0)

    .from(".hl1 path", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.04
    }, "<0.25")

    .from(".hl2 path", {
      y: 40,
      scale: 1.15,
      opacity: 0,
      transformOrigin: "50% 100%",
      duration: 1,
      ease: "back.out(1.2)",
      stagger: 0.035
    }, "-=1")

    .from(".hl3", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1,
      ease: "expo.inOut"
    }, "-=1")

    .from(".hl3 path", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.04
    }, "<0.25");
  }

  // ── NΞP | Character idle animations ──

  function initCharacter() {
    const randomMotion = (target, vars) => {
      gsap.to(target, {
        ...vars,
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
        onComplete: () => randomMotion(target, vars),
      });
    };

    randomMotion("#nep", {
      transformOrigin: "50% 100%",
      x: () => gsap.utils.random(-1.5, 1.5),
      y: () => gsap.utils.random(0, 2),
      rotation: () => gsap.utils.random(-0.5, 0.5),
    });

    randomMotion("#hand-left", {
      transformOrigin: "89.7% 44.0%",
      rotation: () => gsap.utils.random(0, 2),
    });

    randomMotion("#hand-right", {
      transformOrigin: "10% 74.5%",
      x: () => gsap.utils.random(-2, 1.5),
      y: () => gsap.utils.random(-2, 1),
      rotation: () => gsap.utils.random(-1, 1),
    });
  }

  function wait(className, callback) {
    if (document.body.classList.contains(className)) {
      callback();
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains(className)) {
        observer.disconnect();
        callback();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function init() {
    console.log("NΞP | hero initialized");

    initScrollArrow();
    initScrollTrigger();
    initCharacter();
    initHeadline();

    if (hero) {
      gsap.fromTo(
        hero,
        { visibility: "visible", opacity: 0 },
        { duration: 0.5, opacity: 1, delay: 0.1 }
      );
    }
  }

init();

})();