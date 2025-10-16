import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import vertexShader from "./shaders/capsule/vertex.glsl";
import fragmentShader from "./shaders/capsule/fragment.glsl";
import { guiConfig } from "./gui";

export const createCapsule = (): THREE.Mesh => {
  const capsuleGeometry = new THREE.CapsuleGeometry(0.3, 5, 12, 24, 128);
  capsuleGeometry.rotateZ(Math.PI * 0.5);

  const uniforms = {
    uDeformType: new THREE.Uniform(guiConfig.capsule.mode),
    uFrequency: new THREE.Uniform(guiConfig.capsule.uFrequency),
    uWaveAmplitude: new THREE.Uniform(guiConfig.capsule.uWaveAmplitude),
    uLightDir: new THREE.Uniform(
      new THREE.Vector3(guiConfig.light.x, guiConfig.light.y, guiConfig.light.z),
    ),
    uLightColor: new THREE.Uniform(new THREE.Color(guiConfig.capsule.uLightColor)),
    uShadowColor: new THREE.Uniform(new THREE.Color(guiConfig.capsule.uShadowColor)),
    uElapsedTime: new THREE.Uniform(0),
  };

  const capsuleMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    vertexShader,
    fragmentShader,
    uniforms,
    roughness: 0.8,
    metalness: 0,
    side: THREE.FrontSide,
    depthTest: true,
    depthWrite: true,
    transparent: false,
  });
  capsuleMaterial.name = "CapsuleWaveMaterial";

  const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsule.receiveShadow = true;

  return capsule;
};

export const updateCapsules = (params: {
  capsule: THREE.Mesh;
  elapsedTime: number;
  lightDir: THREE.Vector3;
}) => {
  const { capsule, elapsedTime, lightDir } = params;
  const uniforms = (capsule.material as THREE.ShaderMaterial).uniforms;

  uniforms.uElapsedTime.value = elapsedTime;
  uniforms.uDeformType.value = guiConfig.capsule.mode;
  uniforms.uFrequency.value = guiConfig.capsule.uFrequency;
  uniforms.uWaveAmplitude.value = guiConfig.capsule.uWaveAmplitude;
  uniforms.uLightColor.value?.set(guiConfig.capsule.uLightColor);
  uniforms.uShadowColor.value?.set(guiConfig.capsule.uShadowColor);
  uniforms.uLightDir.value.copy(lightDir);
};
