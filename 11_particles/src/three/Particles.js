import * as THREE from "three";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { geomToParticle } from "../utils/geomToParticle";
import gui from "../gui/addGui";
import { getSize } from "../utils/getSize";

const params = {
  pointSize: 1.8,
  minPointSize: 0.3,
  pointColor: "#eff25a",
  currentIndex: 0,
  targetIndex: 1,
  positions: [],
  positionProgress: 0,
};

/**
 * Particles class
 */
export class Particles {
  constructor() {
    this.createMaterial();

    const geoms = [
      new THREE.PlaneGeometry(5, 5, 20, 20),
      new THREE.SphereGeometry(1.5, 24, 24),
    ];
    const maxCount = Math.max(...geoms.map((g) => g.attributes.position.count));
    const positions = geoms.map((g) => geomToParticle(g, maxCount));
    const random = new Float32Array(maxCount);
    for (let i = 0; i < maxCount; i++) {
      random[i] = Math.random();
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions[params.currentIndex], 3)
    );
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "aTargetPosition",
      new THREE.BufferAttribute(positions[params.targetIndex], 3)
    );

    const particle = new THREE.Points(this.geometry, this.material);

    this.particles = particle;

    // ----------GUI----------
    this.addGui();
  }

  createMaterial() {
    const size = getSize();
    const resolution = new THREE.Vector2(
      size.width * size.dpr,
      size.height * size.dpr
    );
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uPointSize: new THREE.Uniform(params.pointSize),
        uResolution: new THREE.Uniform(resolution),
        uPointColor: new THREE.Uniform(new THREE.Color(params.pointColor)),
        uTime: new THREE.Uniform(0),
        uPositionProgress: new THREE.Uniform(params.positionProgress),
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      wireframe: true,
    });
  }

  /**
   * Update material
   * @param {number} elapsedTime elapsed time
   */
  updateMaterial(elapsedTime) {
    this.material.uniforms.uTime.value = elapsedTime;
  }

  /**
   * Update point size animation
   * @memberof Particles
   */
  updatePointSizeAnim(progress) {
    const size = (params.pointSize - params.minPointSize) * progress;
    const newSize = params.pointSize - size;
    this.material.uniforms.uPointSize.value = newSize;
  }

  addGui() {
    gui.add(params, "pointSize", 0.01, 5, 0.01).onChange(() => {
      this.material.uniforms.uPointSize.value = params.pointSize;
    });
    gui.add(params, "minPointSize", 0.01, 1, 0.01).onChange(() => {
      this.material.uniforms.uPointSize.value = params.pointSize;
    });
    gui.addColor(params, "pointColor").onChange(() => {
      this.material.uniforms.uPointColor.value.set(params.pointColor);
    });
    gui.add(params, "positionProgress", 0, 1, 0.01).onChange(() => {
      this.material.uniforms.uPositionProgress.value = params.positionProgress;
    });
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
    this.material.uniforms.uResolution.value = resolution;
  }
}
