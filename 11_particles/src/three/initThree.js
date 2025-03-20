import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { Environment } from "./Environment";
import { Particles } from "./Particles";
import { updateSizeOnResize } from "../utils/getSize";

/**
 * Initialize Three.js
 * @param {HTMLDivElement} app
 */
export const initThree = (app) => {
  updateSizeOnResize();
  const environment = new Environment(app);

  const particles = new Particles();
  environment.addMesh(particles.particles);

  // Mouse interaction
  const mouse = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  let mouseIsInteracting = false;

  // window.addEventListener("mousemove", (event) => {
  //   const mouseNormalized = new THREE.Vector2();
  //   mouseNormalized.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouseNormalized.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   raycaster.setFromCamera(mouseNormalized, camera);
  //   const intersects = raycaster.intersectObjects([particles]);

  //   if (intersects.length > 0) {
  //     mouse.copy(intersects[0].point);
  //     mouseIsInteracting = true;
  //   } else {
  //     mouseIsInteracting = false;
  //   }

  //   material.uniforms.mouse.value.copy(mouse);
  //   material.uniforms.interaction.value = mouseIsInteracting ? 1.0 : 0.0;
  // });

  // Animation loop
  const clock = new THREE.Clock();

  const animate = () => {
    environment.render();
    particles.updateMaterial(clock.getElapsedTime());
    requestAnimationFrame(animate);
  };

  animate();

  // Resize handling
  window.addEventListener("resize", () => {
    environment.onResize();
  });
};
