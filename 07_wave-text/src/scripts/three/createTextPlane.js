import * as THREE from "three";
import textureSrc from "../../../assets/text.png";
import noiseSrc from "../../../assets/noise.png";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const loader = new THREE.TextureLoader();

/**
 * Create text plane.
 * @returns THREE.Mesh
 */
export const createTextPlane = () => {
  const texture = loader.load(textureSrc);
  texture.offset.x = 0.5;

  const noise = loader.load(noiseSrc);
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

  // const material = new THREE.MeshBasicMaterial({
  //   map: texture,
  // });
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uNoise: new THREE.Uniform(noise),
      uTexture: new THREE.Uniform(texture),
      uTime: new THREE.Uniform(0),
    },
    wireframe: true,
  });
  const plane = new THREE.Mesh(geometry, material);

  return plane;
};
