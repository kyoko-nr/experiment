import * as THREE from "three";
import gui from "../gui/addGui";
import toonTextureSrc from "../assets/toon.png";

const modelParams = {
  torusKnot: {
    color: new THREE.Color("#b919e6")
  },
  donut: {
    color: new THREE.Color("#ff00dd")
  },
  cube: {
    color: new THREE.Color("#ffd500")
  },
}

const loader = new THREE.TextureLoader();

/**
 * Models
 */
export class Models {
  /**
   * Constructor
   */
  constructor() {
    const toonTexture = loader.load(toonTextureSrc);

    // Torus knot
    this.torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
      new THREE.MeshToonMaterial({color: modelParams.torusKnot.color, gradientMap: toonTexture})
    );
    this.torusKnot.position.x = 3

    // Donut
    this.donut = new THREE.Mesh(
      new THREE.TorusGeometry(0.65, 0.3, 32, 32),
      new THREE.MeshToonMaterial({color: modelParams.donut.color, gradientMap: toonTexture})
    );
    this.donut.position.x = - 3;

    // Cube
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.MeshToonMaterial({color: modelParams.cube.color, gradientMap: toonTexture})
    );

    // ----------GUI----------
    this.addGui();
  }

  get group() {
    const group = new THREE.Group();
    group.add(this.torusKnot);
    group.add(this.donut);
    group.add(this.cube);
    return group;
  }

  /**
   * Animate models
   * @param {number} elapsedTime
   */
  animate(elapsedTime) {
    this.cube.rotation.y = elapsedTime * 0.18;
    this.cube.rotation.z = elapsedTime * 0.19;
    this.torusKnot.rotation.y = elapsedTime * 0.1;
    this.torusKnot.rotation.z = elapsedTime * 0.15;
    this.donut.rotation.y = elapsedTime * 0.2;
    this.donut.rotation.z = elapsedTime * 0.15;
  }

  /**
   * Add GUI
   */
  addGui() {
    const folder = gui.addFolder("Models");
    folder.addColor(modelParams.torusKnot, "color")
      .name("TorusKnot color")
      .onChange(() => {
        this.torusKnot.material.color.set(modelParams.torusKnot.color);
      });
    folder.addColor(modelParams.donut, "color")
      .name("Donut color")
      .onChange(() => {
        this.donut.material.color.set(modelParams.donut.color);
      });
    folder.addColor(modelParams.cube, "color")
      .name("Cube color")
      .onChange(() => {
        this.cube.material.color.set(modelParams.cube.color);
      });
  }
}