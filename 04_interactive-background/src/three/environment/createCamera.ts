import * as THREE from "three";

const FOV = 75;
const POS = {x: 0, y:0, z:75}

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(FOV);
  camera.position.z = 5;
  return camera;
}