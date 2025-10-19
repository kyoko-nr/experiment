import "./style.css";
import { createBlob, updateBlob } from "./blobs";
import { createEnvironment } from "./environments";
import { setupGUI } from "./gui";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりませんでした。");
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const { scene, camera, renderer, controls, clock } = createEnvironment({
  app,
  sizes,
});

const blob = createBlob();
scene.add(blob);

setupGUI();

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
  const elapsed = clock.getElapsedTime();

  updateBlob(blob, elapsed);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
