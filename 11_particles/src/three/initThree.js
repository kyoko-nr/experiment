import * as THREE from "three";
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
    updateSizeOnResize();
    environment.onResize();
    particles.onResize();
  });

  /**
   * Update camera animation
   * @param {boolean} isForward
   */
  const updateCameraAnim = (isForward) => {
    environment.updateCameraAnim(isForward);
    particles.updatePointSizeAnim(isForward);
  };

  /**
   * Update morphing animation
   * @param {boolean} isForward
   */
  const updateMorphAnim = (isForward) => {
    particles.updateMorphAnim(isForward);
    particles.updatePointSizeAnim(!isForward);
  };

  return {
    updateCameraAnim,
    updateMorphAnim,
  };
};
