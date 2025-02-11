import { initThree } from "./three/initThree";

const init = () => {
  console.log("init");
  initThree(document.querySelector("#app"));
};

document.addEventListener("DOMContentLoaded", init);
