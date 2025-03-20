import { initThree } from "./three/initThree";

const init = () => {
  const app = document.querySelector("#app");
  initThree(app);
};

document.addEventListener("DOMContentLoaded", init);
