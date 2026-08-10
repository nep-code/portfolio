(function () {

    // Skill section functionality
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    const logos = gsap.utils.toArray(".Logo");
    const radius = carousel.clientWidth / 1.5;
    const proxy = document.createElement("div");
    const wrap = gsap.utils.wrap(0, 1);
    const drag = 3000;
    let startProgress;

    const spin = gsap.fromTo(
      logos,
      { rotationY: (i) => (i * 360) / logos.length },
      {
        rotationY: "-=360",
        duration: 50,
        ease: "none",
        repeat: -1,
        transformOrigin: `50% 50% ${-radius}px`,
      }
    );

    Draggable.create(proxy, {
      trigger: "#carousel",
      type: "x",
      inertia: true,
      allowNativeTouchScrolling: false,
      dragResistance: 0.1,
      onPress() {
        spin.timeScale(0);
        startProgress = spin.progress();
      },
      onDrag: updateRotation,
      onRelease() {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      },
      onThrowUpdate: updateRotation,
      onThrowComplete() {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      },
    });

    gsap.set("#carousel .Content", { perspective: 1000 });

    function updateRotation() {
      const p = startProgress + (this.startX - this.x) / drag;
      spin.progress(wrap(p));
    }

    const logoState = new WeakMap();
    gsap.ticker.add(() => {
      logos.forEach((el) => {
        const r = gsap.getProperty(el, "rotationY") % 360;
        const n = (r + 360) % 360;
        const isBack = n > 80 && n < 280;
        if (logoState.get(el) !== isBack) {
          logoState.set(el, isBack);
          gsap.to(el, {
            duration: 0.2,
            opacity: isBack ? 0.25 : 1,
            filter: isBack ? "blur(4px)" : "blur(0px)",
            pointerEvents: isBack ? "none" : "auto",
          });
        }
      });
    });
    

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

  console.log("NΞP | skills initialized");

  gsap.fromTo("#carousel", { duration:1, opacity:0}, {opacity:1});

}

init();

})();