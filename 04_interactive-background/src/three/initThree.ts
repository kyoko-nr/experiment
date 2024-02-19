import { createRenderer } from "./environment/createRenderer";
import { createCamera } from "./environment/createCamera";
import { updateSizes } from "./updateSizes";
import { createScene } from "./environment/createScene";
import { createPlane } from "./environment/createPlane";
import { getWindowSize } from "./logics/getWindowSize";

export const initThree = () => {
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();

  const {width, height} = getWindowSize();
  const plane = createPlane(width, height);
  scene.add(plane)

  updateSizes(camera, renderer);
  document.addEventListener("resize", () => updateSizes(camera, renderer));

  const tick = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(tick)
  }

  tick();

  return {renderer};
}