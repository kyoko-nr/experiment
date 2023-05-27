import { Graphics } from "pixi.js";
import { CurveInterpolator } from "curve-interpolator";

export class Blob extends Graphics {
  private readonly blobName = "blob";

  constructor () {
    super();

    this.draw();
  }

  draw () {
    this.clear();
    this.beginFill(0x00ff00);
    this.drawCircle(0, 0, 100);
    this.endFill();
  }

  move () {
    console.log("move", this.blobName);
  }
}
