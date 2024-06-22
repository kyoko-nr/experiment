import { WebGLRenderer, PerspectiveCamera, Scene } from "three";

const FOV = 60;

const createRenderer = (size: {width: number, height: number}) => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
  return renderer;
};

const createCamera = (size: {width: number, height: number}) => {
  const fov = FOV;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = size.height / 2 / Math.tan(fovRad);
  const camera = new PerspectiveCamera(
    fov,
    size.width / size.height,
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
 * initialize Three.js
 * @param app app element
 */
export const initThree = (app: HTMLDivElement | null, size: {width: number, height: number}) => {
  if(app) {
    const renderer = createRenderer(size);
    const camera = createCamera(size);
    const scene = createScene();

    renderer.render(scene, camera);

    app.appendChild(renderer.domElement)
  }

}