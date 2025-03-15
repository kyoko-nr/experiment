import * as THREE from "three";
import { Environment } from "./Environment";
import { Models } from "./Models";
import { Lights } from "./Lights";
import {updateSizeOnResize} from "../utils/getSize";

/**
 * Initiate Three.js scene
 * @param {HTMLDivElement} app
 * @param {HTMLCanvasElement} displacement canvas
 */
export const initThree = (app, canvas) => {
  updateSizeOnResize();
  const environment = new Environment(app);

  const lights = new Lights();
  environment.addMesh(lights.lights);

  const models = new Models(canvas, environment.camera);
  environment.addMesh(models.group);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    environment.render();
    models.animate(elapsedTime);

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    updateSizeOnResize();
    environment.onResize();
  });
};
