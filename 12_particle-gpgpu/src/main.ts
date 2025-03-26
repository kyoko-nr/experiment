import { initThree } from "./three/initThree";

const init = () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app) {
    initThree(app);
  }
};

document.addEventListener("DOMContentLoaded", init);
