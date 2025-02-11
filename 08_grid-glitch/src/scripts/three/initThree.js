import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";

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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const meshes  = createMeshes();
  scene.add(meshes);

  app.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  // const composer = postProcess({ renderer, size: SIZE, scene, camera });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    meshes.children.forEach((mesh) => {
      mesh.rotation.y = elapsedTime * 0.1;
      mesh.rotation.z = elapsedTime * 0.15;
    });

    renderer.render(scene, camera);
    
    // composer.passes[1].uniforms.uTime.value = clock.getElapsedTime();
    // composer.render();

    window.requestAnimationFrame(tick);
  };
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