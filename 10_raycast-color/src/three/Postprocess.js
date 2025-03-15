import { Environment } from "./Environment";
import { Displacement} from "./Displacement";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { getSize } from "../utils/getSize";

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
  }

  render() {
    this.composer.render();
  }

  animate() {
    this.displacement.animate(this.environment.camera);
  }

  onResize() {
    const size = getSize();
    this.composer.setSize(size.width, size.height);
    this.composer.setPixelRatio(size.dpr);
    this.displacement.onResize(this.environment.camera);
  }
}
