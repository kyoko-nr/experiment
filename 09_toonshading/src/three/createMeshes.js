import * as THREE from "three";
import toonVertexShader from "./shaders/toonshader/vertex.glsl?raw";
import toonFragmentShader from "./shaders/toonshader/fragment.glsl?raw";
import { getGui } from "./getGui";

const materialParams = {
  isEdge: false,
  edgeWidth: 0.05,
  lightPosition: new THREE.Vector3(-1.1, 1, 0.2),
  color: "#a9eecc",
}

const loader = new THREE.TextureLoader();

/**
 * Create meshes
 * @returns {THREE.Group}
 */
export const createMeshes = () => {
  const group = new THREE.Group();

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
    }
  })

  // Torus knot
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
    material
  );
  torusKnot.position.x = 3
  torusKnot.name = 'torusKnot';
  group.add(torusKnot);

  // Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    material
  );
  sphere.position.x = - 3;
  sphere.name = 'sphere';
  group.add(sphere);

  // Cube
  const cube = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 1),
    material
  );
  cube.name = 'cube';
  group.add(cube);

  addGui(material);

  return group;
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
}