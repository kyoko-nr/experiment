import { Point } from "pixi.js";

export class MovingPoint extends Point {
  random = { x: Math.random() * 1, y: Math.random() * 1.1 };

  move (range: { x: number, y: number }, time: number) {
    const x = Math.sin(time * this.random.x) * range.x;
    const y = Math.cos(time * this.random.y) * range.y;
    this.x += x;
    this.y += y;
  }
}
