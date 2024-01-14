import { createRenderer } from "./environment/createRenderer";
import { createCamera } from "./environment/createCamera";
import { updateSizes } from "./updateSizes";
import { createScene } from "./environment/createScene";
import { createPlane } from "./environment/createPlane";
import { getWindowSize } from "./logics/getWindowSize";
import * as THREE from "three";

export const initThree = () => {
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();

  const {width, height} = getWindowSize();
  const plane = createPlane(width, height);
  scene.add(plane)

  updateSizes(camera, renderer);
  document.addEventListener("resize", () => updateSizes(camera, renderer));

  renderer.render(scene, camera);

  return {renderer};
}