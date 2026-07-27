(function () {

  const IS_MOBILE = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const Z0 = /Chrome/.test(navigator.userAgent) ? 0 : 0.01;
  const hero = document.querySelector("#hero");

  // ── NΞP | Wait & Init ──

  /* Scroll to next section */
  document.getElementById('scroll-down-arrow').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

  // ── NΞP | Scroll-triggered parallax ──

  function initScrollTrigger() {
    const layers = [
      { id: "#indoor", y: -300 },
      { id: "#character",  y: 300 },
      { id: "#headline",  y: 300 },
      { id: "#nametag",  y: 150 },
    ];

    layers.forEach(({ id, y }) => {
      gsap.to(id, {
        y,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "center center",
          end:   "bottom top",
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
        end:   "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ── NΞP | Headline SVG draw-on animation ──

  function initHeadline() {
    gsap.set(".hl1 path, .hl2 path, .hl3 path", { opacity: 1 });
    gsap.set(".hl1", { clipPath: "inset(0 0 0 0)" });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" }
    });

    // 1. Script tagline — light, airy slide-up (sets a quiet, elegant tone)
    tl.from(".hl1", {
      delay:1,
      clipPath: "inset(0 100% 0 0)",
      duration: 1.1,
      ease: "power2.inOut"
    }, 0)
    .from(".hl1 path", {
      scale:0,
      yPercent: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.02
    }, "<")

    // 2. CREATIVE — the hero moment: big scale-punch with overshoot
    .from(".hl2 path", {
      yPercent: 140,
      scale: 1.35,
      opacity: 0,
      transformOrigin: "50% 100%",
      duration: 1.15,
      ease: "back.out(1.6)",
      stagger: {
        each: 0.035,
        from: "start"
      }
    }, "-=0.55") // overlaps tail of hl1 for continuous motion

    // 3. DEVELOPER — sharp, confident settle with slight skew for energy
    .from(".hl3 path", {
      yPercent: 100,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.022
    }, "-=0.65")

    // 4. Subtle premium finish — a soft glow pulse on CREATIVE to draw the eye
    .to(".hl2 path", {
      filter: "drop-shadow(0 0 14px rgba(45,212,191,0.55))",
      duration: 0.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.01
    }, "-=0.1");
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

    initScrollTrigger();
    initCharacter();
    initHeadline();

    gsap.fromTo(
      hero,
      { visibility: "visible", opacity: 0 },
      { duration: 0.5, opacity: 1, delay: 0.1}
    );

  }

  wait("loaded", init);

})();
