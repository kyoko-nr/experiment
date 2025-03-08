import * as THREE from "three";
import toonVertexShader from "./shaders/toonshader/vertex.glsl?raw";
import toonFragmentShader from "./shaders/toonshader/fragment.glsl?raw";
import { getGui } from "./getGui";

const loader = new THREE.TextureLoader();

const materialParams = {
  isEdge: false,
  edgeWidth: 0.05,
  lightPosition: new THREE.Vector3(-1.1, 1, 0.2),
  color: "#faeecc",
  halftoneColor: "#e18eb6",
  halftonePosition: new THREE.Vector3(0.6, -1.3, -0.001),
}

export const createMaterial = () => {
  const texture = loader.load("/assets/toon.png");
  const material = new THREE.ShaderMaterial({
    vertexShader: toonVertexShader,
    fragmentShader: toonFragmentShader,
    uniforms: {
      uIsEdge: new THREE.Uniform(false),
      uEdgeWidth: new THREE.Uniform(materialParams.edgeWidth),
      uTexture: new THREE.Uniform(texture),
      uLightPosition: new THREE.Uniform(materialParams.lightPosition),
      uColor: new THREE.Uniform(new THREE.Color(materialParams.color)),
      uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
      uHalftoneColor: new THREE.Uniform(new THREE.Color(materialParams.halftoneColor)),
      uHalftonePosition: new THREE.Uniform(materialParams.halftonePosition),
    }
  })
  addGui(material);
  return material;
}

const addGui = (material) => {
  const gui = getGui();
    gui.add(materialParams, "isEdge")
    .onChange(() => material.uniforms.uIsEdge.value = materialParams.isEdge);
  gui.add(materialParams, "edgeWidth")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(() => material.uniforms.uEdgeWidth.value = materialParams.edgeWidth);
  gui.addColor(materialParams, "color")
    .onChange(() => material.uniforms.uColor.value.set(materialParams.color));
  const light = gui.addFolder("light")
  light.add(materialParams.lightPosition, "x")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uLightPosition.value = new THREE.Vector3(materialParams.lightPosition.x, materialParams.lightPosition.y, materialParams.lightPosition.z));
  light.add(materialParams.lightPosition, "y")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uLightPosition.value = new THREE.Vector3(materialParams.lightPosition.x, materialParams.lightPosition.y, materialParams.lightPosition.z));
  light.add(materialParams.lightPosition, "z")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uLightPosition.value = new THREE.Vector3(materialParams.lightPosition.x, materialParams.lightPosition.y, materialParams.lightPosition.z));
  const halftone = gui.addFolder("halftone")
  halftone.addColor(materialParams, "halftoneColor")
  .onChange(() => material.uniforms.uHalftoneColor.value.set(materialParams.halftoneColor));
  halftone.add(materialParams.halftonePosition, "x")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uHalftonePosition.value = new THREE.Vector3(materialParams.halftonePosition.x, materialParams.halftonePosition.y, materialParams.halftonePosition.z));
  halftone.add(materialParams.halftonePosition, "y")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uHalftonePosition.value = new THREE.Vector3(materialParams.halftonePosition.x, materialParams.halftonePosition.y, materialParams.halftonePosition.z))
  halftone.add(materialParams.halftonePosition, "z")
    .min(-10)
    .max(10)
    .step(0.1)
    .onChange(() => material.uniforms.uHalftonePosition.value = new THREE.Vector3(materialParams.halftonePosition.x, materialParams.halftonePosition.y, materialParams.halftonePosition.z));
}