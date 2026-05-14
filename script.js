const is_mobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
const z0 = /Chrome/.test(navigator.userAgent) ? 0 : 0.01;

const sectionOrder = [
  "00_nav",
  "01_hero",
  "02_about",
  "03_experience",
  "04_motion",
  "05_interactive",
  /* "06_web",
  "07_design", */
  "08_skills",
  "09_contact",
  "10_footer"
];

// PRELOAD IMAGES
const preloadImages = [
  "sections/01_hero/src/city.jpg",
  "sections/01_hero/src/indoor.png",
  "sections/01_hero/src/body.png",
  "sections/01_hero/src/hand-left.png",
  "sections/01_hero/src/hand-right.png"
];

const content = document.getElementById("content");

async function loadSections() {

  // Preload critical images before any section initializes
  await preloadAllImages(preloadImages);

  for (const name of sectionOrder) {

    try {

      // LOAD HTML
      const res = await fetch(`./sections/${name}/index.html`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();

      // INJECT HTML
      content.insertAdjacentHTML("beforeend", html);

      // LOAD CSS — wait for it to apply before running JS
      await new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./sections/${name}/style.css`;
        link.onload = resolve;
        link.onerror = resolve; // don't block on missing/optional CSS
        document.head.appendChild(link);
      });

      // LOAD JS — wait for it to execute before moving to next section
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = `./sections/${name}/script.js`;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    } catch (err) {

      console.error(`Failed loading ${name}:`, err);
      // Continue loading remaining sections even if one fails

    }
  }

  // All sections loaded, CSS applied, JS executed — safe to dismiss loader
  finishLoading();
}

// IMAGE PRELOADER
function preloadAllImages(images) {

  return Promise.all(

    images.map(src => {

      return new Promise((resolve) => {

        const img = new Image();

        img.src = src;

        img.onload = resolve;
        img.onerror = resolve; // resolve anyway so one bad image doesn't block everything

      });

    })

  );
}

// LOADER OUTRO
function finishLoading() {

  const loader = document.getElementById("loader");

  if (!loader) return;

  document.body.classList.add("loaded");

  setTimeout(() => {

    loader.classList.add("outro");

    loader.addEventListener("transitionend", () => {

      loader.remove();

    }, { once: true }); // prevent multiple firings if transition has sub-properties

  }, 400);
}

loadSections();