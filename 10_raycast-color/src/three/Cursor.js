import * as THREE from "three";
import glowImage from "../assets/glow.png";
import { getSize } from "../utils/getSize";

/**
 * Cursor class
 */
export class Cursor  {
  constructor() {
    const size = getSize();
    this.current = new THREE.Vector2(9999, 9999);
    this.previous = new THREE.Vector2(9999, 9999);
    this.image = new Image();
    this.image.src = glowImage;
    this.imageSize = size.height * 0.15;
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
    const size = getSize();
    this.previous.copy(this.current);
    this.current.copy(pos);
    this.imageSize = size.height * 0.15;
  }
}