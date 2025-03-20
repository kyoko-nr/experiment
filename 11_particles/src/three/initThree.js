import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

const gui = new GUI();

const params = {
  clearColor: "#d7e3e5",
};

export const initThree = () => {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(params.clearColor);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Sphere Geometry for Initial Positions
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 32); // Increased segments for smoother sphere
  const sphereVertices = sphereGeometry.attributes.position.array;
  const particleCount = sphereVertices.length / 3;

  const positions = new Float32Array(particleCount * 3);
  const initialPositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = sphereVertices[i * 3];
    positions[i * 3 + 1] = sphereVertices[i * 3 + 1];
    positions[i * 3 + 2] = sphereVertices[i * 3 + 2];

    initialPositions[i * 3] = sphereVertices[i * 3];
    initialPositions[i * 3 + 1] = sphereVertices[i * 3 + 1];
    initialPositions[i * 3 + 2] = 0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    "initialPosition",
    new THREE.BufferAttribute(initialPositions, 3)
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector3() },
      mouseRadius: { value: 1.0 },
      returnSpeed: { value: 2.0 },
      interaction: { value: 0.0 },
    },
    vertexShader,
    fragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  const mouse = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  let mouseIsInteracting = false;

  window.addEventListener("mousemove", (event) => {
    const mouseNormalized = new THREE.Vector2();
    mouseNormalized.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseNormalized.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseNormalized, camera);
    const intersects = raycaster.intersectObjects([particles]);

    if (intersects.length > 0) {
      mouse.copy(intersects[0].point);
      mouseIsInteracting = true;
    } else {
      mouseIsInteracting = false;
    }

    material.uniforms.mouse.value.copy(mouse);
    material.uniforms.interaction.value = mouseIsInteracting ? 1.0 : 0.0;
  });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    material.uniforms.time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });

  // ---------- GUI
  gui.addColor(params, "clearColor").onChange(() => {
    renderer.setClearColor(params.clearColor);
  });
};
