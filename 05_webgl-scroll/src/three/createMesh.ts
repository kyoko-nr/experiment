import { PlaneGeometry, ShaderMaterial, TextureLoader, Mesh } from "three";
import vShader from "./shaders/vShader.glsl";
import fShader from "./shaders/fShader.glsl";

const loader = new TextureLoader();

/**
 * create Three.js Mesh from HTMLImageElement
 * @param img HTMLImageElement
 * @returns
 */
export const createMesh = (img: HTMLImageElement) => {
  const texture = loader.load(img.src);
  const uniforms = {
    uTexture: { value: texture },
    uImageAspect: { value: img.naturalWidth / img.naturalHeight },
    uPlaneAspect: { value: img.clientWidth / img.clientHeight },
    uTime: { value: 0 },
  };
  const geo = new PlaneGeometry(1, 1, 100, 100);
  const mat = new ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
  });
  const mesh = new Mesh(geo, mat);
  return mesh;
};
