import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getSize } from "../utils/getSize";

/**
 * Environment class
 */
export class Environment {
  private camera: THREE.PerspectiveCamera;
  private control: OrbitControls;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  /**
   * Constructor
   * @param app application root element
   */
  constructor(app: HTMLDivElement) {
    const size = getSize();
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      size.width / size.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
    // this.renderer.setClearColor(new THREE.Color("#D7E3EF"));

    this.control = new OrbitControls(this.camera, this.renderer.domElement);

    app.appendChild(this.renderer.domElement);
  }

  /**
   * Render scene
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Add mesh to scene
   * @param mesh
   */
  addMesh(mesh: THREE.Object3D) {
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
