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
  // Wobble
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

  // Plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10, 1, 1),
    new THREE.MeshStandardMaterial({
      color: "#ffffff",
      side: THREE.DoubleSide,
    })
  );
  plane.position.set(0, 0, 3.5);
  plane.rotation.x = Math.PI;
  plane.receiveShadow = true;
  return { wobble, plane };
};

const createLights = () => {
  const ambientLight = new THREE.AmbientLight("#ffffff", 1);
  const directionalLight1 = new THREE.DirectionalLight("#ffffff", 1.5);
  directionalLight1.castShadow = true;
  directionalLight1.shadow.mapSize.set(1024, 1024);
  directionalLight1.shadow.camera.far = 20;
  directionalLight1.shadow.normalBias = 0.05;
  directionalLight1.position.set(-3, 1.5, -4);

  const directionalLight2 = new THREE.DirectionalLight("#ffffff", 0.5);
  directionalLight2.castShadow = true;
  directionalLight2.shadow.mapSize.set(1024, 1024);
  directionalLight2.shadow.camera.far = 25;
  directionalLight2.shadow.normalBias = 0.05;
  directionalLight2.position.set(2, 1.3, -7);

  return { ambientLight, directionalLight1, directionalLight2 };
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
  camera.position.set(0, 0, -10);
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

  const { ambientLight, directionalLight1, directionalLight2 } = createLights();
  scene.add(ambientLight, directionalLight1, directionalLight2);

  const { wobble, plane } = createMesh();
  scene.add(wobble, plane);

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

  addGui({ dirLight1: directionalLight1, dirLight2: directionalLight2 });
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

// -----------------------------------------------------------
const addGui = ({
  dirLight1,
  dirLight2,
}: {
  dirLight1: THREE.Light;
  dirLight2: THREE.Light;
}) => {
  const gui = new GUI();
  const lights = gui.addFolder("Lights");
  lights.add(dirLight1.position, "x", -20, 20, 0.1).name("DirLight1 X");
  lights.add(dirLight1.position, "y", -20, 20, 0.1).name("DirLight1 Y");
  lights.add(dirLight1.position, "z", -20, 20, 0.1).name("DirLight1 Z");
  lights.add(dirLight2.position, "x", -20, 20, 0.1).name("DirLight2 X");
  lights.add(dirLight2.position, "y", -20, 20, 0.1).name("DirLight2 Y");
  lights.add(dirLight2.position, "z", -20, 20, 0.1).name("DirLight2 Z");
};
