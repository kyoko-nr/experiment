import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Environment } from "./Environment";
import { getSize } from "../utils/getSize";
import fishEyeVertex from './shaders/fisheye/vertex.glsl?raw';
import fishEyeFragment from './shaders/fisheye/fragment.glsl?raw';
import gridVertex from "./shaders/grid/vertex.glsl?raw";
import gridFragment from "./shaders/grid/fragment.glsl?raw";

/**
 * Post process effect.
 */
export class Postprocess {
  /**
   * constructor
   * @param {Environment} environment
   */
  constructor(environment) {
    const size = getSize();
    this.composer = new EffectComposer(environment.renderer);
    this.composer.setSize(size.width, size.height);
    const renderPass = new RenderPass(environment.scene, environment.camera);
    this.composer.addPass(renderPass);

    this.initFisheyeEffect(size);
    this.initGridEffect(size);
  }

  /**
   * initialize fish eye effect
   * @param {Object} size
   */
  initFisheyeEffect(size) {
    const fishEyeEffectObj = {
      name: 'fisheye',
      uniforms: {
        'tDiffuse': { value: null },
        "uResolution": { value: new THREE.Vector2(size.width * size.dpr, size.height * size.dpr) },
        "uMouse": { value: new THREE.Vector2(-1, -1) },
      },
      vertexShader: fishEyeVertex,
      fragmentShader: fishEyeFragment,
    }
    const fishEyeEffectpass = new ShaderPass(fishEyeEffectObj)
    this.composer.addPass(fishEyeEffectpass);
  }

  /**
   * initialize grid effect
   * @param {Object} size
   */
  initGridEffect(size) {
    const gridEffectObj = {
      name: 'grid',
      uniforms: {
        'tDiffuse': { value: null },
        "uResolution": { value: new THREE.Vector2(size.width * size.dpr, size.height * size.dpr) },
        "uMouse": { value: new THREE.Vector2(-1, -1) },
      },
      vertexShader: gridVertex,
      fragmentShader: gridFragment,
    }
    const gridEffectpass = new ShaderPass(gridEffectObj)
    this.composer.addPass(gridEffectpass);
  }

  get fisheyeEffect() {
    return this.composer.passes[1];
  }

  get gridEffect() {
    return this.composer.passes[2];
  }

  render() {
    this.composer.render();
  }

  /**
   * update mouse position of each effect
   * @param {Object} mousePos
   */
  updateMouse(mousePos) {
    this.fisheyeEffect.uniforms.uMouse.value = mousePos;
    this.gridEffect.uniforms.uMouse.value = mousePos;
  }

  /**
   * on resize
   */
  onResize() {
    const size = getSize();
    this.composer.setSize(size.width, size.height);
    this.composer.setPixelRatio(size.dpr);
    this.fisheyeEffect.uniforms.uResolution.value = new THREE.Vector2(size.width * size.dpr, size.height * size.dpr);
    this.gridEffect.uniforms.uResolution.value = new THREE.Vector2(size.width * size.dpr, size.height * size.dpr);
  }
}