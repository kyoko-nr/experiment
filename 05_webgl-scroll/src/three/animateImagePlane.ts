import { ShaderMaterial } from "three";
import { toCanvasPoint } from "../utils/toCanvasPoint";
import type { ImagePlane } from "./types";

/**
 * animate ImagePlane
 * @param imagePlane
 * @param elapsedTime
 */
export const animateImagePlane = (
  imagePlane: ImagePlane,
  elapsedTime: number,
) => {
  const rect = imagePlane.dom.getBoundingClientRect();
  const mesh = imagePlane.mesh;

  mesh.scale.x = rect.width;
  mesh.scale.y = rect.height;

  const { x, y } = toCanvasPoint(rect);
  mesh.position.set(x, y, mesh.position.z);

  const material = mesh.material as ShaderMaterial;
  material.uniforms.uTime.value = elapsedTime;
};
