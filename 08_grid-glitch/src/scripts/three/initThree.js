import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";
import { postprocess } from "./postprocess";

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

  const composer = postprocess({ renderer, size: SIZE, scene, camera });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    meshes.children.forEach((mesh) => {
      mesh.rotation.y = elapsedTime * 0.1;
      mesh.rotation.z = elapsedTime * 0.15;
    });
  
    // composer.passes[1].uniforms.uTime.value = clock.getElapsedTime();
    composer.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    onResize(camera, composer, renderer);
  });
  document.addEventListener("mousemove", (e) => {
    const mousePos = onMousemove(e);
    composer.passes[1].uniforms.uMouse.value = mousePos;
  });
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
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SIZE.width, SIZE.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return { renderer, camera, scene };
};

const onResize = (camera, composer, renderer) => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  camera.aspect = SIZE.width / SIZE.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZE.width, SIZE.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  composer.setSize(SIZE.width, SIZE.height);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

const onMousemove = (e) => {
  const dpr = Math.min(window.devicePixelRatio, 2);
  const posNormalized = new THREE.Vector2(
    (e.clientX / window.innerWidth) * dpr,
    (1.0 - (e.clientY / window.innerHeight)) * dpr
  );
  return posNormalized;
}