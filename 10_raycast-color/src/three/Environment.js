import * as THREE from "three";
import { getSize } from "../utils/getSize";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gui from "../gui/addGui";

const rendererParams = {
  clearColor: "#F89CA7",
  cameraPos: new THREE.Vector3(0, 0, 6),
};

/**
 * Three.js Environment class.
 */
export class Environment {
  /**
   * Constructor
   * @param {HTMLDivElement} app application root element
   */
  constructor(app) {
    const size = getSize();
    // Scene
    this.scene = new THREE.Scene();
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      size.width / size.height,
      0.1,
      10
    );
    this.camera.position.copy(rendererParams.cameraPos);
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
    this.renderer.setClearColor(rendererParams.clearColor);
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    app.appendChild(this.renderer.domElement);

    // ----------GUI----------
    this.addGui();
  }

  /**
   * Render scene
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Add mesh to scene
   * @param {THREE.Group} mesh
   */
  addMesh(mesh) {
    this.scene.add(mesh);
  }

  /**
   * Resize
   */
  onResize() {
    const size = getSize();
    this.camera.aspect = size.width / size.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
  }

  addGui = () => {
    gui.addColor(rendererParams, "clearColor")
      .onChange(() => {
        this.renderer.setClearColor(rendererParams.clearColor);
      });
    gui.add(rendererParams.cameraPos, "z").min(-10).max(10).step(0.01)
      .onChange(() => this.camera.position.copy(rendererParams.cameraPos));
  }
}
