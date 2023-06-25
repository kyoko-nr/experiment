import { Graphics, Point } from "pixi.js";
import { CurveInterpolator } from "curve-interpolator";
import { MovingPoint } from "./Point";

export class Blob extends Graphics {
  private readonly blobName = "blob";

  radius = 200;
  count = 8;
  polAngle = (Math.PI * 2) / this.count;
  points: MovingPoint[] = [];

  constructor () {
    super();
    for (let i = 0; i < this.count; i++) {
      const x = Math.cos(i * this.polAngle) * this.radius;
      const y = Math.sin(i * this.polAngle) * this.radius;
      this.points.push(new MovingPoint(x, y));
    }
    this.pivot.set(0, 0);
    this.draw();
  }

  draw () {
    const interp = new CurveInterpolator(
      this.points.map((p) => [p.x, p.y]),
      { tension: 0, closed: true }
    );
    const newp = (interp.getPoints(40) as Array<[number, number]>).map(
      ([x, y]) => new Point(x, y)
    );
    this.clear();
    this.beginFill(0x00ffff);
    this.drawPolygon(newp);
    this.endFill();
  }

  move (delta: number) {
    this.points.forEach((p) => {
      p.move({ x: 0.2, y: 0.3 }, delta * 0.1);
    });
    this.draw();
  }
}
