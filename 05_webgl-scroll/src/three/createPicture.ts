import { PlaneGeometry, ShaderMaterial, TextureLoader, Mesh } from "three";
import vShader from "./shaders/vShader.glsl";
import fShader from "./shaders/fShader.glsl";

export const createPicture = () => {
  const loader = new TextureLoader();
  const texture = loader.load("https://source.unsplash.com/whOkVvf0_hU/");
  const uniforms = {
    uTexture: { value: texture },
    uImageAspect: { value: 1920 / 1280 },
    uPlaneAspect: { value: 800 / 500 },
  };
  const geo = new PlaneGeometry(800, 500, 100, 100);
  const mat = new ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
  });
  const mesh = new Mesh(geo, mat);
  return mesh;
};
