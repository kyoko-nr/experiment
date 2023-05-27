import { Application } from "pixi.js";

export const createPixiApp = (width: number, height: number) => {
  return new Application<HTMLCanvasElement>({
    width,
    height,
    resolution: 1,
    antialias: true,
    autoDensity: true,
    backgroundColor: 0xffffff
  });
};
