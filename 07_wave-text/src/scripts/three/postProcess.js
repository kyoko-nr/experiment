import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import noiseSrc from "../../../assets/noise.png";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const loader = new THREE.TextureLoader();
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
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;
  noise.needsUpdate = true;

  const ShaderObj = {
    name: 'WaveShader',
    uniforms: {
      'tDiffuse': { value: null },
      "uTime": { value: 0.0 },
      "uNoise": { value: noise },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform sampler2D uNoise;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 waveUv = vUv + uTime * 0.01;
        vec4 noise = texture2D(uNoise, waveUv);
        vec2 newUv = vec2(noise.r * 0.02 + vUv.x, vUv.y + noise.g * 0.02);
        vec4 texel = texture2D( tDiffuse, newUv);
        gl_FragColor = texel;
      }`
  };
  const shaderPass = new ShaderPass(ShaderObj)
  composer.addPass(shaderPass);

  return composer;
};

