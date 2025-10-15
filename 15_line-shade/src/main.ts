import "./style.css";
import { createCapsule } from "./createCapsule";
import { createEnvironment } from "./createEnvironment";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりませんでした。");
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const { scene, camera, renderer, clock } = createEnvironment({
  app,
  sizes,
});

const capsule = createCapsule();
scene.add(capsule);

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
  const delta = clock.getDelta();

  capsule.rotation.x += 0.3 * delta;
  capsule.rotation.y += 0.4 * delta;

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
