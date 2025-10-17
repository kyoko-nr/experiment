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
    uWaveFrequency: new THREE.Uniform(guiConfig.capsule.uWaveFrequency),
    uWaveAmplitude: new THREE.Uniform(guiConfig.capsule.uWaveAmplitude),
    uHelixFrequency: new THREE.Uniform(guiConfig.capsule.uHelixFrequency),
    uHelixAmplitude: new THREE.Uniform(guiConfig.capsule.uHelixAmplitude),
    uHelixRadius: new THREE.Uniform(guiConfig.capsule.uHelixRadius),
    uHelixPitch: new THREE.Uniform(guiConfig.capsule.uHelixPitch),
    uRotation: new THREE.Uniform(
      new THREE.Vector3(
        guiConfig.capsule.rotation.x,
        guiConfig.capsule.rotation.y,
        guiConfig.capsule.rotation.z,
      ),
    ),
    uLightDir: new THREE.Uniform(
      new THREE.Vector3(guiConfig.light.x, guiConfig.light.y, guiConfig.light.z),
    ),
    uLightColor: new THREE.Uniform(new THREE.Color(guiConfig.capsule.uLightColor)),
    uShadowColor: new THREE.Uniform(new THREE.Color(guiConfig.capsule.uShadowColor)),
  };

  const capsuleMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    vertexShader,
    fragmentShader,
    uniforms,
    roughness: 0.8,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  capsuleMaterial.name = "CapsuleWaveMaterial";

  const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsule.receiveShadow = true;

  return capsule;
};

export const updateCapsules = (params: { capsule: THREE.Mesh; lightDir: THREE.Vector3 }) => {
  const { capsule, lightDir } = params;
  const uniforms = (capsule.material as THREE.ShaderMaterial).uniforms;

  uniforms.uDeformType.value = guiConfig.capsule.mode;
  uniforms.uWaveFrequency.value = guiConfig.capsule.uWaveFrequency;
  uniforms.uWaveAmplitude.value = guiConfig.capsule.uWaveAmplitude;
  uniforms.uHelixFrequency.value = guiConfig.capsule.uHelixFrequency;
  uniforms.uHelixAmplitude.value = guiConfig.capsule.uHelixAmplitude;
  uniforms.uHelixRadius.value = guiConfig.capsule.uHelixRadius;
  uniforms.uHelixPitch.value = guiConfig.capsule.uHelixPitch;
  uniforms.uRotation.value.set(
    guiConfig.capsule.rotation.x,
    guiConfig.capsule.rotation.y,
    guiConfig.capsule.rotation.z,
  );
  uniforms.uLightColor.value?.set(guiConfig.capsule.uLightColor);
  uniforms.uShadowColor.value?.set(guiConfig.capsule.uShadowColor);
  uniforms.uLightDir.value.copy(lightDir);
};
