import * as THREE from "three";
import gui from "../gui/addGui.js";
import { Environment } from "./Environment";
import { Displacement} from "./Displacement";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { getSize } from "../utils/getSize";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import noiseSrc from "../assets/noise_4.png";

const loader = new THREE.TextureLoader();

const noise = loader.load(noiseSrc);
noise.wrapS = THREE.RepeatWrapping;
noise.wrapT = THREE.RepeatWrapping;

/**
 * Post process effect.
 */
export class Postprocess {
  /**
   * constructor
   * @param {Environment} environment
   * @param {HTMLCanvasElement} canvas
   */
  constructor(environment, canvas) {
    this.environment = environment;

    const size = getSize();
    this.composer = new EffectComposer(this.environment.renderer);
    this.composer.setSize(size.width, size.height);
    const renderPass = new RenderPass(
      this.environment.scene,
      this.environment.camera
    );
    this.composer.addPass(renderPass);

    this.displacement = new Displacement(canvas, this.environment.camera);
    this.environment.addMesh(this.displacement.plane);

    this.setupColorEffect();
  }

  setupColorEffect() {
    const colorEffectObj = {
      name: "color",
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: new THREE.Uniform(this.displacement.texture),
        tDiffuse: new THREE.Uniform(null),
        uNoise: new THREE.Uniform(noise),
        uTime: new THREE.Uniform(0),
      }
    }
    const pass = new ShaderPass(colorEffectObj);
    this.composer.addPass(pass);
  }

  get colorPass() {
    return this.composer.passes[1];
  }

  render() {
    this.composer.render();
  }

  /**
   * animate
   * @param {Number} elapsedTime
   */
  animate(elapsedTime) {
    this.displacement.animate(this.environment.camera);
    this.colorPass.uniforms.uTexture.value = this.displacement.texture;
    this.colorPass.uniforms.uTime.value = elapsedTime;
  }

  onResize() {
    const size = getSize();
    this.composer.setSize(size.width, size.height);
    this.composer.setPixelRatio(size.dpr);
    this.displacement.onResize(this.environment.camera);
  }
}
