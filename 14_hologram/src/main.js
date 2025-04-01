import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import HologramVertexShader from "./shaders/hologram/vertex.glsl";
import HologramFragmentShader from "./shaders/hologram/fragment.glsl";

const uniforms = {
  uTime: new THREE.Uniform(0),
};

const initThree = (app) => {
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
  };

  // ---------------------------------------
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
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.dpr);
  app.appendChild(renderer.domElement);
  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // ---------------------------------------
  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshBasicMaterial,
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  material.depthWrite = false;

  // Torus
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.5, 128, 32),
    material
  );
  scene.add(torusKnot);

  // ---------------------------------------
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Update models
    torusKnot.rotation.y += delta * 0.5;
    // Update uniforms
    uniforms.uTime.value = elapsedTime;

    renderer.render(scene, camera);
  };
  animate();

  // ---------------------------------------
  // Resize
  window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    size.dpr = window.devicePixelRatio;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.dpr);
  });
};

const init = () => {
  const app = document.querySelector("#app");
  if (app) {
    initThree(app);
  }
};

document.addEventListener("DOMContentLoaded", init);
