import "./style.css";
import * as THREE from "three";
import { createEnvironment } from "./environments";
import { createBlob } from "./blobs";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりませんでした。");
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const { scene, camera, renderer, controls, directionalLight, clock } =
  createEnvironment({
    app,
    sizes,
  });

const blob = createBlob();
scene.add(blob);

const onResize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);

const tick = () => {
  controls.update();
  clock.getElapsedTime();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
