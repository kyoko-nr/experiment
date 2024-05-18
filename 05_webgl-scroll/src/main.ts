import { initThree } from "./three/initThree";

const init = () => {
  const webgl = document.querySelector("#webgl");
  const images = document.querySelectorAll("img");

  const { renderer, camera, scene } = initThree(Array.from(images));

  webgl?.appendChild(renderer.domElement);

  const tick = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();
};

init();
