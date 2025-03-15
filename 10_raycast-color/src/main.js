import { initThree } from "./three/initThree";

const init = () => {
  const app = document.querySelector("#app");
  const canvas = document.querySelector("#displacement");
  initThree(app, canvas);
};

document.addEventListener("DOMContentLoaded", init);
