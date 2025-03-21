import * as THREE from "three";
import { getSize } from "../utils/getSize";
import gsap from "gsap";

const colors = [
  { r: 215, g: 227, b: 239 },
  { r: 199, g: 225, b: 213 },
  { r: 218, g: 215, b: 229 },
];

const colorParams = {
  clearColorIdx: 0,
  clearColor: { ...colors[0] },
};

const params = {
  progress: 0,
  phi: Math.PI * 0.5,
  theta: 0,
  easing: "cubic.out",
  duration: 1.5,
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
    this.cameraSpherical = new THREE.Spherical(2, params.phi, params.theta);
    this.cameraDirection = new THREE.Vector3();
    this.cameraDirection.setFromSpherical(this.cameraSpherical);
    this.camera.position.copy(this.cameraDirection);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(size.width, size.height);
    this.renderer.setPixelRatio(size.dpr);
    this.renderer.setViewport(0, 0, size.width, size.height);
    const color = colorParams.clearColor;
    this.renderer.setClearColor(
      new THREE.Color(`rgb(${color.r}, ${color.g}, ${color.b})`)
    );

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
   * @param {boolean} isForward
   */
  animateCamera(isForward) {
    if (isForward) {
      gsap.fromTo(
        params,
        { phi: Math.PI * 0.5, theta: 0 },
        {
          phi: Math.PI,
          theta: -Math.PI * 0.25,
          duration: params.duration,
          ease: params.easing,
          overwrite: true,
          onUpdate: () => this.updateCamera(),
        }
      );
    } else {
      gsap.fromTo(
        params,
        { phi: Math.PI, theta: -Math.PI * 0.25 },
        {
          phi: Math.PI * 0.5,
          theta: 0,
          duration: params.duration,
          ease: params.easing,
          overwrite: true,
          onUpdate: () => this.updateCamera(),
        }
      );
    }
  }

  updateCamera() {
    this.cameraSpherical.set(2, params.phi, params.theta);
    this.cameraDirection.setFromSpherical(this.cameraSpherical);
    this.camera.position.copy(this.cameraDirection);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * Animate clear color
   * @param {boolean} isForward
   */
  animateColor(isForward) {
    const currentColor = colors[colorParams.clearColorIdx];
    const nextIndex = isForward
      ? colorParams.clearColorIdx + 1
      : colorParams.clearColorIdx - 1;
    const nextColor = colors[nextIndex];
    if (!nextColor) {
      return;
    }
    gsap.fromTo(
      colorParams.clearColor,
      {
        r: currentColor.r,
        g: currentColor.g,
        b: currentColor.b,
      },
      {
        r: nextColor.r,
        g: nextColor.g,
        b: nextColor.b,
        duration: 1,
        overwrite: true,
        immediateRender: false,
        onUpdate: () => this.updateColor(),
        onComplete: () => {
          colorParams.clearColorIdx = nextIndex;
        },
      }
    );
  }

  updateColor() {
    const color = { ...colorParams.clearColor };
    this.renderer.setClearColor(
      new THREE.Color(
        `rgb(${Math.floor(color.r)}, ${Math.floor(color.g)}, ${Math.floor(
          color.b
        )})`
      )
    );
  }
}
