import * as THREE from "three";
import { Environment } from "./Environment";
import { Models } from "./Models";
import { Displacement } from "./Displacement";
import {updateSizeOnResize} from "../utils/getSize";

/**
 * Initiate Three.js scene
 * @param {HTMLDivElement} app
 * @param {HTMLCanvasElement} displacement canvas
 */
export const initThree = (app, canvas) => {
  updateSizeOnResize();
  const environment = new Environment(app);

  const models = new Models();
  environment.addMesh(models.group);

  const displacement = new Displacement(canvas, environment.camera);
  environment.addMesh(displacement.plane);

  const tick = () => {
    displacement.update(environment.camera)
    environment.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    updateSizeOnResize();
    environment.onResize();
    displacement.onResize(environment.camera);
  });
};
