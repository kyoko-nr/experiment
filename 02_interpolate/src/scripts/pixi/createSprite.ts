import { Texture, Sprite } from "pixi.js";

export const createSprite = (canvas: HTMLCanvasElement) => {
  const texture = Texture.from(canvas);
  const sprite = new Sprite(texture);

  return sprite;
};
