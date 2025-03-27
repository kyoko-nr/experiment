import * as THREE from "three";
import { getSize } from "../utils/getSize";
import vertexShader from "./shaders/particles/vertex.glsl";
import fragmentShader from "./shaders/particles/fragment.glsl";

/**
 * Particles class
 */
export class Particles {
  private geometry: THREE.BufferGeometry;
  private material: THREE.Material;
  private points: THREE.Points;

  constructor() {
    this.material = this.createMaterial();
    this.geometry = this.createGeometry();

    const points = new THREE.Points(this.geometry, this.material);

    this.points = points;
  }

  get pointsMesh() {
    return this.points;
  }

  createMaterial() {
    const size = getSize();
    const resolution = new THREE.Vector2(
      size.width * size.dpr,
      size.height * size.dpr
    );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: new THREE.Uniform(resolution),
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      wireframe: true,
    });
    return material;
  }

  createGeometry() {
    const geom = new THREE.SphereGeometry(2, 24, 24);
    return geom;
  }

  /**
   * Update on resize
   */
  onResize() {
    const size = getSize();
    const resolution = new THREE.Vector2(
      size.width * size.dpr,
      size.height * size.dpr
    );
    // this.material.uniforms.uResolution.value = resolution;
  }
}
