import * as THREE from "three";
import {
  GPUComputationRenderer,
  Variable,
} from "three/addons/misc/GPUComputationRenderer.js";
import { getSize } from "../utils/getSize";
import positionShader from "./shaders/gpgpu/position.glsl";
import velocityShader from "./shaders/gpgpu/velocity.glsl";
import vertexShader from "./shaders/particles/vertex.glsl";
import fragmentShader from "./shaders/particles/fragment.glsl";

const WIDTH = 34;
const particles = WIDTH * WIDTH;
const POSITION_RANGE = 10;
const VELOCITY_RANGE = 5;

const uniforms = {
  uDelta: new THREE.Uniform(0),
};

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
  private gpgpuVelocityVariable: Variable;
  // private gpgpuDebug: THREE.Object3D;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
    // ----------------------------------------
    // GPGPU
    this.gpgpuRenderer = new GPUComputationRenderer(WIDTH, WIDTH, renderer);
    const dtPositionTexture = this.gpgpuRenderer.createTexture();
    const dtVelocityTexture = this.gpgpuRenderer.createTexture();
    const count = particles * 3;
    const dtPosArray = new Float32Array(count * 4);
    const dtVelArray = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      const i4 = i * 4;
      dtPosArray[i4 + 0] = Math.random() * POSITION_RANGE - POSITION_RANGE / 2;
      dtPosArray[i4 + 1] = Math.random() * POSITION_RANGE - POSITION_RANGE / 2;
      dtPosArray[i4 + 2] = Math.random() * POSITION_RANGE - POSITION_RANGE / 2;
      dtPosArray[i4 + 3] = 1;
      dtVelArray[i4 + 0] = (Math.random() - 0.5) * VELOCITY_RANGE;
      dtVelArray[i4 + 1] = (Math.random() - 0.5) * VELOCITY_RANGE;
      dtVelArray[i4 + 2] = (Math.random() - 0.5) * VELOCITY_RANGE;
      dtVelArray[i4 + 3] = 1;
    }
    dtPositionTexture.image.data = dtPosArray;
    dtVelocityTexture.image.data = dtVelArray;
    this.gpgpuPositionVariable = this.gpgpuRenderer.addVariable(
      "uPosition",
      positionShader,
      dtPositionTexture
    );
    this.gpgpuPositionVariable.material.uniforms = uniforms;
    this.gpgpuPositionVariable.wrapS = THREE.RepeatWrapping;
    this.gpgpuPositionVariable.wrapT = THREE.RepeatWrapping;

    this.gpgpuVelocityVariable = this.gpgpuRenderer.addVariable(
      "uVelocity",
      velocityShader,
      dtVelocityTexture
    );
    this.gpgpuVelocityVariable.material.uniforms = uniforms;
    this.gpgpuVelocityVariable.wrapS = THREE.RepeatWrapping;
    this.gpgpuVelocityVariable.wrapS = THREE.RepeatWrapping;

    this.gpgpuRenderer.setVariableDependencies(this.gpgpuPositionVariable, [
      this.gpgpuVelocityVariable,
      this.gpgpuPositionVariable,
    ]);
    this.gpgpuRenderer.setVariableDependencies(this.gpgpuVelocityVariable, [
      this.gpgpuVelocityVariable,
      this.gpgpuPositionVariable,
    ]);
    this.gpgpuRenderer.init();

    // ----------------------------------------
    // Debug
    const positionDebug = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: this.gpgpuRenderer.getCurrentRenderTarget(
          this.gpgpuPositionVariable
        ).texture,
      })
    );
    positionDebug.position.set(4, 2, 0);
    scene.add(positionDebug);
    const velocityDebug = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: this.gpgpuRenderer.getCurrentRenderTarget(
          this.gpgpuVelocityVariable
        ).texture,
      })
    );
    velocityDebug.position.set(4, -2, 0);
    scene.add(velocityDebug);

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
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(particles * 3), 3)
    );
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
        uVelocityTexture: new THREE.Uniform(null),
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      wireframe: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
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

  animate(delta: number) {
    this.gpgpuRenderer.compute();

    this.gpgpuPositionVariable.material.uniforms.uDelta.value = delta;
    this.gpgpuVelocityVariable.material.uniforms.uDelta.value = delta;

    const positionTexture = this.gpgpuRenderer.getCurrentRenderTarget(
      this.gpgpuPositionVariable
    ).texture;
    this.material.uniforms.uPositionTexture.value = positionTexture;
    const velocityTexture = this.gpgpuRenderer.getCurrentRenderTarget(
      this.gpgpuVelocityVariable
    ).texture;
    this.material.uniforms.uVelocityTexture.value = velocityTexture;
  }
}
