import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import GUI from "lil-gui";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const size = {
  width: 0,
  height: 0,
  dpr: 0,
};

const uniforms = {
  uTime: new THREE.Uniform(0),
  uSpeed: new THREE.Uniform(0.4),
  uWaveStrength: new THREE.Uniform(0.1),
  uWaveFrequency: new THREE.Uniform(1.5),
  uTwistFrequency: new THREE.Uniform(2.0),
  uColor1: new THREE.Uniform(new THREE.Color("#da8bea")),
  uColor2: new THREE.Uniform(new THREE.Color("#73d9f2")),
};

const animParams = {
  p1Spherical: new THREE.Spherical(4, Math.PI * 1.75, -Math.PI * 0.25),
  p2Spherical: new THREE.Spherical(4, Math.PI * 0.8, -Math.PI * 0.75),
};

// -------------------------------------------------

const createMesh = () => {
  // Wobble
  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader,
    fragmentShader,
    thickness: 1,
    uniforms,
  });
  const depthMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader,
    uniforms,
  });
  const geometry = new THREE.IcosahedronGeometry(2.5, 50);
  const mergedGeometry = mergeVertices(geometry);
  // Mesh
  const wobble = new THREE.Mesh(mergedGeometry, material);
  wobble.customDepthMaterial = depthMaterial;
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

const createLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight("#ffffff", 1);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight("#ffffff", 1.5);
  directionalLight1.castShadow = true;
  directionalLight1.shadow.mapSize.set(1024, 1024);
  directionalLight1.shadow.camera.far = 20;
  directionalLight1.shadow.normalBias = 0.05;
  directionalLight1.position.set(-3, 1.5, -4);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight("#ffffff", 0.5);
  directionalLight2.castShadow = true;
  directionalLight2.shadow.mapSize.set(1024, 1024);
  directionalLight2.shadow.camera.far = 25;
  directionalLight2.shadow.normalBias = 0.05;
  directionalLight2.position.set(2, 1.3, -7);
  scene.add(directionalLight2);

  const pointLight1 = new THREE.PointLight("#e147b0", 2.5);
  pointLight1.position.setFromSpherical(animParams.p1Spherical);
  scene.add(pointLight1);
  // const helper = new THREE.PointLightHelper(pointLight1, 0.5);
  // scene.add(helper);

  const pointLight2 = new THREE.PointLight("#00ff00", 2.5);
  pointLight2.position.setFromSpherical(animParams.p2Spherical);
  scene.add(pointLight2);
  // const helper2 = new THREE.PointLightHelper(pointLight2, 0.5);
  // scene.add(helper2);

  addLightGui({
    pLight1: pointLight1,
    pLightSp1: animParams.p1Spherical,
    pLight2: pointLight2,
    pLightSp2: animParams.p2Spherical,
  });

  return { pointLight1, pointLight2 };
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

  const { pointLight1, pointLight2 } = createLights(scene);

  const { wobble, plane } = createMesh();
  scene.add(wobble, plane);

  const clock = new THREE.Clock();
  const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;
    requestAnimationFrame(animate);

    // Point lights1
    const phiAmount1 = (Math.sin(elapsedTime * 0.5 + 0.2) + 1.0) * 0.5;
    const thetaAmoun1 = (Math.sin(elapsedTime * 0.6 + 0.3) + 1.0) * 0.5;
    animParams.p1Spherical.phi = -Math.PI * phiAmount1;
    animParams.p1Spherical.theta = -Math.PI * thetaAmoun1 + Math.PI * 0.5;
    pointLight1.position.setFromSpherical(animParams.p1Spherical);
    // Point lights2
    const phiAmount2 = (Math.sin(elapsedTime * 0.55 + 1.1) + 1.0) * 0.5;
    const thetaAmount2 = (Math.sin(elapsedTime * 0.45 + 0.8) + 1.0) * 0.5;
    animParams.p2Spherical.phi = -Math.PI * phiAmount2;
    animParams.p2Spherical.theta = -Math.PI * thetaAmount2 + Math.PI * 0.5;
    pointLight2.position.setFromSpherical(animParams.p2Spherical);

    renderer.render(scene, camera);
  };
  animate();
  addGui();

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

// -----------------------------------------------------------
const gui = new GUI();

const addGui = () => {
  const animationFolder = gui.addFolder("Animation");
  animationFolder.add(uniforms.uSpeed, "value", 0, 2, 0.1).name("Speed");
  animationFolder
    .add(uniforms.uWaveStrength, "value", 0, 0.5, 0.01)
    .name("Wave Strength");
  animationFolder
    .add(uniforms.uWaveFrequency, "value", 0, 3, 0.01)
    .name("Wave Frequency");
  animationFolder
    .add(uniforms.uTwistFrequency, "value", 0, 5, 0.1)
    .name("Twist Frequency");

  const colorFolder = gui.addFolder("Color");
  colorFolder.addColor(uniforms.uColor1, "value").name("Color1");
  colorFolder.addColor(uniforms.uColor2, "value").name("Color2");
};

const addLightGui = ({
  pLight1,
  pLightSp1,
  pLight2,
  pLightSp2,
}: {
  pLight1: THREE.PointLight;
  pLightSp1: THREE.Spherical;
  pLight2: THREE.PointLight;
  pLightSp2: THREE.Spherical;
}) => {
  const p1 = gui.addFolder("Point Light1");
  p1.add(pLightSp1, "phi", 0, Math.PI * 2)
    .name("Phi")
    .onChange(() => pLight1.position.setFromSpherical(pLightSp1));
  p1.add(pLightSp1, "theta", -Math.PI * 0.5, Math.PI * 0.5)
    .name("Theta")
    .onChange(() => pLight1.position.setFromSpherical(pLightSp1));
  p1.add(pLight1, "intensity", 0, 5);
  p1.addColor(pLight1, "color");

  const p2 = gui.addFolder("Point Light2");
  p2.add(pLightSp2, "phi", 0, Math.PI * 2)
    .name("Phi")
    .onChange(() => pLight2.position.setFromSpherical(pLightSp2));
  p2.add(pLightSp2, "theta", -Math.PI, Math.PI)
    .name("Theta")
    .onChange(() => pLight2.position.setFromSpherical(pLightSp2));
  p2.add(pLight2, "intensity", 0, 5);
  p2.addColor(pLight2, "color");
};
