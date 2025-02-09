import * as THREE from "three";
import { createTextPlane } from "./createTextPlane";
import { postProcess } from "./postProcess";

const SIZE = {
  width: 0,
  height: 0,
};

/**
 * Initiate Three.js
 * @param {HTMLDivElement} app
 */
export const initThree = (app) => {
  const { scene, camera, renderer } = createEnvironment();

  const plane = createTextPlane();
  scene.add(plane);

  app.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const composer = postProcess({ renderer, size: SIZE, scene, camera });

  const tick = () => {
    composer.render();
    composer.passes[1].uniforms.uTime.value = clock.getElapsedTime();

    window.requestAnimationFrame(tick);
  };

  // renderer.render(scene, camera);
  tick();
};

const createEnvironment = () => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    SIZE.width / SIZE.height,
    0.1,
    10
  );
  camera.position.set(0, 0, 1.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SIZE.width, SIZE.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return { renderer, camera, scene };
};
