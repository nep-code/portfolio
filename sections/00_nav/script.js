(function () {

// ── NΞP | Indicator ──

function createIndicator(indicator, navInner) {

  function isMobileLayout() {
    const style = window.getComputedStyle(navInner);
    return style.flexDirection === "column" || window.innerWidth <= 768;
  }

  function move(target, snap = false) {
    if (!target || !indicator || !navInner) return;

    if (isMobileLayout()) {
      gsap.to(indicator, { opacity: 0, duration: 0.12 });
      return;
    }

    gsap.to(indicator, { opacity: 1, duration: 0.08 });

    const linkRect  = target.getBoundingClientRect();
    const innerRect = navInner.getBoundingClientRect();

    gsap.to(indicator, {
      left:     `${linkRect.left - innerRect.left + (navInner.scrollLeft || 0)}px`,
      width:    `${Math.round(linkRect.width)}px`,
      duration: snap ? 0.32 : 0.7,
      ease:     snap ? "power3.out" : "elastic.out(1, 0.6)",
    });
  }

  return { move };
}

// ── NΞP | Links ──

function initLinks(links, indicator, onLinkClick) {

  let activeLink = null;

  function setActive(link, snap = true) {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    activeLink = link;
    indicator.move(activeLink, snap);
  }

  function getActive() {
    return activeLink;
  }

  links.forEach((link) => {

    link.addEventListener("mouseenter", () => indicator.move(link));

    link.addEventListener("mouseleave", () => {
      indicator.move(activeLink);
    });

    link.addEventListener("click", () => {
      setActive(link);
      onLinkClick?.();
    });

  });

  const initial = links.find((l) => l.classList.contains("active")) || links[0];
  if (initial) setActive(initial, true);

  return { setActive, getActive };
}

// ── NΞP | Mobile Toggle ──

function initMobileToggle(nav, toggle, onToggle) {

  const navInner = nav.querySelector(".nav-inner");

  function open() {

    if (!navInner) return;

    gsap.fromTo(navInner,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" }
    );

    gsap.fromTo(navInner.querySelectorAll("a"),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }

  function close() {

    if (!navInner) return;

    gsap.to(navInner, {
      height: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in"
    });
  }

  function collapse() {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      close();
    }
  }

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    onToggle?.(isOpen);
    isOpen ? open() : close();
  });

  return { collapse };
}

// ── NΞP | Resize Watcher ──

function initResizeWatcher(getActive, indicator, delay = 120) {
  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => indicator.move(getActive(), true), delay);
  });
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

  console.log("NΞP | nav initialized");

  const nav = document.querySelector("#nav");
  if (!nav) return;

  const navInner  = nav.querySelector(".nav-inner");
  const indicator = document.querySelector("#nav-indicator");
  const links     = Array.from(document.querySelectorAll("#nav a"));
  const toggle    = document.querySelector("#nav-toggle");

  const ind = createIndicator(indicator, navInner);

  const mobile = initMobileToggle(nav, toggle, () => {
    setTimeout(() => ind.move(linkState.getActive(), true), 220);
  });

  const linkState = initLinks(links, ind, () => {
    mobile.collapse();
    setTimeout(() => ind.move(linkState.getActive(), true), 160);
  });

  gsap.fromTo(
      nav,
      { visibility: "visible", y:-100, opacity: 0 },
      { duration: 0.5, y:0, opacity: 1, delay: 0.5 }
  );

  initResizeWatcher(linkState.getActive, ind);

  return {
    setActive: (el) => linkState.setActive(el),
  };
}

wait("loaded", init);

})();