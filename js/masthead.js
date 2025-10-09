import { is_mobile, z0 } from "./global.js";

export function MASTHEAD() {
  const masthead = document.querySelector("#masthead");

  GRADIENTCOLOR();
  CHARACTER();
  STARS();
  SHOOTING_STAR();
  AUTOSCALE();
  if (!is_mobile) SCROLL_TRIGGER();

  gsap.fromTo(
    masthead,
    { visibility: "visible", opacity: 0 },
    { duration: 0.5, opacity: 1, delay: 0.1, onStart: HEADLINE }
  );

  if (is_mobile) { 
    window.addEventListener("orientationchange", () => { 
      // Cancel any pending resize operations 
      clearTimeout(resizeTimer); 
      if ('visualViewport' in window) { 
        // Use the visualViewport resize event to detect when rotation actually finishes 
        const onViewportChange = () => { 
          AUTOSCALE(); 
          window.visualViewport.removeEventListener('resize', onViewportChange); }; 
          window.visualViewport.addEventListener('resize', onViewportChange); 
      } else { 
        // Fallback: debounce resize to wait for reflow to settle 
        let resizeCount = 0; const handleResize = () => { 
          resizeCount++; 
          if (resizeCount > 2) { 
            window.removeEventListener('resize', handleResize); 
            AUTOSCALE(); 
          }
        }; window.addEventListener('resize', handleResize); 
        // Safety fallback (covers rare cases) 
        resizeTimer = setTimeout(AUTOSCALE, 200);
      } 
    }); 
  } else { 
    // Non-mobile: just listen for window resizes 
    window.addEventListener("resize", AUTOSCALE); 
  }

  function SCROLL_TRIGGER() {
    const elements = [
      { id: "#background", y: 300 },
      { id: "#outdoor", y: 200 },
      { id: "#character", y: 100 },
    ];

    elements.forEach(({ id, y }) => {
      gsap.to(id, {
        y,
        ease: "none",
        scrollTrigger: {
          trigger: masthead,
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

  function GRADIENTCOLOR() {
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
    let i = 0;

    const vary = (hex) => {
      const h = hex.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      const rand = (v) =>
        Math.min(255, Math.max(0, v + Math.floor((Math.random() - 0.5) * 40)));
      return `rgb(${rand(r)}, ${rand(g)}, ${rand(b)})`;
    };

    (function animate() {
      const [c1, c2] = colorPairs[i];
      gsap.to(el, {
        background: `linear-gradient(45deg, ${vary(c1)}, ${vary(c2)})`,
        backgroundSize: "400% 400%",
        duration: 3 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => {
          i = (i + 1) % colorPairs.length;
          animate();
        },
      });
    })();
  }

  function CHARACTER() {
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

  function STARS() {
    const container = document.getElementById("stars-container");
    if (!container) return;

    const starCount = 200;
    container.style.position = "relative";

    const w = container.clientWidth;
    const h = container.clientHeight;

    for (let i = 0; i < starCount; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const size = Math.random() * 1.5 + 0.5;
      Object.assign(s.style, {
        width: `${size}px`,
        height: `${size}px`,
        position: "absolute",
        top: `${Math.random() * h}px`,
        left: `${Math.random() * w}px`,
      });
      container.appendChild(s);
      gsap.to(s, {
        opacity: 0.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 3,
      });
    }
  }

  function SHOOTING_STAR() {
    const svg = document.querySelector("#shootingstar");
    if (!svg) return;

    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const r = gsap.utils.random(1, 2);
    star.setAttribute("r", r);
    star.setAttribute("fill", "white");
    star.setAttribute("opacity", "0.9");
    svg.appendChild(star);

    const W = masthead.offsetWidth;
    const H = masthead.offsetHeight;
    const x = gsap.utils.random(W * 0.3, W + 100);
    const y = gsap.utils.random(0, H * 0.3);

    gsap.set(star, { cx: x, cy: y });
    gsap.to(star, {
      cx: x - gsap.utils.random(400, 800),
      cy: y + gsap.utils.random(200, 400),
      opacity: 0,
      duration: gsap.utils.random(0.8, 1.5),
      ease: "power2.out",
      onComplete: () => star.remove(),
    });

    gsap.delayedCall(gsap.utils.random(3, 10), SHOOTING_STAR);
  }

  function HEADLINE() {
    let tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: "h1",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.from(".headline path", { duration: 1, x: -20, y: -27, z: z0, scale: 2, stagger: 0.1 })
      .to(".headline path", { duration: 2, strokeDashoffset: 0, stagger: 0.1 }, "<")
      .to(".headline path", { duration: 1, delay: 0.5, fill: "white", stagger: 0.1 }, "<")
      .to("#headline", { duration: 1, filter: "drop-shadow(0px 2px 2px #000)" }, "-=0.5")
      .fromTo("#headline h2", { opacity: 0, y: -15 }, { duration: 0.5, y: 0, opacity: 1 }, "-=2");
  }

  function AUTOSCALE() {
    const screenH = window.innerHeight;
    const screenW = window.innerWidth;

    const headline = document.querySelector("#headline");
    const char = document.querySelector("#character");
    const bg = document.querySelector("#background");

    if (!headline || !char || !bg) return;

    masthead.style.height = screenH + "px";

    const charH = char.offsetHeight;
    const bgW = bg.offsetWidth;
    const bgH = bg.offsetHeight;

    gsap.to(char, {
      scale: screenH / charH,
      transformOrigin: "center bottom",
    });

    const coverScale = Math.max(screenW / bgW, screenH / bgH);
    gsap.to(bg, {
      x: 0,
      y: 0,
      scale: coverScale + 0.001,
      transformOrigin: "center center",
    });

    if (screenW > screenH) {
      gsap.set(headline, {
        y: screenH >= 400 ? "20%" : "10%",
        scale:
          screenH <= 400 && screenW >= 1000
            ? screenH / 500
            : screenW >= screenH * 2 && screenW <= 1000
            ? screenW / 1200
            : screenW <= 1000
            ? screenW / 1100
            : 1,
      });
    } else {
      gsap.set(headline, {
        y: screenH * 2 >= screenW ? "30%" : "10%",
        scale: screenW <= 600 ? screenW / 600 : 1,
      });
    }

    ScrollTrigger.refresh();
  }
}
