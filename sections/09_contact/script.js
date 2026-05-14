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

function init() {

  console.log("NΞP | contact initialized");

}

wait("loaded", init);

})();