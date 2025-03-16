import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import gui from "../gui/addGui";
import toonTextureSrc from "../assets/toon.png";
import rabbitSrc from "../assets/rabbit.glb";

const modelParams = {
  // model1: {color: "#fd7aff"},
  model1: {color: "#ff4dde"},
  model2: {color: "#fb609e"},
  model3: {color: "#ff5c74"},
}

const TextureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();

/**
 * Models
 */
export class Models {
  /**
   * Constructor
   */
  constructor() {
    // ----------GUI----------
    this.addGui();
  }

  async loadModel() {
    const rabbit = await modelLoader.loadAsync(rabbitSrc);
    const model = rabbit.scene;
    model.rotation.y -= Math.PI * 0.5;
    model.scale.set(0.35, 0.35, 0.35);
    return model;
  }

  async getModel() {
    const toonTexture = TextureLoader.load(toonTextureSrc);
    const xNum = 7;
    const yNum = 4;
    this.group = new THREE.Group();

    const model = await this.loadModel();
    for(let i = 0; i < xNum; i++) {
      for(let j = 0; j < yNum; j++) {
        const coloridx = (i + j) % 3;
        const color = new THREE.Color(modelParams[`model${coloridx + 1}`].color);
        const material = new THREE.MeshToonMaterial({gradientMap: toonTexture, color});
        const copy = model.clone();
        copy.children.forEach((child) => child.material = material);
        const offset = i % 2;
        copy.position.set(- 3.5 + i * 1.2, 1.5 - j * 1.8 - offset, 0);
        this.group.add(copy);
      }
    }
    return this.group;
  }

  /**
   * Animate models
   * @param {number} elapsedTime
   */
  animate(elapsedTime) {
    this.group.children.forEach((child) => {
      child.rotation.y = elapsedTime * 0.2;
    });
  }

  /**
   * Add GUI
   */
  addGui() {
    const folder = gui.addFolder("Models");
    folder.addColor(modelParams.model1, "color")
      .name("color1")
      .onChange(() => {
        for(let i = 0; i < this.group.children.length; i += 3) {
          const child = this.group.children[i];
          child.children.forEach((c) => c.material.color.set(modelParams.model1.color));
        }
      });
    folder.addColor(modelParams.model2, "color")
      .name("color2")
      .onChange(() => {
        for(let i = 1; i < this.group.children.length; i += 3) {
          const child = this.group.children[i];
          child.children.forEach((c) => c.material.color.set(modelParams.model2.color));
        }
      });
    folder.addColor(modelParams.model3, "color")
      .name("color3")
      .onChange(() => {
        for(let i = 2; i < this.group.children.length; i += 3) {
          const child = this.group.children[i];
          child.children.forEach((c) => c.material.color.set(modelParams.model3.color));
        }
      });
    // folder.addColor(modelParams.model4, "color")
    //   .name("color4")
    //   .onChange(() => {
    //     for(let i = 2; i < this.group.children.length; i += 4) {
    //       const child = this.group.children[i];
    //       child.children.forEach((c) => c.material.color.set(modelParams.model4.color));
    //     }
    //   });
  }
}