import * as THREE from "three";

/**
 * Normalize x and y to be between -1 and 1
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @returns {THREE.Vector2}
 */
export const normalizePos = (x, y, width, height) => {
  const normalizedX = (x / width) * 2 - 1;
  const normalizedY = -(y / height) * 2 + 1;
  return new THREE.Vector2(normalizedX, normalizedY);
}

/**
 * De-normalize uv(0-1) to rect
 * @param {THREE.Vector2} uv 
 * @param {Number} width 
 * @param {Number} height 
 * @returns {THREE.Vector2}
 */
export const deNormalizePos = (uv, width, height) => {
  const x = (uv.x) * width;
  const y = (1 - uv.y) * height;
  return new THREE.Vector2(x, y);
}
