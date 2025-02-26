import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import fishEyeVertex from './shaders/fisheye/vertex.glsl?raw';
import fishEyeFragment from './shaders/fisheye/fragment.glsl?raw';
import gridVertex from "./shaders/grid/vertex.glsl?raw";
import gridFragment from "./shaders/grid/fragment.glsl?raw";

/**
 * Add post process effect.
 * @param {THREE.WebGLRenderer} param.renderer
 * @parama {Object} param.size
 * @param {THREE.Scene} param.scene
 * @param {THREE.Camera} param.camera
 */
export const postprocess = ({renderer, size, scene, camera}) => {
  const composer = new EffectComposer(renderer);
  composer.setSize(size.width, size.height);
  const dpr = Math.min(window.devicePixelRatio, 2);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Fish eye effect
  const fishEyeEffectObj = {
    name: 'fisheye',
    uniforms: {
      'tDiffuse': { value: null },
      "uResolution": { value: new THREE.Vector2(size.width * dpr, size.height * dpr) },
      "uMouse": { value: new THREE.Vector2(-1, -1) },
      "uTime": { value: 0.0 },
      "uMouseSpeed": { value: 0.0 },
    },
    vertexShader: fishEyeVertex,
    fragmentShader: fishEyeFragment,
  }
  const fishEyeEffectpass = new ShaderPass(fishEyeEffectObj)
  composer.addPass(fishEyeEffectpass);

  const gridEffectObj = {
    name: 'grid',
    uniforms: {
      'tDiffuse': { value: null },
      "uResolution": { value: new THREE.Vector2(size.width * dpr, size.height * dpr) },
      "uMouse": { value: new THREE.Vector2(0.5, 0.5) },
      "uTime": { value: 0.0 },
      "uMouseSpeed": { value: 0.0 },
    },
    vertexShader: gridVertex,
    fragmentShader: gridFragment,
  }
  const gridEffectpass = new ShaderPass(gridEffectObj)
  // composer.addPass(gridEffectpass);

  return composer;
};

