import * as THREE from "three";
import { Environment } from "./Environment";

/**
 * Initiate Three.js
 * @param {HTMLDivElement} app
 */
export const initThree = (app) => {
  const environment = new Environment(app);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  environment.addMesh(cube);

  const tick = () => {
    environment.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    environment.onResize();
    postprocess.onResize();
  });
};
