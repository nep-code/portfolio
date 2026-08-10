(function () {

function animateBG() {
  const root      = document.getElementById('contact-bg');
  const canvas    = document.getElementById('contact-bg-canvas');
  const ctx       = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, DPR;
  let nodes = [];
  const NODE_COUNT = 70;
  const LINK_DIST  = 150;      // max distance (px, at z=1) two nodes will connect
  const MOUSE      = { x: 0.5, y: 0.5 }; // normalized parallax target

  function resize(){
    const rect = root.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function rand(min, max){ return min + Math.random() * (max - min); }

  // ---- build nodes with a depth value (z: 0 = far, 1 = near) ----
  function makeNode(){
    const z = Math.random();               // depth
    const node = {
      // base anchor position (percent of canvas, so it reflows on resize)
      bx: rand(0, 1),
      by: rand(0, 1),
      z,
      r: rand(1.1, 3.2) * (0.5 + z),        // nearer = bigger
      // wander offset (px) driven by GSAP — this IS the "random subtle movement"
      wx: 0, wy: 0,
      // per-node gentle pulsing
      pulse: Math.random() * Math.PI * 2
    };
    wander(node);
    return node;
  }

  // continuously tween each node to a new random nearby offset —
  // irregular, non-repeating drift rather than a mechanical loop
  function wander(node){
    if (reduceMotion) return;
    const range = 26 + node.z * 34; // nodes closer to camera roam a bit further
    gsap.to(node, {
      wx: rand(-range, range),
      wy: rand(-range, range),
      duration: rand(5, 11),
      ease: 'sine.inOut',
      onComplete: () => wander(node)
    });
  }

  function initNodes(){
    nodes = Array.from({ length: NODE_COUNT }, makeNode);
  }

  // ---- subtle 3D parallax tilt on mouse / touch, GSAP-eased ----
  const tilt = { rx: 0, ry: 0 };
  const setRX = gsap.quickTo(tilt, 'rx', { duration: 1.2, ease: 'power3.out' });
  const setRY = gsap.quickTo(tilt, 'ry', { duration: 1.2, ease: 'power3.out' });

  function onPointerMove(e){
    const rect = root.getBoundingClientRect();
    const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width;
    const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top)  / rect.height;
    MOUSE.x = x; MOUSE.y = y;
    setRY((x - 0.5) * 8);   // rotateY
    setRX((0.5 - y) * 6);   // rotateX
  }
  root.addEventListener('mousemove', onPointerMove);
  root.addEventListener('touchmove', onPointerMove, { passive:true });
  root.addEventListener('mouseleave', () => { setRX(0); setRY(0); });

  gsap.ticker.add(() => {
    canvas.style.transform =
      `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03)`;
  });

  // ---- lerp helper for color-by-depth (amber near -> cyan far) ----
  function depthColor(z, alpha){
    const near = [143, 240, 230]; // #8FF0E6 — accent, lightened (close)
    const far  = [4, 92, 86];     // #045C56 — accent, deepened (far)
    const c = near.map((n, i) => Math.round(n + (far[i] - n) * (1 - z)));
    return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
  }

  function draw(t){
    ctx.clearRect(0, 0, W, H);

    // resolve on-screen positions this frame
    const pts = nodes.map(n => {
      n.pulse += 0.012;
      const scale = 0.65 + n.z * 0.6; // parallax scale by depth
      return {
        x: n.bx * W + n.wx * scale,
        y: n.by * H + n.wy * scale,
        z: n.z,
        r: n.r + Math.sin(n.pulse) * 0.5
      };
    });

    // connective threads — only between nodes close enough in screen space,
    // faded by distance and by how "far" the pair sits (adds depth to lines)
    for (let i = 0; i < pts.length; i++){
      for (let j = i + 1; j < pts.length; j++){
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = LINK_DIST * (0.6 + ((a.z + b.z) / 2) * 0.6);
        if (dist < maxDist){
          const alpha = (1 - dist / maxDist) * 0.35 * ((a.z + b.z) / 2 + 0.3);
          ctx.strokeStyle = `rgba(0,178,169,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6 + ((a.z + b.z) / 2) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes on top, glow scaled by depth
    for (const p of pts){
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      glow.addColorStop(0, depthColor(p.z, 0.55 * (0.4 + p.z)));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = depthColor(p.z, 0.9);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  function start(){
    resize();
    initNodes();
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    // keep node anchors valid; bx/by are % based so no rebuild needed
  });

  start();
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

  console.log("NΞP | contact initialized");

  animateBG();

}

init();

})();