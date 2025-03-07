import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";
import { getGui } from "./getGui";

const SIZE = {
  width: 0,
  height: 0,
  dpr: 0,
};

const rendererParams = {
  clearColor: "#d5d1b3",
}

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
  
  // const clock = new THREE.Clock();
  
  addGui(renderer);

  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    onResize(camera, composer, renderer);
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
  SIZE.dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(SIZE.dpr);
  renderer.setViewport(0, 0, SIZE.width, SIZE.height);
  renderer.setClearColor(rendererParams.clearColor);

  return { renderer, camera, scene };
};

const onResize = (camera, renderer) => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  camera.aspect = SIZE.width / SIZE.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZE.width, SIZE.height);
  SIZE.dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(SIZE.dpr);
  renderer.setViewport(0, 0, SIZE.width, SIZE.height);
}

//--------GUI--------
const addGui = (renderer) => {
  const gui = getGui();
  gui.addColor(rendererParams, "clearColor")
    .onChange(() => renderer.setClearColor(rendererParams.clearColor));
}

