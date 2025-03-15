import { getSize } from "../utils/getSize.js";

/**
 * Displacement class
 */
export class Displacement {
  /**
   * Constructor
   * @param {HTMLCanvasElement} canvas canvas element
   */
  constructor(canvas) {

    const size = getSize();
    this.canvas = canvas;
    this.canvas.classList.add("displacement");
    this.canvas.style.width = `${size.width * 0.25}px`;
    this.canvas.style.height = `${size.height * 0.25}px`;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, size.width * 0.25, size.height * 0.25);
  }

  onResize() {
    const size = getSize();
    this.canvas.style.width = `${size.width * 0.25}px`;
    this.canvas.style.height = `${size.height * 0.25}px`;
  }
}