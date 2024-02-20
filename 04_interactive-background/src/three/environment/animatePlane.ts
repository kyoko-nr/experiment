import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { getGui } from "../gui/gui";

const noise = new SimplexNoise();
const animConfs = {
  allVolume: 1.5,
  xVolume: 1,
  yVolume: 1
}

export const animatePlane = (plane: THREE.Mesh) => {
  const position = plane.geometry.getAttribute("position");

  for(let i = 0; i < position.count; i++) {
    const time = Date.now() * 0.0001;
    const x = position.getX(i);
    const y = position.getY(i);

    const temp = noise.noise(
      x * animConfs.xVolume + time,
      y * animConfs.yVolume + time
      ) * animConfs.allVolume;

    position.setZ(i, temp);
  }
  position.needsUpdate = true;
}

const createGui = () => {
  const gui = getGui();
  const folder = gui.addFolder("animation");
  folder.add(animConfs, "allVolume", 0, 10, 0.1);
  folder.add(animConfs, "xVolume", 0, 10, 0.1);
  folder.add(animConfs, "yVolume", 0, 10, 0.1);
}

createGui();