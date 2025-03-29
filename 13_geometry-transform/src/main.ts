import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import GUI from "lil-gui";

const size = {
  width: 0,
  height: 0,
  dpr: 0,
};

// -------------------------------------------------

const createMesh = () => {
  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    color: "#ffffff",
  });
  const geometry = new THREE.IcosahedronGeometry(2.5, 50);
  const mergedGeometry = mergeVertices(geometry);
  mergedGeometry.computeTangents();
  // Mesh
  const wobble = new THREE.Mesh(mergedGeometry, material);
  //  wobble.customDepthMaterial = depthMaterial;
  wobble.receiveShadow = true;
  wobble.castShadow = true;
  return wobble;
};

const createLights = () => {
  const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);

  return { ambientLight };
};

/**
 * Create Three.js environment
 */
const createEnvironment = () => {
  updateSize();
  // Scene
  const scene = new THREE.Scene();
  // Camera
  const camera = new THREE.PerspectiveCamera(
    35,
    size.width / size.height,
    0.1,
    100
  );
  camera.position.set(13, -3, -5);
  scene.add(camera);
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMappingExposure = 1;
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.dpr);
  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  return { scene, camera, renderer };
};

// -----------------------------------------------------------

const updateSize = () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.dpr = window.devicePixelRatio;
};

/**
 * Initialize the Three.js application
 * @param app
 */
const initThree = (app: HTMLDivElement) => {
  const { scene, camera, renderer } = createEnvironment();
  app.appendChild(renderer.domElement);

  const lights = createLights();
  scene.add(lights.ambientLight);

  const mesh = createMesh();
  scene.add(mesh);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener("resize", () => {
    updateSize();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.dpr);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  });
};

// -----------------------------------------------------------
/**
 * Initialize the application
 */
const init = () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app) {
    initThree(app);
  }
};

document.addEventListener("DOMContentLoaded", init);
