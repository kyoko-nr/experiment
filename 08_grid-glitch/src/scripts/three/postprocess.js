import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';

// const loader = new THREE.TextureLoader();
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
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // const noise = loader.load(noiseSrc);
  // noise.wrapS = THREE.RepeatWrapping;
  // noise.wrapT = THREE.RepeatWrapping;
  // noise.needsUpdate = true;

  const ShaderObj = {
    name: 'WaveShader',
    uniforms: {
      'tDiffuse': { value: null },
      "uResolution": { value: new THREE.Vector2(size.width, size.height) },
      "uMouse": { value: new THREE.Vector2(-1, -1) },
      "uTime": { value: 0.0 },
      "uMouseSpeed": { value: 0.0 },
      // "uNoise": { value: noise },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  }

  const shaderPass = new ShaderPass(ShaderObj)
  composer.addPass(shaderPass);

  return composer;
};

