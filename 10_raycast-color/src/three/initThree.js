import * as THREE from "three";
import { Environment } from "./Environment";
import { Models } from "./Models";

/**
 * Initiate Three.js
 * @param {HTMLDivElement} app
 */
export const initThree = (app) => {
  const environment = new Environment(app);

  const models = new Models();

  environment.addMesh(models.group);

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
