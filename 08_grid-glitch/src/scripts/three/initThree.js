import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";
import { postprocess } from "./postprocess";

const SIZE = {
  width: 0,
  height: 0,
};

let mouseSpeed = 0;
let prevTime = 0;

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
  prevTime = clock.getElapsedTime();

  const composer = postprocess({ renderer, size: SIZE, scene, camera });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    meshes.children.forEach((mesh) => {
      mesh.rotation.y = elapsedTime * 0.1;
      mesh.rotation.z = elapsedTime * 0.15;
    });

    mouseSpeed -= (elapsedTime - prevTime) * 0.2;
    composer.passes[1].uniforms.uMouseSpeed.value = Math.max( mouseSpeed, 0);
    composer.render();

    prevTime = elapsedTime

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    onResize(camera, composer, renderer);
  });
  document.addEventListener("mousemove", (e) => {
    const mousePos = onMousemove(e);
    composer.passes[1].uniforms.uMouse.value = mousePos;
    composer.passes[2].uniforms.uMouse.value = mousePos;

    mouseSpeed = 1;
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
  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);
  renderer.setViewport(0, 0, SIZE.width, SIZE.height);

  return { renderer, camera, scene };
};

const onResize = (camera, composer, renderer) => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  camera.aspect = SIZE.width / SIZE.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZE.width, SIZE.height);
  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);
  renderer.setViewport(0, 0, SIZE.width, SIZE.height);

  composer.setSize(SIZE.width, SIZE.height);
  composer.setPixelRatio(dpr);

  composer.passes[1].uniforms.uResolution.value = new THREE.Vector2(
    SIZE.width,
    SIZE.height
  );
  composer.passes[2].uniforms.uResolution.value = new THREE.Vector2(
    SIZE.width,
    SIZE.height
  );
}

const onMousemove = (e) => {
  // TODO ここでdprをかけるとpostprocess[1]のマウスの位置とuResolutionがズレる
  const dpr = Math.min(window.devicePixelRatio, 2);
  const posNormalized = new THREE.Vector2(
    (e.clientX / window.innerWidth) * dpr,
    (1.0 - (e.clientY / window.innerHeight)) * dpr
  );
  return posNormalized;
}
