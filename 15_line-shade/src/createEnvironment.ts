import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type EnvironmentConfig = {
  app: HTMLDivElement;
  sizes: {
    width: number;
    height: number;
  };
};

export type Environment = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  controls: OrbitControls;
};

export const createEnvironment = ({ app, sizes }: EnvironmentConfig): Environment => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  app.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(3, 3.5, 6);
  camera.lookAt(0, 0.75, 0);
  scene.add(camera);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.75, 0);
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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
  directionalLight.position.set(-4, 6, -2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 20;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;
  scene.add(directionalLight);

  const clock = new THREE.Clock();

  return {
    scene,
    camera,
    renderer,
    clock,
    controls,
  };
};
