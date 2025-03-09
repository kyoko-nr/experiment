import * as THREE from "three";
import { getSize } from "../utils/getSize";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

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
      60,
      size.width / size.height,
      0.1,
      10
    );
    this.camera.position.set(0, 0, 5);
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    app.appendChild(this.renderer.domElement);
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
}