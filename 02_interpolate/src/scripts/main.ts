import "../styles/style.scss";
import jsondata from "../images/lottie/lottie-anim-1.json?raw";
import { createPixiApp } from "./pixi/createPixiApp";
import { loadAnimation } from "./lottie/loadAnimation";
import { createSprite } from "./pixi/createSprite";

const app = document.querySelector<HTMLDivElement>("#app");
if (app == null) throw new Error("#appが存在しません。");

const width = window.innerWidth;
const height = window.innerHeight;

const { animation, canvas } = loadAnimation(jsondata, app);

const sprite = createSprite(canvas);

const pixiApp = createPixiApp(width, height, canvas);

pixiApp.stage.addChild(sprite);

app.appendChild(pixiApp.view);
