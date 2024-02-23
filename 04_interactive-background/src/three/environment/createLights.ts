import * as THREE from "three";
import { getGui } from "../gui/gui";

const baseConf = {
  color: 0x0E09DC,
  intensity: 1.5,
  x: 10,
  y: 10,
  z: 30
}

const lightConfs = [
  baseConf,
  {...baseConf, color: 0x1CD1E1, x: -10, y: 10, z: 30},
  {...baseConf, color: 0x18C02C, x: 30, y: 30, z: 20},
  // {...baseConf, color: 0xee3bcf, x: -30, y: -10, z: 20}
]

export const createLights = () => {
  const lights: THREE.Object3D[] = [];
  const helpers: THREE.Object3D[] = []
  for(const conf of lightConfs) {
    // const light = new THREE.PointLight(conf.color, conf.intensity, 1000);
    // const helper = new THREE.PointLightHelper(light, 3)
    const light = new THREE.DirectionalLight(conf.color, conf.intensity);
    const helper = new THREE.DirectionalLightHelper(light, 3);
    light.position.set(conf.x, conf.y, conf.z);
    helper.position.set(conf.x, conf.y, conf.z);
    lights.push(light);
    helpers.push(helper);
  }
  createGui(lights)

  return [...lights, ...helpers];
}

const createGui = (lights: THREE.Object3D[]) => {
  const gui = getGui();
  for(const [index, light] of Object.entries(lights)) {
    const folder = gui.addFolder(`light${(Number(index) + 1)}`);
    folder.addColor(light, "color");
    folder.add(light.position, "x", -500, 500, 1);
    folder.add(light.position, "y", -500, 500, 1);
    folder.add(light.position, "z", -500, 500, 1);
  }
}
