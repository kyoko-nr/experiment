import "../styles/style.scss";
import jsondata from "../images/lottie/lottie-anim-1.json?raw";
import { createPixiApp } from "./pixi/createPixiApp";
import { loadAnimation } from "./lottie/loadAnimation";
import { createSprite } from "./pixi/createSprite";
import { Graphics } from "pixi.js";

const getCircle = () => {
  const circle = new Graphics();
  circle.clear();
  circle.beginFill(0x00ff00);
  circle.drawCircle(0, 0, 100);
  circle.endFill();
  circle.pivot.set(0, 0);
  return circle;
};

const init = () => {
  const div = document.querySelector<HTMLDivElement>("#app");
  if (div == null) throw new Error("#appとcanvasが見つからない");

  const { animation, canvas } = loadAnimation(jsondata, div);
  animation.hide(); // 踏み台のcanvasを隠す

  const sprite = createSprite(canvas);
  sprite.scale.set(0.5);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const app = createPixiApp(width, height);

  app.stage.addChild(sprite);

  const circle = getCircle();
  circle.position.x = window.innerWidth / 2;
  circle.position.y = window.innerHeight / 2;
  app.stage.addChild(circle);

  div.appendChild(app.view);

  app.ticker.add(() => {
    sprite.texture.update();
  });
};

init();
