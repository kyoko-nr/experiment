import * as THREE from "three";
import glowImage from "../assets/glow.png";

/**
 * Cursor class
 */
export class Cursor  {
  constructor() {
    this.current = new THREE.Vector2(9999, 9999);
    this.previous = new THREE.Vector2(9999, 9999);
    this.image = new Image();
    this.image.src = glowImage;
    this.imageSize = 50;
  }

  get delta() {
    return this.current.distanceTo(this.previous);
  }

  get imagePos() {
    return new THREE.Vector2(
      this.current.x - this.imageSize / 2,
      this.current.y - this.imageSize / 2
    );
  }

  /**
   * update cursor position
   * @param {THREE.Vector2} pos
   */
  update(pos) {
    this.previous.copy(this.current);
    this.current.copy(pos);
  }
}