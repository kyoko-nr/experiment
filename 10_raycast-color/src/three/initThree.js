import * as THREE from "three";
import { Environment } from "./Environment";
import { Models } from "./Models";
import { Lights } from "./Lights";
import { Postprocess } from "./Postprocess";
import {updateSizeOnResize} from "../utils/getSize";

/**
 * Initiate Three.js scene
 * @param {HTMLDivElement} app
 * @param {HTMLCanvasElement} displacement canvas
 */
export const initThree = async (app, canvas) => {
  updateSizeOnResize();
  const environment = new Environment(app);

  const lights = new Lights();
  environment.addMesh(lights.lights);

  const models = new Models();
  const rabbit = await models.getModel();
  environment.addMesh(rabbit);

  const postprocess = new Postprocess(environment, canvas);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    models.animate(elapsedTime);
    postprocess.animate(elapsedTime);

    postprocess.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    updateSizeOnResize();
    environment.onResize();
  });
};
