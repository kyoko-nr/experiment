import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import HologramVertexShader from "./shaders/hologram/vertex.glsl";
import HologramFragmentShader from "./shaders/hologram/fragment.glsl";
import GUI from "lil-gui";

const params = {
  color: "#00d5ff",
  stageColor: "#d4d4d4",
  ambientLight: "#ffffff",
  directionalLight: "#a4d5f4",
};

const uniforms = {
  uColor: new THREE.Uniform(new THREE.Color(params.color)),
  uTime: new THREE.Uniform(0),
  uProgress: new THREE.Uniform(0),
  uIndex: new THREE.Uniform(0),
  uMinY: new THREE.Uniform(0),
  uMaxY: new THREE.Uniform(0),
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
  camera.position.set(0, 4, -10);
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
  // Lights
  const ambientLight = new THREE.AmbientLight(
    new THREE.Color(params.ambientLight),
    0.5
  );
  scene.add(ambientLight);

  const dLight = new THREE.DirectionalLight(
    new THREE.Color(params.directionalLight),
    1.0
  );
  dLight.position.set(0, 3, 1);
  scene.add(dLight);

  const pLight = new THREE.PointLight(new THREE.Color(params.color), 1, 10);
  pLight.position.set(0, -1.3, 0);
  scene.add(pLight);

  // ---------------------------------------
  const baseMaterial = new THREE.ShaderMaterial({
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  baseMaterial.depthWrite = false;

  // Stage
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 0.5, 128),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(params.stageColor),
    })
  );
  cylinder.position.set(0, -2, 0);
  scene.add(cylinder);

  // Geoms
  const torusGeometry = new THREE.TorusKnotGeometry(1, 0.5, 128, 32);
  torusGeometry.computeBoundingBox();
  const icosahedronGeometry = new THREE.IcosahedronGeometry(2, 24);
  icosahedronGeometry.computeBoundingBox();
  // compute minY and maxY
  const minY = Math.min(
    torusGeometry.boundingBox.min.y,
    icosahedronGeometry.boundingBox.min.y
  );
  const maxY = Math.max(
    torusGeometry.boundingBox.max.y,
    icosahedronGeometry.boundingBox.max.y
  );
  const margin = 0.1;
  const posY = 0.5;
  uniforms.uMinY.value = minY + posY - margin;
  uniforms.uMaxY.value = maxY + posY + margin;

  // Torus
  const torusMaterial = baseMaterial.clone();
  torusMaterial.uniforms.uIndex.value = 0;

  const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
  torusKnot.position.y = posY;
  scene.add(torusKnot);

  // Icosahedron
  const icosahedronMaterial = baseMaterial.clone();
  icosahedronMaterial.uniforms.uIndex.value = 1;

  const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
  icosahedron.position.y = posY;
  scene.add(icosahedron);

  // ---------------------------------------
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Update models
    torusKnot.rotation.y += delta * 0.5;
    torusKnot.rotation.x += delta * 0.5;
    icosahedron.rotation.y += delta * 0.5;
    icosahedron.rotation.x += delta * 0.5;
    // Update uniforms
    torusMaterial.uniforms.uTime.value = elapsedTime;
    icosahedronMaterial.uniforms.uTime.value = elapsedTime;

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

  // ----------------------------------------
  // GUI
  const gui = new GUI();
  gui
    .addColor(params, "color")
    .name("color")
    .onChange((val) => {
      torusKnot.material.uniforms.uColor.value = new THREE.Color(val);
      icosahedron.material.uniforms.uColor.value = new THREE.Color(val);
      pLight.color = new THREE.Color(val);
    });
  gui
    .add(uniforms.uProgress, "value", 0, 1)
    .name("progress")
    .onChange((val) => {
      torusKnot.material.uniforms.uProgress.value = val;
      icosahedron.material.uniforms.uProgress.value = val;
    });
  gui
    .addColor(params, "stageColor")
    .name("stageColor")
    .onChange((val) => (cylinder.material.color = new THREE.Color(val)));
  gui
    .addColor(params, "ambientLight")
    .onChange((val) => (ambientLight.color = new THREE.Color(val)));
  gui
    .addColor(params, "directionalLight")
    .onChange((val) => (dLight.color = new THREE.Color(val)));
};

const init = () => {
  const app = document.querySelector("#app");
  if (app) {
    initThree(app);
  }
};

document.addEventListener("DOMContentLoaded", init);
