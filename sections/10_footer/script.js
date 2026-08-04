(function () {

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

function scrollUp() {
  const navInner  = document.querySelector('.nav-inner');
  const indicator = document.querySelector('#nav-indicator');
  const links     = Array.from(document.querySelectorAll('.nav-inner a'));
  const heroLink  = document.querySelector('.nav-inner a[href="#hero"]');

  links.forEach(link => link.classList.remove('active'));
  heroLink?.classList.add('active');

  if (heroLink && indicator && navInner) {
    const linkRect  = heroLink.getBoundingClientRect();
    const innerRect = navInner.getBoundingClientRect();

    gsap.to(indicator, {
      opacity: 1,
      left:     `${linkRect.left - innerRect.left + (navInner.scrollLeft || 0)}px`,
      width:    `${Math.round(linkRect.width)}px`,
      duration: 0.32,
      ease:     "power3.out",
    });
  }
}

function init() {

  console.log("NΞP | footer initialized");

  $("#current-year").text(new Date().getFullYear());

  $("#cta-top").on("click", scrollUp);
}

wait("loaded", init);

})();