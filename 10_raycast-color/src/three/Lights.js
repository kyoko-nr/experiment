import * as THREE from "three";
import gui from "../gui/addGui";

const lightParams = {
  ambientLight: {
    color: new THREE.Color("#ffffff"),
    intensity: 0.7,
  },
  directionalLight: {
    color: new THREE.Color("#ffffff"),
    intensity: 1.0,
    position: new THREE.Vector3(10, 10, -2.8),
  },
}

/**
 * Lights class
 */
export class Lights {
  constructor() {
    this.ambientLight = new THREE.AmbientLight(lightParams.ambientLight.color, lightParams.ambientLight.intensity);

    this.directionalLight = new THREE.DirectionalLight(
      lightParams.directionalLight.color,
      lightParams.directionalLight.intensity
    );
    this.directionalLight.position.copy(lightParams.directionalLight.position);

    // ----------GUI----------
    this.addGui();
  }

  get lights() {
    const group = new THREE.Group();
    group.add(this.ambientLight);
    group.add(this.directionalLight);
    return group;
  }

  addGui() {
    const folder = gui.addFolder("Lights");
    folder.add(this.directionalLight, "intensity").min(0).max(1)
      .name("Directional Light Intensity")
      .onChange(value => this.directionalLight.intensity = value);
    folder.addColor(this.directionalLight, "color")
      .name("Directional Light Color")
      .onChange(value => this.directionalLight.color = value);
    folder.add(this.directionalLight.position, "x").min(-10).max(10)
      .name("Directional Light Position X")
      .onChange(value => this.directionalLight.position.x = value);
    folder.add(this.directionalLight.position, "y").min(-10).max(10)
      .name("Directional Light Position Y")
      .onChange(value => this.directionalLight.position.y = value);
    folder.add(this.directionalLight.position, "z").min(-10).max(10)
      .name("Directional Light Position Z")
      .onChange(value => this.directionalLight.position.z = value);
  }
}