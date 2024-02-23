import * as THREE from "three";
import { getGui } from "../gui/gui";

const FOV = 100;
const POS_Z = 25;

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(FOV);
  camera.position.z = POS_Z;

  createGui(camera);
  return camera;
}

const createGui = (camera: THREE.PerspectiveCamera) => {
  const gui = getGui();
  const folder = gui.addFolder("camera");
  folder.add(camera, "fov", 10, 200);
  folder.add(camera.position, "x", -200, 200)
  folder.add(camera.position, "y", -200, 200)
  folder.add(camera.position, "z", -300, 300)
}