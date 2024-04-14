import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { getGui } from "../gui/gui";
import { interactP } from "../../interaction";

const noise = new SimplexNoise();
const animConfs = {
  height: 7.5,
  xVolume: 20.0,
  yVolume: 7.5,
  speed: 0.0001,
}

export const animatePlane = (plane: THREE.Mesh) => {
  const position = plane.geometry.getAttribute("position");

  for(let i = 0; i < position.count; i++) {
    const time = Date.now() * animConfs.speed;
    const x = position.getX(i);
    const y = position.getY(i);

    const n = noise.noise3d(x / (animConfs.xVolume * (1.0 - interactP.x) + 10.0), y/animConfs.yVolume, time) * animConfs.height * (2.0 -interactP.y);

    position.setZ(i, n);
  }
  position.needsUpdate = true;
}

const createGui = () => {
  const gui = getGui();
  const folder = gui.addFolder("animation");
  folder.add(animConfs, "height", 0, 10, 0.1);
  folder.add(animConfs, "xVolume", 0, 10, 0.1);
  folder.add(animConfs, "yVolume", 0, 10, 0.1);
  folder.add(animConfs, "speed", 0.00001, 0.001, 0.00001);
}

createGui();