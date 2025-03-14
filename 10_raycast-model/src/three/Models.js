import * as THREE from "three";

/**
 * Models
 */
export class Models {
  /**
   * Constructor
   */
  constructor() {
    const material = new THREE.ShaderMaterial();

    // Torus knot
    this.torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
      material
    );
    this.torusKnot.position.x = 3

    // Donut
    this.donut = new THREE.Mesh(
      new THREE.TorusGeometry(0.65, 0.3, 128, 32),
      material
    );
    this.donut.position.x = - 3;

    // Cube
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      material
    );
  }

  get group() {
    const group = new THREE.Group();
    group.add(this.torusKnot);
    group.add(this.donut);
    group.add(this.cube);
    return group;
  }

  /**
   * Animate models
   * @param {number} elapsedTime
   */
  animate(elapsedTime) {
    this.cube.rotation.y = elapsedTime * 0.18;
    this.cube.rotation.z = elapsedTime * 0.19;
    this.torusKnot.rotation.y = elapsedTime * 0.1;
    this.torusKnot.rotation.z = elapsedTime * 0.15;
    this.donut.rotation.y = elapsedTime * 0.12;
    this.donut.rotation.z = elapsedTime * 0.14;
  }
}