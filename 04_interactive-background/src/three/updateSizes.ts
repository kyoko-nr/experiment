import { getWindowSize } from "./logics/getWindowSize";

/**
 * Update renderer and camera sizes.
 * @param camera
 * @param renderer
 */
export const updateSizes = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  const {width, height} = getWindowSize();

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}