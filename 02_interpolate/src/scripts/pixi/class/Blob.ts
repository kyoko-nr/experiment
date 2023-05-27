import { Graphics, Point } from "pixi.js";
import { CurveInterpolator } from "curve-interpolator";

export class Blob extends Graphics {
  private readonly blobName = "blob";

  radius = 400;
  count = 8;
  polAngle = (Math.PI * 2) / this.count;
  points: Point[] = [];

  constructor () {
    super();
    for (let i = 0; i < this.count; i++) {
      const x = Math.cos(i * this.polAngle) * this.radius;
      const y = Math.sin(i * this.polAngle) * this.radius;
      this.points.push(new Point(x, y));
    }
    this.pivot.set(0, 0);
    this.draw();
  }

  draw () {
    const interp = new CurveInterpolator(
      this.points.map((p) => [p.x, p.y]),
      { tension: 0, closed: true }
    );
    const ps = interp.getPoints(40) as Array<[number, number]>;
    const newp = Array.from(ps).map(([x, y]) => new Point(x, y));
    this.clear();
    this.beginFill(0x00ffff);
    this.drawPolygon(newp);
    this.endFill();
  }

  move () {
    console.log("move", this.blobName);
  }
}
