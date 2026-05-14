(function () {

  const IS_MOBILE = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const Z0 = /Chrome/.test(navigator.userAgent) ? 0 : 0.01;
  const hero = document.querySelector("#hero");

  // ── NΞP | Scroll-triggered parallax ──

  function initScrollTrigger() {
    const layers = [
      { id: "#background", y: 300 },
      { id: "#outdoor",    y: 200 },
      { id: "#character",  y: 100 },
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

  // ── NΞP | Animated gradient background ──

  function initGradient() {
    const el = document.querySelector("#gradient-bg");
    if (!el) return;

    const colorPairs = [
      ["#ff00ff", "#40e0d0"],
      ["#1abc9c", "#ff6b6b"],
      ["#6a0dad", "#ffd700"],
      ["#3498db", "#e67e22"],
      ["#d81b60", "#00bcd4"],
      ["#808000", "#e97451"],
      ["#9b59b6", "#2ecc71"],
    ];

    let index = 0;

    const vary = (hex) => {
      const h = hex.replace("#", "");
      const [r, g, b] = [0, 2, 4].map(o => parseInt(h.substring(o, o + 2), 16));
      const rand = v => Math.min(255, Math.max(0, v + Math.floor((Math.random() - 0.5) * 40)));
      return `rgb(${rand(r)}, ${rand(g)}, ${rand(b)})`;
    };

    (function animate() {
      const [c1, c2] = colorPairs[index];
      gsap.to(el, {
        background: `linear-gradient(45deg, ${vary(c1)}, ${vary(c2)})`,
        backgroundSize: "400% 400%",
        duration: 3 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => {
          index = (index + 1) % colorPairs.length;
          animate();
        },
      });
    })();
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
      transformOrigin: "76.3% 45.4%",
      rotation: () => gsap.utils.random(0, 2),
    });

    randomMotion("#hand-right", {
      transformOrigin: "10% 72%",
      x: () => gsap.utils.random(-2, 1.5),
      y: () => gsap.utils.random(-2, 1),
      rotation: () => gsap.utils.random(-1, 1),
    });
  }

  // ── NΞP | Star field ──

  function initStars() {
    const container = document.getElementById("stars-container");
    if (!container) return;

    container.querySelectorAll(".star").forEach(s => s.remove());

    const w = container.clientWidth;
    const h = container.clientHeight;

    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 1.5 + 0.5;
      Object.assign(star.style, {
        width:    `${size}px`,
        height:   `${size}px`,
        position: "absolute",
        top:      `${Math.random() * h}px`,
        left:     `${Math.random() * w}px`,
      });
      container.appendChild(star);
      gsap.to(star, {
        opacity:  0.2,
        duration: 1.5,
        repeat:   -1,
        yoyo:     true,
        ease:     "power1.inOut",
        delay:    Math.random() * 3,
      });
    }
  }

  // ── NΞP | Shooting star ──

  function spawnShootingStar() {
    const svg = document.querySelector("#shootingstar");
    if (!svg) return;

    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("r",       gsap.utils.random(1, 2));
    star.setAttribute("fill",    "white");
    star.setAttribute("opacity", "0.9");
    svg.appendChild(star);

    const W = hero.offsetWidth;
    const H = hero.offsetHeight;
    const x = gsap.utils.random(W * 0.3, W + 100);
    const y = gsap.utils.random(0, H * 0.3);

    gsap.set(star, { cx: x, cy: y });
    gsap.to(star, {
      cx:       x - gsap.utils.random(400, 800),
      cy:       y + gsap.utils.random(200, 400),
      opacity:  0,
      duration: gsap.utils.random(0.8, 1.5),
      ease:     "power2.out",
      onComplete: () => star.remove(),
    });

    gsap.delayedCall(gsap.utils.random(3, 10), spawnShootingStar);
  }

  // ── NΞP | Headline SVG draw-on animation ──

  function initHeadline() {
    gsap.timeline({
      defaults: { ease: "power2.inOut" }
    })
    .to(".headline path",  { duration: 2, strokeDashoffset: 0, ease: "none" })
    .to(".headline path",  { duration: 1, delay: 0.5, fill: "white", stagger: 0.05 }, "-=1.5")
    .to("#headline",       { duration: 1, filter: "drop-shadow(0px 2px 2px #000)" }, "-=1")
    .fromTo("#headline h2, #headline h3",
      { opacity: 0, scale: 0.95, z: Z0 },
      { duration: 1, scale: 1,   opacity: 1 },
      "<"
    );
  }

  // ── NΞP | Responsive auto-scale ──

  function autoscale() {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const headline = document.querySelector("#headline");
    const char     = document.querySelector("#character");
    const bg       = document.querySelector("#background");
    if (!headline || !char || !bg) return;

    hero.style.height = `${screenH}px`;

    // Scale character to fill screen height
    gsap.to(char, {
      scale: screenH / char.offsetHeight,
      transformOrigin: "center bottom",
    });

    // Scale background to cover viewport
    const coverScale = Math.max(
      screenW / bg.offsetWidth,
      screenH / bg.offsetHeight
    );

    gsap.to(bg, {
      x: 0,
      y: 0,
      scale: coverScale + 0.001,
      transformOrigin: "center center",
    });

    // Position and scale headline
    const isLandscape  = screenW > screenH;
    const isNarrow     = screenW <= 600;
    const isShort      = screenH <= 400;
    const isUltraWide  = screenW >= screenH * 2;
    const isSmallWidth = screenW <= 1000;

    if (isLandscape) {

      let scale = 1;

      if (isShort && !isSmallWidth) {
        scale = screenH / 500;

      } else if (isUltraWide && isSmallWidth) {
        scale = screenW / 1200;

      } else if (isSmallWidth) {
        scale = screenW / 1100;
      }

      // ── NEW: prevent headline from exceeding 1.5x viewport height ──
      const maxHeadlineWidth = screenH * 1.5;

      // measure scaled width
      const scaledWidth = headline.offsetWidth * scale;

      // reduce scale if too wide
      if (scaledWidth > maxHeadlineWidth) {
        scale *= maxHeadlineWidth / scaledWidth;
      }

      gsap.set(headline, {
        y: screenH >= 400 ? "20%" : "10%",
        scale
      });

    } else {

      gsap.set(headline, {
        y: screenH * 2 >= screenW ? "30%" : "10%",
        scale: screenW <= 600 ? screenW / 600 : 1,
      });

    }

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  // ── NΞP | Resize handling ──

function initResize() {

  let resizeTimer;

  const handleResize = () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      autoscale();

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh(true);
      }

    }, 100);
  };

  // Always listen to resize
  window.addEventListener("resize", handleResize);

  // Mobile orientation support
  if (IS_MOBILE) {
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 150);
    });

    // visualViewport helps iOS/Safari
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
  }
}

  // ── NΞP | Wait & Init ──

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

    initGradient();
    initCharacter();
    initStars();
    spawnShootingStar();
    autoscale();
    initResize();

    if (!IS_MOBILE) initScrollTrigger();

    gsap.fromTo(
      hero,
      { visibility: "visible", opacity: 0 },
      { duration: 0.5, opacity: 1, delay: 0.1, onStart: initHeadline }
    );
  }

  wait("loaded", init);

})();