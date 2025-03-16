import * as THREE from "three";
import { getSize } from "../utils/getSize.js";
import { normalizePos, deNormalizePos } from "../utils/normalizePos.js";
import { currentFullscreen } from "../utils/calcFullscreenSize.js";
import { Cursor } from "./Cursor.js";
import gui from "../gui/addGui.js";

const canvasScale = 0.25;

const canvasParams = {
  visible: true,
}

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

    // ----------GUI----------
    this.addGui();
  }

  setupCanvas(canvas) {
    const size = getSize();
    this.canvas = canvas;
    this.canvas.width = size.width * canvasScale;
    this.canvas.height = size.height * canvasScale;
    this.canvas.style.visibility = canvasParams.visible ? "visible" : "hidden";

    this.texture = new THREE.CanvasTexture(this.canvas);

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
      new THREE.MeshBasicMaterial(),
    )
    this.plane.visible = false;
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
   * animate canvas and texture based on cursor position
   * @param {THREE.Camera} camera
   */
  animate(camera) {
    // update raycaster
    this.raycaster.setFromCamera(this.screenCursor.current, camera);
    const intersects = this.raycaster.intersectObject(this.plane);
    if(intersects.length > 0) {
      const uv = intersects[0].uv;
      const pos = deNormalizePos(uv, this.canvas.width, this.canvas.height)
      this.canvasCursor.update(pos);
    }

    // Fill rect
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 0.01;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw cursor image
    const dist = this.canvasCursor.delta;
    const alpha = Math.min(dist * 0.1, 1);
    this.ctx.globalCompositeOperation = "lighten";
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(
      this.canvasCursor.image,
      this.canvasCursor.imagePos.x,
      this.canvasCursor.imagePos.y,
      this.canvasCursor.imageSize,
      this.canvasCursor.imageSize,
    )

    this.texture.needsUpdate = true;
  }

  /**
   * resize
   * @param {THREE.Camera} camera
   */
  onResize(camera) {
    const size = getSize();
    this.canvas.width = size.width * canvasScale;
    this.canvas.height = size.height * canvasScale;

    this.plane.matrixWorldNeedsUpdate = true;
    const {width, height} = currentFullscreen(camera);
    this.plane.scale.set(width, height, 1);
  }

  addGui() {
    const folder = gui.addFolder("Dispacement canvas");
    folder.add(canvasParams, "visible")
      .onChange((value) => this.canvas.style.visibility = value ? "visible" : "hidden");
  }
}
