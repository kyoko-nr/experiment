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
    environment.animateCamera(isForward);
    environment.animateColor(isForward);
    particles.animatePointSize(isForward);
    particles.animatePointColor(isForward);
  };

  /**
   * Update morphing animation
   * @param {boolean} isForward
   */
  const updateMorphAnim = (isForward) => {
    environment.animateColor(isForward);
    particles.animateMorph(isForward);
    particles.animatePointSize(!isForward);
    particles.animatePointColor(isForward);
  };

  return {
    updateCameraAnim,
    updateMorphAnim,
  };
};
