import * as THREE from "three";

/**
 * Create meshes
 * @returns {THREE.Group}
 */
export const createMeshes = () => {
  const group = new THREE.Group();

  const material = new THREE.MeshNormalMaterial();

  // Torus knot
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
    material
  );
  torusKnot.position.x = 3
  torusKnot.name = 'torusKnot';
  group.add(torusKnot);

  // Donut
  const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.3, 128, 32),
    material
  );
  donut.position.x = - 3;
  donut.name = 'donut';
  group.add(donut);

  // Cube
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    material
  );
  cube.name = 'cube';
  group.add(cube);

  return group;
}