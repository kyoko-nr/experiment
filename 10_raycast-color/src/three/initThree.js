import * as THREE from "three";
import { Environment } from "./Environment";
import { Models } from "./Models";
import { Displacement } from "./Displacement";

/**
 * Initiate Three.js scene
 * @param {HTMLDivElement} app
 * @param {HTMLCanvasElement} displacement canvas
 */
export const initThree = (app, canvas) => {
  const environment = new Environment(app);

  const models = new Models();

  environment.addMesh(models.group);

  const displacement = new Displacement(canvas);

  const tick = () => {
    environment.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    environment.onResize();
    displacement.onResize();
  });
};
