import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import vertexShader from "./shaders/capsule/vertex.glsl";

export const createCapsule = (): THREE.Mesh => {
  const capsuleGeometry = new THREE.CapsuleGeometry(0.5 / 3, 1.4 * 5, 24, 64);

  const uniforms = {
    uFrequency: new THREE.Uniform(2.6),
    uWaveAmplitude: new THREE.Uniform(0.45),
  };

  const capsuleMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    vertexShader,
    uniforms,
    color: new THREE.Color(0x2e7dab),
    roughness: 0.4,
    metalness: 0.15,
  });
  capsuleMaterial.name = "CapsuleWaveMaterial";

  const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsule.castShadow = true;
  capsule.receiveShadow = true;
  capsule.position.y = 1;

  const depthMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshDepthMaterial,
    vertexShader,
    uniforms,
    depthPacking: THREE.RGBADepthPacking,
  });
  capsule.customDepthMaterial = depthMaterial;

  const distanceMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshDistanceMaterial,
    vertexShader,
    uniforms,
  });
  capsule.customDistanceMaterial = distanceMaterial;

  return capsule;
};
