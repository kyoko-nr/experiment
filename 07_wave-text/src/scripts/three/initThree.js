import * as THREE from "three";
import { createTextPlane } from "./createTextPlane";

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

  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
    plane.material.uniforms.uTime.value = clock.getElapsedTime();
  };

  // renderer.render(scene, camera);
  tick();
};

const createEnvironment = () => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const camera = new THREE.PerspectiveCamera(
    60,
    SIZE.width / SIZE.height,
    0.1,
    10
  );
  camera.position.set(0, 0, 1.5);
  // scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SIZE.width, SIZE.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return { renderer, camera, scene };
};
