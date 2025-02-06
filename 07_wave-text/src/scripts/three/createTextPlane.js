import * as THREE from "three";
import textureSrc from "../../../assets/text.png";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const loader = new THREE.TextureLoader();

/**
 * Create text plane.
 * @returns THREE.Mesh
 */
export const createTextPlane = () => {
  const texture = loader.load(textureSrc);

  const geometry = new THREE.PlaneGeometry(15, 15, 64, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: new THREE.Uniform(texture),
    },
    // wireframe: true,
  });
  const plane = new THREE.Mesh(geometry, material);

  return plane;
};
