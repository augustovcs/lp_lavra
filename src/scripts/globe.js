// Globo 3D (cobe v2) na cor da marca: dourado sobre base escura.
// Pontos (cidades) + arcos (links) entre eles. Gira devagar, pode ser arrastado,
// e respeita prefers-reduced-motion. No cobe v2 dirigimos o loop com globe.update().
import createGlobe from 'cobe';

const canvas = document.getElementById('globe');
if (canvas) {
  // Cidades atendidas (lat, lng) — usadas como pontos e como pontas dos links.
  const C = {
    saoPaulo: [-23.55, -46.63],
    buenosAires: [-34.6, -58.38],
    santiago: [-33.45, -70.66],
    bogota: [4.71, -74.07],
    mexico: [19.43, -99.13],
    novaYork: [40.71, -74.0],
    saoFrancisco: [37.77, -122.42],
    toronto: [43.65, -79.38],
    lisboa: [38.72, -9.14],
    madri: [40.42, -3.7],
    londres: [51.51, -0.13],
    paris: [48.85, 2.35],
    berlim: [52.52, 13.4],
    lagos: [6.52, 3.37],
    joanesburgo: [-26.2, 28.04],
    cidadeDoCabo: [-33.92, 18.42],
    nairobi: [-1.29, 36.82],
    dubai: [25.2, 55.27],
    bengaluru: [12.97, 77.59],
    cingapura: [1.35, 103.82],
    toquio: [35.68, 139.69],
    seul: [37.57, 126.98],
    sydney: [-33.87, 151.21],
  };

  const markers = Object.values(C).map((location) => ({ location, size: 0.055 }));
  markers[0].size = 0.1; // São Paulo (hub) em destaque

  const link = (from, to) => ({ from, to });
  const arcs = [
    link(C.saoPaulo, C.novaYork),
    link(C.saoPaulo, C.lisboa),
    link(C.saoPaulo, C.buenosAires),
    link(C.saoPaulo, C.bogota),
    link(C.saoPaulo, C.lagos),
    link(C.bogota, C.mexico),
    link(C.santiago, C.buenosAires),
    link(C.novaYork, C.saoFrancisco),
    link(C.novaYork, C.toronto),
    link(C.novaYork, C.londres),
    link(C.lisboa, C.madri),
    link(C.londres, C.paris),
    link(C.paris, C.berlim),
    link(C.berlim, C.dubai),
    link(C.dubai, C.nairobi),
    link(C.dubai, C.bengaluru),
    link(C.lagos, C.joanesburgo),
    link(C.joanesburgo, C.cidadeDoCabo),
    link(C.bengaluru, C.cingapura),
    link(C.cingapura, C.toquio),
    link(C.toquio, C.seul),
    link(C.cingapura, C.sydney),
  ];

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let phi = 0;
  let r = 0; // rotação manual (arraste)
  let pointerInteracting = null;
  let pointerMovement = 0;

  const onResize = () => {
    width = canvas.offsetWidth;
    if (reduce) render();
  };
  window.addEventListener('resize', onResize);
  onResize();

  const globe = createGlobe(canvas, {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width: width * 2,
    height: width * 2,
    phi: 0,
    theta: 0.22,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.20, 0.30, 0.23],
    markerColor: [0.47, 0.75, 0.54],
    glowColor: [0.26, 0.42, 0.31],
    markers,
    arcs,
    arcColor: [0.47, 0.75, 0.54],
    arcWidth: 0.45,
    arcHeight: 0.25,
    markerElevation: 0.01,
  });

  function render() {
    globe.update({ phi: phi + r, width: width * 2, height: width * 2 });
  }

  if (reduce) {
    render(); // estático: um frame só
  } else {
    (function loop() {
      if (pointerInteracting === null) phi += 0.002; // giro lento
      render();
      requestAnimationFrame(loop);
    })();
  }

  // arrastar para girar
  canvas.addEventListener('pointerdown', (e) => {
    pointerInteracting = e.clientX - pointerMovement;
    canvas.style.cursor = 'grabbing';
  });
  const release = () => {
    pointerInteracting = null;
    canvas.style.cursor = 'grab';
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  window.addEventListener('pointermove', (e) => {
    if (pointerInteracting !== null) {
      pointerMovement = e.clientX - pointerInteracting;
      r = pointerMovement / 200;
      if (reduce) render();
    }
  });

  // aparece suavemente
  requestAnimationFrame(() => { canvas.style.opacity = '1'; });
}
