import * as THREE from "three";
import textureSrc from "../../../assets/text.png";

const TextureSize = {
  width: 2218,
  height: 540,
}

export const loader = new THREE.TextureLoader();

/**
 * Create text plane.
 * @returns THREE.Mesh
 */
export const createTextPlane = () => {
  const geometry = new THREE.PlaneGeometry(4, 2, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x6EB7DB,
  });
  const plane = new THREE.Mesh(geometry, material);

  const texture = loader.load(textureSrc);
  const textGeometry = new THREE.PlaneGeometry(
    TextureSize.width, TextureSize.height, 1, );
  const textMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.scale.set(0.001, 0.001, 1);

  const group = new THREE.Group();
  group.add(plane);
  group.add(text);

  return group;
};
