import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import vertexShader from "./shaders/vertex.glsl";

export const createBlob = (): THREE.Mesh => {
  const geometry = new THREE.SphereGeometry(1, 64, 64);

  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    vertexShader,
    roughness: 0.5,
    metalness: 0.1,
  });

  return new THREE.Mesh(geometry, material);
};
