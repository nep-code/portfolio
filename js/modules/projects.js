import { is_mobile } from '../global.js';

export function init() {
  //console.log("PROJECTS loaded");

  let resizeTimer = null;
			AUTOSCALE();

			$('#projects .project a').on('click', function () {
				$('body, #lightbox').addClass('active');
				disableScroll();
			});

			$('#cta-close').on('click', function () {
				$('body, #lightbox').removeClass('active');
				$("#lightbox iframe").attr("src", "about:blank");
				enableScroll();
			});

			if (is_mobile) {
			window.addEventListener("orientationchange", () => {
				// Cancel any pending resize operations
				clearTimeout(resizeTimer);

				if ('visualViewport' in window) {
					// Use the visualViewport resize event to detect when rotation actually finishes
					const onViewportChange = () => {
						AUTOSCALE();
						window.visualViewport.removeEventListener('resize', onViewportChange);
					};
					window.visualViewport.addEventListener('resize', onViewportChange);
				} else {
					// Fallback: debounce resize to wait for reflow to settle
					let resizeCount = 0;
					const handleResize = () => {
						resizeCount++;
						if (resizeCount > 2) {
							window.removeEventListener('resize', handleResize);
							AUTOSCALE();
						}
					};
					window.addEventListener('resize', handleResize);

					// Safety fallback (covers rare cases)
					resizeTimer = setTimeout(AUTOSCALE, 200);
				}
			});
		} else {
			// Non-mobile: just listen for window resizes
			window.addEventListener("resize", AUTOSCALE);
		}


        /*gsap.utils.toArray(".project").forEach((el, i) => {
            gsap.from(el, {
                x: i % 2 === 0 ? 500 : -500,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(0.5)",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });*/
				

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
					document.body.style.position = 'fixed';
					document.body.style.top = `-${scrollY}px`;
					document.body.style.width = '100%';
				}

				function enableScroll() {
					document.body.style.position = '';
					document.body.style.top = '';
					document.body.style.width = '';
					window.scrollTo(0, scrollY);
				}
    }
