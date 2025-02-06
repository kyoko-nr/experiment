import { initThree } from "./three/initThree";

/**
 * init
 */
export const init = () => {
  const app = document.querySelector("#app");
  if (app) {
    initThree(app);
  }
};

document.addEventListener("DOMContentLoaded", init);
