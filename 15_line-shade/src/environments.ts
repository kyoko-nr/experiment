import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { guiConfig } from "./gui";

type EnvironmentConfig = {
  app: HTMLDivElement;
  sizes: {
    width: number;
    height: number;
  };
};

const ORIGIN = new THREE.Vector3(0, 0, 0);

export const createEnvironment = ({ app, sizes }: EnvironmentConfig) => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(guiConfig.environment.backgroundColor, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  app.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 0, 6);
  scene.add(camera);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const floorGeometry = new THREE.PlaneGeometry(12, 12);
  const floorMaterial = new THREE.ShadowMaterial({
    opacity: 0.25,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
  directionalLight.position.set(guiConfig.light.x, guiConfig.light.y, guiConfig.light.z);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 20;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;
  scene.add(directionalLight);

  // DirectionalLight のヘルパー
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
  // scene.add(directionalLightHelper);

  const clock = new THREE.Clock();

  return {
    scene,
    camera,
    renderer,
    clock,
    controls,
    directionalLight,
    directionalLightHelper,
  };
};

/**
 * カメラを原点(0, 0, 0)を見つめたまま、Y軸回りに周回させる。
 * x と z をほんの少し揺らしてアクセントをつける。
 */
export const updateCamera = (camera: THREE.PerspectiveCamera, elapsedTime: number) => {
  const radius = 6; // 周回半径（初期位置に合わせる）
  const angularSpeed = 0.35; // 回転速度（遅め）

  const baseX = Math.cos(elapsedTime * angularSpeed) * radius;
  const baseZ = Math.sin(elapsedTime * angularSpeed) * radius;

  // アクセント（ごく小さな揺れ）
  const wobbleX = Math.cos(elapsedTime * 0.5) * 0.9 + 0.5;

  camera.position.set(baseX + wobbleX, 0, baseZ);
  camera.lookAt(ORIGIN);
};
