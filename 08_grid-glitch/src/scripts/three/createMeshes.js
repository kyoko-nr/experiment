import * as THREE from "three";

/**
 * Create meshes
 * @returns {THREE.Group}
 */
export const createMeshes = () => {
  const group = new THREE.Group();

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });

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

  return group;
}