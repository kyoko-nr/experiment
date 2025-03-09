import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import gsap from 'gsap';
import { Environment } from "./Environment";
import { getSize } from "../utils/getSize";
import fishEyeVertex from './shaders/fisheye/vertex.glsl?raw';
import fishEyeFragment from './shaders/fisheye/fragment.glsl?raw';
import gridVertex from "./shaders/grid/vertex.glsl?raw";
import gridFragment from "./shaders/grid/fragment.glsl?raw";
import gui from "./addGui";

const easing = ["power3.in", "power3.out", "power3.inOut", "power4.in", "power4.out", "power4.inOut", "power5.in", "power5.out", "power5.inOut", "sine.in", "sine.out", "sine.inOut", "quad.in", "quad.out", "quad.inOut", "cubic.in", "cubic.out", "cubic.inOut", "exp.in", "exp.out", "exp.inOut"];

const animParams = {
  expandDuration: 0.4,
  expandEase: "expo.out",
  shrinkDuration: 1.2,
  shrinkEase: "power5.inOut",
}

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

    this.animating = false;

    // ----------GUI----------
    addGui();
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
        "uProgress": new THREE.Uniform(0),
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
        "uProgress": new THREE.Uniform(0),
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

  updateProgress() {
    const tlfy = gsap.timeline();
    tlfy.to(this.fisheyeEffect.uniforms.uProgress, {
      value: 1,
      duration: animParams.expandDuration,
      ease: animParams.expandEase,
      overwrite: true,
    });
    tlfy.to(this.fisheyeEffect.uniforms.uProgress, {
      value: 0,
      duration: animParams.shrinkDuration,
      ease: animParams.shrinkEase,
    }, "-=0.4");
    const tlgr = gsap.timeline();
    tlgr.to(this.gridEffect.uniforms.uProgress, {
      value: 1,
      duration: animParams.expandDuration,
      ease: animParams.expandEase,
      overwrite: true,
    });
    tlgr.to(this.gridEffect.uniforms.uProgress, {
      value: 0,
      duration: animParams.shrinkDuration,
      ease: animParams.shrinkEase,
    }, "-=0.4");
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

const addGui = () => {
  gui.add(animParams, 'expandDuration').min(0.1).max(5).step(0.1).onChange((val) => animParams.expandDuration = val);
  gui.add(animParams, 'expandEase', easing).onChange((val) => animParams.expandEase = val);
  gui.add(animParams, 'shrinkDuration').min(0.1).max(5).step(0.1).onChange((val) => animParams.shrinkDuration = val);
  gui.add(animParams, 'shrinkEase', easing).onChange((val) => animParams.shrinkEase = val);
}