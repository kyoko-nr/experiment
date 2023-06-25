import "../styles/style.scss";
import jsondata from "../images/lottie/lottie-anim-1.json?raw";
import { createPixiApp } from "./pixi/createPixiApp";
import { loadAnimation } from "./lottie/loadAnimation";
import { createSprite } from "./pixi/createSprite";
import { Blob } from "./pixi/class/Blob";

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

  const blob = new Blob();
  blob.position.x = window.innerWidth / 2;
  blob.position.y = window.innerHeight / 2;
  app.stage.addChild(blob);

  // マスク
  sprite.mask = blob;

  div.appendChild(app.view);

  let lastTime = 0;

  app.ticker.add((time: number) => {
    lastTime += time;
    sprite.texture.update();
    blob.move(lastTime);
  });
};

init();
