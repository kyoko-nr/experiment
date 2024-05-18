import { createMesh } from "./createMesh";
import { toCanvasPoint } from "../utils/toCanvasPoint";
import { ImagePlane } from "./types";

/**
 * create Three.js Mesh from HTMLImageElement
 * @param img image element
 * @returns
 */
export const createImagePlane = (img: HTMLImageElement): ImagePlane => {
  const mesh = createMesh(img);

  const rect = img.getBoundingClientRect();

  mesh.scale.x = rect.width;
  mesh.scale.y = rect.height;

  const { x, y } = toCanvasPoint(rect);
  mesh.position.set(x, y, mesh.position.z);

  return { dom: img, mesh };
};
