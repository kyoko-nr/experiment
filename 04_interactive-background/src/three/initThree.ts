import { createRenderer } from "./environment/createRenderer";
import { createCamera } from "./environment/createCamera";
import { updateSizes } from "./updateSizes";
import { createScene } from "./environment/createScene";
import { createPlane } from "./environment/createPlane";
import { getWindowSize } from "./logics/getWindowSize";
import { animatePlane } from "./environment/animatePlane";
import { createLights } from "./environment/createLights";

export const initThree = () => {
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();

  const {width, height} = getWindowSize();
  const plane = createPlane(width, height);
  scene.add(plane)

  const lights = createLights();
  scene.add(...lights)

  updateSizes(camera, renderer);
  window.addEventListener("resize", () => updateSizes(camera, renderer));

  const tick = () => {
    renderer.render(scene, camera);
    animatePlane(plane);
    requestAnimationFrame(tick)
  }

  tick();

  return {renderer};
}