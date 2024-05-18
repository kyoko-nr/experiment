import { createMesh } from "./createMesh";
import { toCanvasPoint } from "../utils/toCanvasPoint";

/**
 * create Three.js Mesh from HTMLImageElement
 * @param img image element
 * @returns
 */
export const createImagePlane = (img: HTMLImageElement) => {
  const mesh = createMesh(img);

  const rect = img.getBoundingClientRect();
  console.log("debug: createImagePlane", mesh, img, rect);

  mesh.scale.x = rect.width;
  mesh.scale.y = rect.height;

  const { x, y } = toCanvasPoint(rect);
  mesh.position.set(x, y, mesh.position.z);

  return mesh;
};
