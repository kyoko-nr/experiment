import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/Addons.js";

const noise = new SimplexNoise();
const XY_COEF = 50;
const Z_COEF = 10;

export const animatePlane = (plane: THREE.Mesh) => {
  const position = plane.geometry.getAttribute("position");
  const time = Date.now() * 0.01;
  for(let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const nextZ = Math.sin(x * 0.03 + y * 0.02 + Date.now() * 0.002) * 10;
    position.setZ(i, nextZ);
  }
  position.needsUpdate = true;
}