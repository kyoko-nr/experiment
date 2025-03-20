import * as THREE from "three";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { geomToParticle } from "../utils/geomToParticle";
import gui from "../gui/addGui";
import { getSize } from "../utils/getSize";

const params = {
  pointSize: 1.8,
  pointColor: "#eff25a",
};

/**
 * Particles class
 */
export class Particles {
  constructor() {
    this.createMaterial();
    const planeGeom = this.createPlaneGeom();
    // const plane = new THREE.Mesh(planeGeom, this.material);
    const plane = new THREE.Points(planeGeom, this.material);

    this.particles = plane;

    // const sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
    // sphereGeometry.setIndex(null);
    // const sphereVertices = sphereGeometry.attributes.position.array;
    // const particleCount = sphereVertices.length / 3;

    // const positions = new Float32Array(particleCount * 3);
    // const initialPositions = new Float32Array(particleCount * 3);

    // for (let i = 0; i < particleCount; i++) {
    //   positions[i * 3] = sphereVertices[i * 3];
    //   positions[i * 3 + 1] = sphereVertices[i * 3 + 1];
    //   positions[i * 3 + 2] = sphereVertices[i * 3 + 2];

    //   initialPositions[i * 3] = sphereVertices[i * 3];
    //   initialPositions[i * 3 + 1] = sphereVertices[i * 3 + 1];
    //   initialPositions[i * 3 + 2] = 0;
    // }

    // this.geometry = new THREE.BufferGeometry();
    // this.geometry.setAttribute(
    //   "position",
    //   new THREE.BufferAttribute(positions, 3)
    // );
    // this.geometry.setAttribute(
    //   "initialPosition",
    //   new THREE.BufferAttribute(initialPositions, 3)
    // );

    // this.particles = new THREE.Points(this.geometry, this.material);

    // ----------GUI----------
    this.addGui();
  }

  /**
   * Create wave
   * @param {THREE.ShaderMaterial} material
   */
  createPlaneGeom() {
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 20, 20);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(geomToParticle(planeGeometry), 3)
    );
    planeGeometry.setIndex(null);
    return geom;
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
        uIndex: new THREE.Uniform(0),
        uTime: new THREE.Uniform(0),
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

  addGui() {
    gui.add(params, "pointSize", 0.01, 5, 0.01).onChange(() => {
      this.material.uniforms.uPointSize.value = params.pointSize;
    });
    gui.addColor(params, "pointColor").onChange(() => {
      this.material.uniforms.uPointColor.value.set(params.pointColor);
    });
  }

  onResize() {
    const size = getSize();
    const resolution = new THREE.Vector2(
      size.width * size.dpr,
      size.height * size.dpr
    );
    console.log(resolution);
    this.material.uniforms.uResolution.value = resolution;
  }
}
