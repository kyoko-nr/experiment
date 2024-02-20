import * as THREE from "three";
import { getGui } from "../gui/gui";

const lightConfs = {
  light1Color : 0x0E09DC,
  ight2Color :0x1CD1E1,
  light3Color: 0x18C02C,
  light4Color: 0xee3bcf,
  intensity: 0.9,
  dist: 500
}

const lightConf1 = {
  color: 0x0E09DC,
  intensity: 0.9,
  dist: 500,
  x: 10,
  y: 10,
  z: 30
}
const lightConf2 = {...lightConf1, color: 0x1CD1E1, x: -10, y: 10, z: 30}
const lightConf3 = {...lightConf1, color: 0x18C02C, x: 30, y: 30, z: 20}
const lightConf4 = {...lightConf1, color: 0xee3bcf, x: -30, y: -10, z: 20}

export const createLights = () => {
  const light1 = new THREE.DirectionalLight(lightConf1.color, lightConf1.intensity)
  light1.position.set(lightConf1.x, lightConf1.y, lightConf1.z);
  const helper1 = new THREE.DirectionalLightHelper(light1, 5)
  helper1.position.set(lightConf1.x, lightConf1.y, lightConf1.z)

  const light2 = new THREE.DirectionalLight(lightConf2.color, lightConf2.intensity);
  light2.position.set(lightConf2.x, lightConf2.y, lightConf2.z);
  const helper2 = new THREE.DirectionalLightHelper(light2, 5)
  helper2.position.set(lightConf2.x, lightConf2.y, lightConf2.z)

  const light3 = new THREE.DirectionalLight(lightConf3.color, lightConf3.intensity);
  light3.position.set(lightConf3.x, lightConf3.y, lightConf3.z);

  const light4 = new THREE.DirectionalLight(lightConf4.color, lightConf4.intensity);
  light4.position.set(lightConf4.x, lightConf4.y, lightConf4.z);

  return [light1, light2, light3, light4, helper1, helper2]
}

// const createGui = () => {
//   const gui = getGui();
//   const folder = gui.addFolder("light1");
//   folder.addColor(lightConf1, "color")
//   folder.add(lightConf1, "y", 0, 500, 1)
//   folder.add(lightConf1, "z", 0, 500, 1)
//   folder.add(lightConf1, "dist", 0, 1000, 1)
// }

// createGui();