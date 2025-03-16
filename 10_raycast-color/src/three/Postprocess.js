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
import noise1Src from "../assets/noise_1.png";
import noise2Src from "../assets/noise_2.png";
import noise3Src from "../assets/noise_3.png";
import noise4Src from "../assets/noise_4.png";
import noise5Src from "../assets/noise_5.png";
import noise6Src from "../assets/noise_6.png";

const loader = new THREE.TextureLoader();

const noise1 = loader.load(noise1Src);
noise1.wrapS = THREE.RepeatWrapping;
noise1.wrapT = THREE.RepeatWrapping;
const noise2 = loader.load(noise2Src);
noise2.wrapS = THREE.RepeatWrapping;
noise2.wrapT = THREE.RepeatWrapping;
const noise3 = loader.load(noise3Src);
noise3.wrapS = THREE.RepeatWrapping;
noise3.wrapT = THREE.RepeatWrapping;
const noise4 = loader.load(noise4Src);
noise4.wrapS = THREE.RepeatWrapping;
noise4.wrapT = THREE.RepeatWrapping;
const noise5 = loader.load(noise5Src);
noise5.wrapS = THREE.RepeatWrapping;
noise5.wrapT = THREE.RepeatWrapping;
const noise6 = loader.load(noise6Src);
noise6.wrapS = THREE.RepeatWrapping;
noise6.wrapT = THREE.RepeatWrapping;

const Noises = {"noise1": noise1, "noise2": noise2, "noise3": noise3, "noise4": noise4, "noise5": noise5, "noise6": noise6};

const postprocessParams = {
  noise: noise4,
}

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

    // ----------GUI----------
    this.addGui();
  }

  setupColorEffect() {
    const colorEffectObj = {
      name: "color",
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: new THREE.Uniform(this.displacement.texture),
        tDiffuse: new THREE.Uniform(null),
        uNoise: new THREE.Uniform(postprocessParams.noise),
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

  addGui() {
    const folder = gui.addFolder("Postprocess");
    folder.add(postprocessParams, "noise", Noises).onChange(
      (value) => {
        this.colorPass.uniforms.uNoise.value = value;
      }
    );
  }
}
