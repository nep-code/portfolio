import { GLOBAL } from "./global.js";
import { MASTHEAD } from "./masthead.js";

(async () => {
  const preloadImages = [
    "src/city.jpg",
    "src/indoor.png",
    "src/body.png",
    "src/hand-left.png",
    "src/hand-right.png",
  ];

  let loaded = 0;
  const tl = gsap.timeline({
    defaults: { ease: "power4.inOut" }
  });

  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      if (++loaded === preloadImages.length) {
        
        tl.to(".bar", { width: "80%", duration: 0.5 })
          .to("#loader", { duration:0.5, opacity:0 },"-=0.5")
          .set("#loader", { display: "none" });

        INIT();
      }
    };
  });

  function INIT() {
    GLOBAL();
    MASTHEAD();
    lazyLoadSections();
  }

  function lazyLoadSections() {
    const sections = [
      { id: "about", module: "./modules/about.js" },
      { id: "experience", module: "./modules/experience.js" },
      { id: "education", module: "./modules/education.js" },
      { id: "projects", module: "./modules/projects.js" },
      { id: "skills", module: "./modules/skills.js" },
      { id: "contact", module: "./modules/contact.js" },
      { id: "footer", module: "./modules/footer.js" },
    ];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(s => s.id === entry.target.id);
            if (section) {
              const module = await import(section.module);
              module.init();
              obs.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "200px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();