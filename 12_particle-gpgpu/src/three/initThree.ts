import { updateSizeOnResize } from "../utils/getSize";
import { Environment } from "./Environment";
import { Particles } from "./Particles";

/**
 * Initialize Three.js
 * @param app
 */
export const initThree = (app: HTMLDivElement) => {
  updateSizeOnResize();

  const environment = new Environment(app);

  const particles = new Particles(environment.renderer, environment.scene);

  const animate = () => {
    environment.render();
    particles.animate();
    requestAnimationFrame(animate);
  };
  animate();

  window.addEventListener("resize", () => {
    updateSizeOnResize();
    environment.onResize();
  });
};
