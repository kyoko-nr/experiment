import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import noiseSrc from "../../../assets/noise.png";
import { loader } from "./createTextPlane";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

/**
 * Add post process effect.
 * @param {THREE.WebGLRenderer} param.renderer
 * @parama {Object} param.size
 * @param {THREE.Scene} param.scene
 * @param {THREE.Camera} param.camera
 */
export const postProcess = ({renderer, size, scene, camera}) => {
  const composer = new EffectComposer(renderer);
  composer.setSize(size.width, size.height);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const noise = loader.load(noiseSrc);

  const ShaderObj = {
    name: 'CopyShader',
    uniforms: {
      'tDiffuse': { value: null },
      'opacity': { value: 1.0 },
      "uTime": { value: 0.0 },
      "uNoise": { value: noise },
    },
    vertexShader: /* glsl */`
    uniform sampler2D uNoise;
    uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 newPos = position;
        vec2 waveUv = uv * 0.3 - uTime * 0.01;
        vec4 wave = texture2D(uNoise, waveUv);
        newPos.z -= (wave.r + wave.g) * 0.1;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
      }`,
    fragmentShader: /* glsl */`
      uniform float opacity;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D( tDiffuse, vUv );
        gl_FragColor = opacity * texel;
      }`
  };
  const shaderPass = new ShaderPass(ShaderObj)
  composer.addPass(shaderPass);

  return composer;
};

