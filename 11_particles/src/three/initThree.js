import * as THREE from "three";
import { Environment } from "./Environment";
import { Particles } from "./Particles";
import { updateSizeOnResize } from "../utils/getSize";
import gui from "../gui/addGui";

const params = {
  animationIndex: 0,
  progress: 0,
};

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

  const updateAnim = (progress) => {
    environment.updateCameraAnim(progress);
    particles.updatePointSizeAnim(progress);
  };

  const addGui = () => {
    const folder = gui.addFolder("Animation");
    folder
      .add(params, "progress")
      .min(0)
      .max(1)
      .step(0.01)
      .onChange((val) => updateAnim(val));
  };
  addGui();
};
