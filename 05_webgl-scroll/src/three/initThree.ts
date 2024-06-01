import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { createImagePlane } from "./createImagePlane";
import { animateImagePlane } from "./animateImagePlane";
import { getScrollAmount } from "../utils/getScrollAmount";

const FOV = 60;

const createRenderer = () => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
};

const createCamera = () => {
  const fov = FOV;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = window.innerHeight / 2 / Math.tan(fovRad);
  const camera = new PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = dist;
  return camera;
};

const createScene = () => {
  return new Scene();
};

/**
 * initialize three objects
 * @param images HTMLImageElement
 * @returns
 */
export const initThree = (images: HTMLImageElement[]) => {
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();

  const imagePlanes = images.map((img) => createImagePlane(img));

  scene.add(...imagePlanes.map((ip) => ip.mesh));

  const updatePlanes = () => {
    imagePlanes.forEach((ip) => animateImagePlane(ip, getScrollAmount()));
  };

  return { renderer, camera, scene, updatePlanes };
};
