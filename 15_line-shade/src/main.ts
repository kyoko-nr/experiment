import "./style.css";
import { createCapsule, updateCapsules } from "./createCapsule";
import { createEnvironment } from "./createEnvironment";
import { setupGUI, guiConfig } from "./gui";
import * as THREE from "three";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりませんでした。");
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const { scene, camera, renderer, controls, directionalLight, directionalLightHelper } =
  createEnvironment({
    app,
    sizes,
  });

const capsule = createCapsule();
scene.add(capsule);

// GUI 設定（configを書き換える）
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
  // 毎フレーム、configから値を参照して反映
  directionalLight.position.set(guiConfig.light.x, guiConfig.light.y, guiConfig.light.z);
  // ライトヘルパーの更新
  directionalLightHelper.update();

  // ライトの向きを算出
  const lightDir = new THREE.Vector3();
  const target = new THREE.Vector3();
  directionalLight.getWorldPosition(lightDir);
  const lightDirW = target.clone().sub(lightDir).normalize();

  // capsuleの描画更新
  updateCapsules({ capsule, lightDir: lightDirW });
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
