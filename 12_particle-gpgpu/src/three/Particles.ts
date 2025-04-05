import * as THREE from "three";
import {
  GPUComputationRenderer,
  Variable,
} from "three/addons/misc/GPUComputationRenderer.js";
import { getSize } from "../utils/getSize";
import particlesShader from "./shaders/gpgpu/position.glsl";
import vertexShader from "./shaders/particles/vertex.glsl";
import fragmentShader from "./shaders/particles/fragment.glsl";

const WIDTH = 34;
const particles = WIDTH * WIDTH;
const POSITION_RANGE = 2;
const VELOCITY_RANGE = 10;

/**
 * Particles class
 */
export class Particles {
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private points: THREE.Points;
  // GPGPU
  private gpgpuRenderer: GPUComputationRenderer;
  private gpgpuPositionVariable: Variable;
  private gpgpuDebug: THREE.Object3D;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
    // ----------------------------------------
    // GPGPU
    this.gpgpuRenderer = new GPUComputationRenderer(WIDTH, WIDTH, renderer);
    const dtPositionTexture = this.gpgpuRenderer.createTexture();
    const count = particles * 3;
    const dtPosArray = new Float32Array(count * 4);
    // const dtVelocity = this.gpgpuRenderer.createTexture();
    // const dtVelArray = dtVelocity.image.data as Float32Array;
    for (let i = 0; i < count; i++) {
      const i4 = i * 4;
      dtPosArray[i4 + 0] = Math.random() * POSITION_RANGE;
      dtPosArray[i4 + 1] = Math.random() * POSITION_RANGE;
      dtPosArray[i4 + 2] = Math.random() * POSITION_RANGE;
      dtPosArray[i4 + 3] = 1;
      // dtVelArray[i4 + 0] = (Math.random() - 0.5) * VELOCITY_RANGE;
      // dtVelArray[i4 + 1] = (Math.random() - 0.5) * VELOCITY_RANGE;
      // dtVelArray[i4 + 2] = (Math.random() - 0.5) * VELOCITY_RANGE;
      // dtVelArray[i4 + 3] = 1;
    }
    dtPositionTexture.image.data = dtPosArray;
    this.gpgpuPositionVariable = this.gpgpuRenderer.addVariable(
      "uPosition",
      particlesShader,
      dtPositionTexture
    );
    this.gpgpuRenderer.setVariableDependencies(this.gpgpuPositionVariable, [
      this.gpgpuPositionVariable,
    ]);
    this.gpgpuRenderer.init();

    this.gpgpuDebug = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: this.gpgpuRenderer.getCurrentRenderTarget(
          this.gpgpuPositionVariable
        ).texture,
      })
    );
    this.gpgpuDebug.position.set(4, 0, 0);
    scene.add(this.gpgpuDebug);

    // ----------------------------------------
    // Particles
    const uvArray = new Float32Array(particles * 2);
    const sizesArray = new Float32Array(particles);
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < WIDTH; y++) {
        const i = x * WIDTH + y;
        const i2 = i * 2;
        uvArray[i2 + 0] = (x + 0.5) / WIDTH;
        uvArray[i2 + 1] = (y + 0.5) / WIDTH;
        sizesArray[i] = Math.random();
      }
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setDrawRange(0, particles);
    this.geometry.setAttribute("aUv", new THREE.BufferAttribute(uvArray, 2));
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(sizesArray, 1)
    );
    const size = getSize();
    const resolution = new THREE.Vector2(
      size.width * size.dpr,
      size.height * size.dpr
    );
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: new THREE.Uniform(resolution),
        uPositionTexture: new THREE.Uniform(null),
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      wireframe: true,
    });

    this.points = new THREE.Points(
      new THREE.SphereGeometry(2, 12, 12),
      this.material
    );
    console.log("this.points", this.points);
    scene.add(this.points);
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

  animate() {
    this.gpgpuRenderer.compute();
    // console.log(
    //   "texture",
    //   this.gpgpuRenderer.getCurrentRender(this.gpgpuPositionVariable).texture
    // );
    const tex = this.gpgpuRenderer.getCurrentRenderTarget(
      this.gpgpuPositionVariable
    ).texture;
    // console.log("texture", tex);
    this.material.uniforms.uPositionTexture.value = tex;
  }
}
