import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
} from "three";
import { createPicture } from "./createPicture";

const FOV = 60;

const createRenderer = () => {
  const renderer = new WebGLRenderer();
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

export const initThree = () => {
  const renderer = createRenderer();
  const camera = createCamera();
  const scene = createScene();

  const geo = new BoxGeometry(100, 100, 100);
  const mat = new MeshNormalMaterial();
  const box = new Mesh(geo, mat);

  const picture = createPicture();

  scene.add(box);
  scene.add(picture);

  return { renderer, camera, scene };
};
