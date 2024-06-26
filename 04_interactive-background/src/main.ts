import { setupInteraction } from './interaction';
import './style.css';
import { initThree } from './three/initThree';

const init = () => {
  const app = document.querySelector("#app");
  const {renderer} = initThree();
  app?.append(renderer.domElement);

  // initGui(app);

  setupInteraction();
}

init();