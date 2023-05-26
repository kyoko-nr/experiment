import { Graphics } from "pixi.js";
import { CurveInterpolator } from "curve-interpolator";

export class Blob extends Graphics {
  private readonly blobName = "blob";

  constructor () {
    super();
    this.beginFill(0x00ff00).drawCircle(0, 0, 100).endFill();

    this.pivot.x = 0;
    this.pivot.y = 0;
  }

  move () {
    console.log("move", this.blobName);
  }
}
