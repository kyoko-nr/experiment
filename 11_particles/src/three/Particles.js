import * as THREE from "three";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

/**
 * Particles class
 */
export class Particles {
  constructor() {
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 32); // Increased segments for smoother sphere
    const sphereVertices = sphereGeometry.attributes.position.array;
    const particleCount = sphereVertices.length / 3;

    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = sphereVertices[i * 3];
      positions[i * 3 + 1] = sphereVertices[i * 3 + 1];
      positions[i * 3 + 2] = sphereVertices[i * 3 + 2];

      initialPositions[i * 3] = sphereVertices[i * 3];
      initialPositions[i * 3 + 1] = sphereVertices[i * 3 + 1];
      initialPositions[i * 3 + 2] = 0;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "initialPosition",
      new THREE.BufferAttribute(initialPositions, 3)
    );

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        mouse: { value: new THREE.Vector3() },
        mouseRadius: { value: 1.0 },
        returnSpeed: { value: 2.0 },
        interaction: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particles = new THREE.Points(this.geometry, this.material);
  }

  /**
   * Update material
   * @param {number} elapsedTime elapsed time
   */
  updateMaterial(elapsedTime) {
    this.material.uniforms.time.value = elapsedTime;
  }
}
