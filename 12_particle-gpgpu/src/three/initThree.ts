import { updateSizeOnResize } from "../utils/getSize";
import { Environment } from "./Environment";

/**
 * Initialize Three.js
 * @param app
 */
export const initThree = (app: HTMLDivElement) => {
  updateSizeOnResize();

  const environment = new Environment(app);

  const animate = () => {
    environment.render();
    requestAnimationFrame(animate);
  };
  animate();

  window.addEventListener("resize", () => {
    updateSizeOnResize();
    environment.onResize();
  });
};
