import * as THREE from "three";

const FOV = 100;
const POS_Z = 25;

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(FOV);
  camera.position.z = POS_Z;

  // createGui(camera);
  return camera;
}
