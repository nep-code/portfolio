(function () {
	const IS_MOBILE = /Mobi|Android|iPhone/i.test(navigator.userAgent);

	function SCROLL_TRIGGER() {
    var root = document.getElementById('experience');
      if (!root) return;

      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      // Scope every ScrollTrigger to this section so it tears down cleanly and
      // doesn't interfere with ScrollTriggers elsewhere on a host page.
      var ctx = gsap.context(function () {

        /* ---------- Header reveal ---------- */
        var head = root.querySelector('.section-head');
        if (head) {
          gsap.from(head.querySelectorAll('.eyebrow, .section-title, .section-subtitle'), {
            opacity: 0,
            y: reduceMotion ? 0 : 26,
            duration: .8,
            stagger: .12,
            ease: 'power3.out',
            scrollTrigger: { trigger: head, start: 'top 85%' }
          });
        }

        /* ---------- Timeline fill, scrubbed by scroll position ---------- */
        var timelineEl = root.querySelector('.timeline');
        var fillEl = root.querySelector('.timeline-fill');
        if (fillEl && timelineEl) {
          if (reduceMotion) {
            gsap.set(fillEl, { scaleY: 1 });
          } else {
            gsap.set(fillEl, { scaleY: 0 });
            gsap.to(fillEl, {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineEl,
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: .6
              }
            });
          }
        }

        /* ---------- Per-job reveal, active state, and desktop tilt ---------- */
        var jobs = root.querySelectorAll('.job');
        jobs.forEach(function (job, i) {
          var card = job.querySelector('.job-card');
          var node = job.querySelector('.node');
          var bullets = job.querySelectorAll('.bullets li');
          var pills = job.querySelectorAll('.pill');

          var tl = gsap.timeline({
            scrollTrigger: { trigger: job, start: 'top 82%' }
          });

          tl.from(job, {
            opacity: 0,
            x: reduceMotion ? 0 : -36,
            duration: .7,
            ease: 'power3.out'
          });

          if (bullets.length) {
            tl.from(bullets, {
              opacity: 0,
              x: reduceMotion ? 0 : -12,
              duration: .4,
              stagger: .07,
              ease: 'power2.out'
            }, '-=.35');
          }

          if (pills.length) {
            tl.from(pills, {
              opacity: 0,
              y: reduceMotion ? 0 : 8,
              scale: reduceMotion ? 1 : .92,
              duration: .35,
              stagger: .025,
              ease: 'back.out(1.7)'
            }, '-=.2');
          }

          // Highlight the node + card whose job "owns" the current scroll position.
          ScrollTrigger.create({
            trigger: job,
            start: 'top center',
            end: 'bottom center',
            onEnter: function () { node.classList.add('is-active'); card.classList.add('is-active'); },
            onEnterBack: function () { node.classList.add('is-active'); card.classList.add('is-active'); },
            onLeave: function () { node.classList.remove('is-active'); card.classList.remove('is-active'); },
            onLeaveBack: function () { node.classList.remove('is-active'); card.classList.remove('is-active'); }
          });

          if (isFinePointer && !reduceMotion) {
            // Subtle 3D tilt that follows the cursor — desktop / mouse only.
            var maxTilt = 4;
            var onMove = function (e) {
              var r = card.getBoundingClientRect();
              var px = (e.clientX - r.left) / r.width - .5;
              var py = (e.clientY - r.top) / r.height - .5;
              gsap.to(card, {
                rotateX: -py * maxTilt,
                rotateY: px * maxTilt,
                y: -4,
                transformPerspective: 800,
                duration: .4,
                ease: 'power2.out'
              });
            };
            var onLeave = function () {
              gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: .6, ease: 'power3.out' });
            };
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
          } else if (!reduceMotion) {
            // Light tap feedback for touch devices.
            var onTouchStart = function () { gsap.to(card, { y: -4, duration: .25, ease: 'power2.out' }); };
            var onTouchEnd = function () { gsap.to(card, { y: 0, duration: .4, ease: 'power2.out' }); };
            card.addEventListener('touchstart', onTouchStart, { passive: true });
            card.addEventListener('touchend', onTouchEnd, { passive: true });
          }
        });

        /* ---------- Summary reveal + count-up stats ---------- */
        var summary = root.querySelector('.summary');
        if (summary) {
          gsap.from(summary, {
            opacity: 0,
            y: reduceMotion ? 0 : 26,
            duration: .8,
            ease: 'power3.out',
            scrollTrigger: { trigger: summary, start: 'top 85%' }
          });

          var nums = root.querySelectorAll('.stat-number');
          ScrollTrigger.create({
            trigger: summary,
            start: 'top 85%',
            once: true,
            onEnter: function () {
              nums.forEach(function (el) {
                var target = parseInt(el.textContent, 10);
                if (isNaN(target)) return;
                if (reduceMotion) {
                  el.childNodes[0].nodeValue = target;
                  return;
                }
                var counter = { val: 0 };
                gsap.to(counter, {
                  val: target,
                  duration: 1.3,
                  ease: 'power2.out',
                  onUpdate: function () {
                    el.childNodes[0].nodeValue = Math.round(counter.val);
                  }
                });
              });
            }
          });
        }

      }, root);

      // Clean up if this section is ever removed from the page dynamically.
      window.addEventListener('beforeunload', function () { ctx.revert(); });
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