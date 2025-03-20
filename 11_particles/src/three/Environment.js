import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getSize } from "../utils/getSize";
import gui from "../gui/addGui";

const params = {
  clearColor: "#d7e3e5",
  progress: 0,
};

export class Environment {
  /**
   * Constructor
   * @param {HTMLDivElement} app application root element
   */
  constructor(app) {
    const size = getSize();
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      120,
      size.width / size.height,
      0.1,
      100
    );
    this.cameraSpherical = new THREE.Spherical(2, Math.PI * 0.5, 0);
    this.cameraDirection = new THREE.Vector3();
    this.cameraDirection.setFromSpherical(this.cameraSpherical);
    this.camera.position.copy(this.cameraDirection);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
    this.renderer.setClearColor(params.clearColor);

    app.appendChild(this.renderer.domElement);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

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
   * @param {THREE.Object3D} mesh
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

  /**
   * Update camera animation
   * @param {Number} progress 0 ~ 1
   */
  updateCameraAnim(progress) {
    const phi = (Math.PI - Math.PI * 0.5) * progress + Math.PI * 0.5;
    const theta = -Math.PI * 0.25 * progress;
    this.cameraSpherical.set(2, phi, theta);
    this.cameraDirection.setFromSpherical(this.cameraSpherical);
    this.camera.position.copy(this.cameraDirection);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * Add GUI
   */
  addGui() {
    gui.addColor(params, "clearColor").onChange(() => {
      this.renderer.setClearColor(params.clearColor);
    });
  }
}
