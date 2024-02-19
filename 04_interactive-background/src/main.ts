import './style.css';
import { initGui } from './three/gui/gui';
import { initThree } from './three/initThree';

const init = () => {
  const app = document.querySelector("#app");
  const {renderer} = initThree();
  app?.append(renderer.domElement);

  initGui(app);
}

init();