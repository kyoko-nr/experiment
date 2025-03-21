import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { geomToParticle } from "../utils/geomToParticle";
import { getSize } from "../utils/getSize";

const colors = ["#dee137", "#378fe1", "#e15937"];

const params = {
  pointSize: 1.8,
  minPointSize: 0.3,
  moveIntensity: 0.2,
  minMoveIntensity: 0.03,
  currentColorIdx: 0,
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
      new THREE.BufferAttribute(positions[0], 3)
    );
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "aTargetPosition",
      new THREE.BufferAttribute(positions[1], 3)
    );

    const particle = new THREE.Points(this.geometry, this.material);

    this.particles = particle;
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
        uPointColor: new THREE.Uniform(new THREE.Color(colors[0])),
        uTargetPointColor: new THREE.Uniform(new THREE.Color(colors[1])),
        uTime: new THREE.Uniform(0),
        uPositionProgress: new THREE.Uniform(params.positionProgress),
        uPointColorProgress: new THREE.Uniform(0),
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
   * @param {boolean} isForward animation progress
   */
  animatePointSize(isForward) {
    const current = isForward ? params.pointSize : params.minPointSize;
    const target = isForward ? params.minPointSize : params.pointSize;
    gsap.fromTo(
      this.material.uniforms.uPointSize,
      { value: current },
      {
        value: target,
        ease: "cubic.out",
        duration: 1.5,
        overwrite: true,
      }
    );
  }

  /**
   * Update morph animation
   * @param {boolean} isForward
   */
  animateMorph(isForward) {
    const from = isForward ? 0 : 1;
    const to = isForward ? 1 : 0;
    gsap.fromTo(
      this.material.uniforms.uPositionProgress,
      { value: from },
      { value: to, ease: "cubic.out", duration: 1.5, overwrite: true }
    );
  }

  /**
   * Animate point color
   * @param {boolean} isForward
   */
  animatePointColor(isForward) {
    const currentIdx = params.currentColorIdx;
    const targetIdx = isForward ? currentIdx + 1 : currentIdx - 1;
    const currentColor = colors[currentIdx];
    const targetColor = colors[targetIdx];
    this.material.uniforms.uPointColor.value.set(new THREE.Color(currentColor));
    this.material.uniforms.uTargetPointColor.value.set(
      new THREE.Color(targetColor)
    );
    gsap.fromTo(
      this.material.uniforms.uPointColorProgress,
      { value: 0 },
      { value: 1, ease: "cubic.out", duration: 1.5, overwrite: true }
    );
    params.currentColorIdx = targetIdx;
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
