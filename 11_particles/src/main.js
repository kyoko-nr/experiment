import { initThree } from "./three/initThree";
import { triggerAnimation } from "./triggerAnimation";

const init = () => {
  const app = document.querySelector("#app");
  const { updateCameraAnim, updateMorphAnim } = initThree(app);

  triggerAnimation(updateCameraAnim, updateMorphAnim);
};

document.addEventListener("DOMContentLoaded", init);
