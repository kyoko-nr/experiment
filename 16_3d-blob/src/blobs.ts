import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import vertexShader from "./shaders/vertex.glsl";
import { guiConfig } from "./gui";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type BlobUniforms = {
  uElapsedT: THREE.Uniform<number>;
  uFrequency: THREE.Uniform<number>;
  uAmplitude: THREE.Uniform<number>;
};

type BlobMaterial = CustomShaderMaterial & { uniforms: BlobUniforms };

export const createBlob = () => {
  const geometry = mergeVertices(new THREE.SphereGeometry(1, 64, 64));
  geometry.computeTangents();

  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    uniforms: {
      uElapsedT: new THREE.Uniform(0),
      uFrequency: new THREE.Uniform(1.5),
      uAmplitude: new THREE.Uniform(0.3),
    },
    vertexShader,
    roughness: 0.5,
    metalness: 0.1,
  }) as BlobMaterial;

  const blob = new THREE.Mesh(geometry, material);
  //   blob.castShadow = true;
  //   blob.receiveShadow = true;
  return blob;
};

export const updateBlob = (blob: THREE.Mesh, elapsed: number) => {
  const { uniforms } = blob.material as THREE.ShaderMaterial;
  uniforms.uElapsedT.value = elapsed * guiConfig.blob.speed;
  uniforms.uFrequency.value = guiConfig.blob.frequency;
  uniforms.uAmplitude.value = guiConfig.blob.amplitude;
};
