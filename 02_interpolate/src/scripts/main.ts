import "../styles/style.scss";
import jsondata from "../images/lottie/lottie-anim-1.json?raw";
import { createPixiApp } from "./pixi/createPixiApp";
import { loadAnimation } from "./lottie/loadAnimation";
import { createSprite } from "./pixi/createSprite";
import { Blob } from "./pixi/class/Blob.ts";

const app = document.querySelector<HTMLDivElement>("#app");
if (app == null) throw new Error("#appが存在しません。");

const width = window.innerWidth;
const height = window.innerHeight;

const { animation, canvas } = loadAnimation(jsondata, app);

const sprite = createSprite(canvas);

const blob = new Blob();

const pixiApp = createPixiApp(width, height, canvas);
pixiApp.stage.addChild(sprite);
pixiApp.stage.addChild(blob);

app.appendChild(pixiApp.view);
