import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const init = () => {
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
    initialPositions[i * 3 + 2] = sphereVertices[i * 3 + 2];
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
      mouse: { value: new THREE.Vector2() },
    },
    vertexShader: `
        uniform float time;
        uniform vec2 mouse;

        attribute vec3 initialPosition;

        void main() {
            vec3 pos = initialPosition;

            if (time < 1.0) { // Sphere
                pos = initialPosition; // Using the sphere geometry positions
            } else if (time < 2.0) { // Sine wave
                float wave = sin(pos.x * 5.0 + time * 5.0);
                pos.y += wave * 0.5 + (sin(pos.z * 5.0 + time * 3.0) * .2);
                pos.z += (cos(pos.x * 7.0 + time * 4.0) * .2);
            } else { // Cloud
                pos.x += sin(pos.y * 3.0 + time * 2.0) * 0.2;
                pos.y += cos(pos.z * 3.0 + time * 1.5) * 0.2;
                pos.z += sin(pos.x * 3.0 + time * 2.5) * 0.2;
            }

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * 2.0, 1.0);
            gl_PointSize = 3.0;
        }
    `,
    fragmentShader: `
        uniform float time;

        void main() {
            gl_FragColor = vec4(sin(time * 2.0), cos(time * 3.0), sin(time * 4.0), 1.0);
        }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    material.uniforms.mouse.value.copy(mouse);
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
};

document.addEventListener("DOMContentLoaded", init);
