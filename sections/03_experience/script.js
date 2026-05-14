(function () {
	const IS_MOBILE = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	function SCROLL_TRIGGER() {
    gsap.utils.toArray(".vtimeline-point").forEach((el) => {
			gsap.from(el, {
					opacity: 0,
					duration: 0.5,
					ease: "power2.inOut",
					scrollTrigger: {
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none reverse",
					},
			});
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

  console.log("NΞP | experience initialized");

  if(!IS_MOBILE) SCROLL_TRIGGER();

}

wait("loaded", init);

})();