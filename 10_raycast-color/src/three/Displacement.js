import * as THREE from "three";
import { getSize } from "../utils/getSize.js";
import { normalizePos, deNormalizePos } from "../utils/normalizePos.js";
import { currentFullscreen } from "../utils/calcFullscreenSize.js";
import glowImage from "../assets/glow.png";

const canvasScale = 0.25;

/**
 * Displacement class
 */
export class Displacement {
  /**
   * Constructor
   * @param {HTMLCanvasElement} canvas canvas element
   * @param {THREE.Camera} camera
   */
  constructor(canvas, camera) {
    this.setupCanvas(canvas);
    this.setupInteractivePlane(camera);
    this.setupPointerMove();
  }

  setupCanvas(canvas) {
    const size = getSize();
    this.canvas = canvas;
    this.canvas.classList.add("displacement");
    this.canvas.width = size.width * canvasScale;
    this.canvas.height = size.height * canvasScale;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasCursor = new Cursor();
  }

  /**
   * setup interactive plane
   * @param {THREE.Camera} camera 
   */
  setupInteractivePlane(camera) {

    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({wireframe: true}),
    )
    const {width, height} = currentFullscreen(camera);
    this.plane.scale.set(width, height, 1);

    this.raycaster = new THREE.Raycaster();

    this.screenCursor = new Cursor();
  }

  setupPointerMove() {
    window.addEventListener("pointermove", (e) => {
      const size = getSize();
      const pos = normalizePos(e.clientX, e.clientY, size.width, size.height);
      this.screenCursor.update(pos);
    });
  }

  /**
   * Update canvas and texture based on cursor position
   * @param {THREE.Camera} camera
   */
  update(camera) {

    // update raycaster
    this.raycaster.setFromCamera(this.screenCursor.current, camera);
    const intersects = this.raycaster.intersectObject(this.plane);
    if(intersects.length > 0) {
      const uv = intersects[0].uv;
      const pos = deNormalizePos(uv, this.canvas.width, this.canvas.height)
      this.canvasCursor.update(pos);
    }
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw cursor image
    this.ctx.drawImage(
      this.canvasCursor.image,
      this.canvasCursor.imagePos.x,
      this.canvasCursor.imagePos.y,
      this.canvasCursor.imageSize,
      this.canvasCursor.imageSize,
    )
  }

  /**
   * resize
   * @param {THREE.Camera} camera
   */
  onResize(camera) {
    const size = getSize();
    this.canvas.width = `${size.width * canvasScale}px`;
    this.canvas.height = `${size.height * canvasScale}px`;

    this.plane.matrixWorldNeedsUpdate = true;
    const {width, height} = currentFullscreen(camera);
    this.plane.scale.set(width, height, 1);
  }
}

/**
 * Cursor class
 */
class Cursor  {
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