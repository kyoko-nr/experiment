import { initThree } from "./three/initThree";

const init = () => {
  initThree(document.querySelector("#app"));
};

document.addEventListener("DOMContentLoaded", init);
