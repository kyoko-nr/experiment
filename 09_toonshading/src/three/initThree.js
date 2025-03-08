import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createMeshes } from "./createMeshes";
import { getGui } from "./getGui";
import { createMaterial } from "./createMaterial";
import { getSize } from "./getSize";

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

  const material = createMaterial();
  const meshes  = createMeshes(material);
  scene.add(meshes);

  app.appendChild(renderer.domElement);

  addGui(renderer);

  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    onResize(camera, renderer, material);
  });
};

const createEnvironment = () => {
  const size = getSize();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    size.width / size.height,
    0.1,
    10
  );
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(size.width, size.height);
  size.dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(size.dpr);
  renderer.setViewport(0, 0, size.width, size.height);
  renderer.setClearColor(rendererParams.clearColor);

  return { renderer, camera, scene };
};

const onResize = (camera, renderer, material) => {
  const size = getSize();

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.dpr);
  renderer.setViewport(0, 0, size.width, size.height);

  material.uniforms.uResolution.value = new THREE.Vector2(size.width * size.dpr, size.height * size.dpr);
}

//--------GUI--------
const addGui = (renderer) => {
  const gui = getGui();
  gui.addColor(rendererParams, "clearColor")
    .onChange(() => renderer.setClearColor(rendererParams.clearColor));
}

