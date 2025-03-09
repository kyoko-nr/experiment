import * as THREE from "three";
import { Environment } from "./Environment";
import { Postprocess } from "./postprocess";
import { Models } from "./Models";

/**
 * Initiate Three.js
 * @param {HTMLDivElement} app
 */
export const initThree = (app) => {
  const environment = new Environment(app);

  const models = new Models();
  environment.addMesh(models.group);

  const postprocess = new Postprocess(environment);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    models.animate(elapsedTime);

    postprocess.render();

    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    environment.onResize();
    postprocess.onResize();
  });
  document.addEventListener("mousemove", (e) => {
    const posNormalized = new THREE.Vector2(
      (e.clientX / window.innerWidth),
      (1.0 - (e.clientY / window.innerHeight))
    );
    postprocess.updateMouse(posNormalized);
    postprocess.updateProgress();
  });
};
