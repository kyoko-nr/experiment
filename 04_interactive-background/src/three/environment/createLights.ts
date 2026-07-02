import * as THREE from "three";

const baseConf = {
  color: 0x0E09DC,
  intensity: 0.9,
  x: 0,
  y: 8,
  z: 16
}

const lightConfs = [
  baseConf,
  {...baseConf, color: 0x1CD1E1, x: 23, y: 18, z: 10},
  {...baseConf, color: 0xffadf0, x: 26, y: 10, z: -2},
]

export const createLights = () => {
  const lights: THREE.Object3D[] = [];
  // const helpers: THREE.Object3D[] = []
  for(const conf of lightConfs) {
    const light = new THREE.DirectionalLight(conf.color, conf.intensity);
    // const helper = new THREE.DirectionalLightHelper(light, 3);
    light.position.set(conf.x, conf.y, conf.z);
    // helper.position.set(conf.x, conf.y, conf.z);
    lights.push(light);
    // helpers.push(helper);
  }
  // createGui(lights)

  const ambLight = new THREE.AmbientLight(0xffffff, 0.3);

  return [...lights, ambLight];
}
