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
  "sections/01_hero/src/indoor.jpg",
  "sections/01_hero/src/body.png",
  "sections/01_hero/src/hand-left.png",
  "sections/01_hero/src/hand-right.png"
];

const content = document.getElementById("content");


/* =========================================================
   LOAD ALL SECTIONS
========================================================= */

async function loadSections() {

  await preloadAllImages(preloadImages);

  // 1. HTML
  await loadAllHTML();
  // 2. CSS
  await loadAllCSS();
  // 3. SVG
  await loadAllSVG();
  // 4. JS
  await loadAllJS();
  // 5. Reveal
  finishLoading();

}


/* =========================================================
  LOAD HTML
========================================================= */

async function loadAllHTML() {

  const results = await Promise.all(

    sectionOrder.map(async (name) => {

      //console.log(`NΞP | HTML START: ${name}`);

      const res = await fetch(
        `./sections/${name}/index.html`
      );

      if (!res.ok) {
        throw new Error(
          `${name} HTML failed: HTTP ${res.status}`
        );
      }

      const html = (await res.text()).replace(
        /(src|href|poster)="src\//g,
        `$1="sections/${name}/src/`
      );

      return {
        name,
        html
      };

    })

  );


  // Inject in the correct visual order
  results.forEach(({ name, html }) => {

  const wrapper = document.createElement("div");

  wrapper.dataset.section = name;
  wrapper.innerHTML = html;

  content.appendChild(wrapper);

    //console.log(`NΞP | HTML INJECTED: ${name}`);

  });

}


/* =========================================================
  LOAD CSS
========================================================= */

async function loadAllCSS() {

  await Promise.all(

    sectionOrder.map((name) => {

      return new Promise((resolve) => {

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = `./sections/${name}/style.css`;

        link.onload = () => {

          //console.log(`NΞP | CSS LOADED: ${name}`);

          resolve();

        };

        link.onerror = () => {

          console.warn(
            `NΞP | CSS FAILED: ${name}`
          );

          // Don't prevent the rest of the page
          resolve();

        };

        document.head.appendChild(link);

      });

    })

  );

}

/* =========================================================
  LOAD SVG
========================================================= */
async function loadAllSVG() {

  const placeholders = content.querySelectorAll("[data-svg]");

  //console.log(`NΞP | SVG FOUND: ${placeholders.length}`);

  await Promise.all(

    [...placeholders].map(async (placeholder) => {

      const rawSrc = placeholder.dataset.svg;

      // Convert section-relative src path
      const src = rawSrc.startsWith("src/")
        ? `sections/${getSectionName(placeholder)}/${rawSrc}`
        : rawSrc;

      try {

        //console.log(`NΞP | SVG REQUEST: ${src}`);

        const response = await fetch(src);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const svgText = await response.text();

        const parser = new DOMParser();

        const doc = parser.parseFromString(
          svgText,
          "image/svg+xml"
        );

        const svg = doc.documentElement;

        if (
          !svg ||
          svg.nodeName.toLowerCase() !== "svg"
        ) {
          throw new Error("Invalid SVG document");
        }

        const importedSVG = document.importNode(
          svg,
          true
        );

        // Keep placeholder classes
        importedSVG.classList.add(
          ...placeholder.classList
        );

        placeholder.replaceWith(importedSVG);

        //console.log(`NΞP | SVG LOADED: ${src}`);

      } catch (error) {

        console.error(
          `NΞP | SVG FAILED: ${src}`,
          error
        );

      }

    })

  );
}
function getSectionName(element) {

  const section = element.closest("[data-section]");

  if (!section) {
    throw new Error(
      "SVG placeholder is not inside a [data-section] element"
    );
  }

  return section.dataset.section;
}


/* =========================================================
  LOAD JS
========================================================= */

async function loadAllJS() {

  await Promise.all(

    sectionOrder.map((name) => {

      return new Promise((resolve) => {

        const script = document.createElement("script");

        script.type = "module";
        script.src = `./sections/${name}/script.js`;

        script.onload = () => {

          //console.log(`NΞP | JS LOADED: ${name}`);

          resolve();

        };

        script.onerror = () => {

          console.warn(
            `NΞP | JS FAILED: ${name}`
          );

          // Don't prevent other sections
          resolve();

        };

        document.body.appendChild(script);

      });

    })

  );

}


/* =========================================================
  IMAGE PRELOADER
========================================================= */

function preloadAllImages(images) {

  return Promise.all(

    images.map(src => {

      return new Promise((resolve) => {

        const img = new Image();

        img.src = src;

        img.onload = resolve;
        img.onerror = resolve;

      });

    })

  );

}


/* =========================================================
  LOADER OUTRO
========================================================= */

function finishLoading() {

  const loader = document.getElementById("loader");

  if (!loader) return;

  document.body.classList.add("loaded");

  setTimeout(() => {

    loader.classList.add("outro");

    loader.addEventListener(
      "transitionend",
      () => {

        loader.remove();

      },
      { once: true }
    );

  }, 400);

}


/* =========================================================
  START
========================================================= */

loadSections();