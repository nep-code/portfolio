import { is_mobile } from "../global.js";

export function init() {
  //console.log("EXPERIENCE loaded");

	if(!is_mobile) SCROLL_TRIGGER();

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
}