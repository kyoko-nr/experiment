import * as THREE from "three";
import toonVertexShader from "./shaders/toonshader/vertex.glsl?raw";
import toonFragmentShader from "./shaders/toonshader/fragment.glsl?raw";
import { getGui } from "./getGui";

const materialParams = {
  isEdge: false,
  edgeWidth: 0.05,
}

/**
 * Create meshes
 * @returns {THREE.Group}
 */
export const createMeshes = () => {
  const group = new THREE.Group();
  const gui = getGui();

  const material = new THREE.ShaderMaterial({
    vertexShader: toonVertexShader,
    fragmentShader: toonFragmentShader,
    uniforms: {
      uIsEdge: new THREE.Uniform(false),
      uEdgeWidth: new THREE.Uniform(materialParams.edgeWidth),
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

  // ------GUI------
  gui.add(materialParams, "isEdge")
    .onChange(() => material.uniforms.uIsEdge.value = materialParams.isEdge);
  gui.add(materialParams, "edgeWidth")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(() => material.uniforms.uEdgeWidth.value = materialParams.edgeWidth);

  return group;
}