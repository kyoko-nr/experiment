import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";
import { postprocess } from "./temppostprocess";
import { Environment } from "./Environment";
import { Postprocess } from "./postprocess";

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
  const environment = new Environment(app);

  const meshes  = createMeshes();
  environment.addMesh(meshes);

  const postprocess = new Postprocess(environment);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    meshes.children.forEach((mesh) => {
      mesh.rotation.y = elapsedTime * 0.1;
      mesh.rotation.z = elapsedTime * 0.15;
    });

    postprocess.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    environment.onResize();
    postprocess.onResize();
  });
  document.addEventListener("mousemove", (e) => {
    const posNormalized = new THREE.Vector2(
      (e.clientX / window.innerWidth),
      (1.0 - (e.clientY / window.innerHeight))
    );
    postprocess.updateMouse(posNormalized);
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
    SIZE.width * dpr,
    SIZE.height * dpr
  );
  composer.passes[2].uniforms.uResolution.value = new THREE.Vector2(
    SIZE.width * dpr,
    SIZE.height * dpr
  );
}

const onMousemove = (e) => {
  const posNormalized = new THREE.Vector2(
    (e.clientX / window.innerWidth),
    (1.0 - (e.clientY / window.innerHeight))
  );
  return posNormalized;
}
