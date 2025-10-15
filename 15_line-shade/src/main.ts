import "./style.css";
import { createCapsule } from "./createCapsule";
import { createEnvironment } from "./createEnvironment";
import GUI from "lil-gui";
import type { Material } from "three";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app が見つかりませんでした。");
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const { scene, camera, renderer, controls, directionalLight } = createEnvironment({
  app,
  sizes,
});

const capsule = createCapsule();
scene.add(capsule);

// GUI
const gui = new GUI();

// Directional Light position controls
const lightFolder = gui.addFolder("DirectionalLight");
lightFolder.add(directionalLight.position, "x", -10, 10, 0.1).name("posX");
lightFolder.add(directionalLight.position, "y", -10, 10, 0.1).name("posY");
lightFolder.add(directionalLight.position, "z", -10, 10, 0.1).name("posZ");

// Capsule shader uniforms controls
// Access uniforms from CustomShaderMaterial (shared across depth/distance materials)
type WaveUniforms = {
  uFrequency: { value: number };
  uWaveAmplitude: { value: number };
};
type UniformsMaterial = Material & { uniforms: WaveUniforms };

const capsuleMaterial = capsule.material as UniformsMaterial;
const uniforms = capsuleMaterial.uniforms;

const waveFolder = gui.addFolder("Capsule Wave");
waveFolder.add(uniforms.uFrequency, "value", 0, 10, 0.01).name("uFrequency");
waveFolder.add(uniforms.uWaveAmplitude, "value", 0, 2, 0.01).name("uWaveAmplitude");

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
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
