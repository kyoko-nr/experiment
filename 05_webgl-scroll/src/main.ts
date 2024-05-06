import { initThree } from "./three/initThree";

const init = () => {
  const webgl = document.querySelector("#webgl");
  const { renderer, camera, scene } = initThree();

  webgl?.appendChild(renderer.domElement);

  const tick = () => {
    renderer.render(scene, camera);
  };
  tick();
};

init();
