import * as THREE from "three";
import { getGui } from "../gui/gui";

const PLANE_COLOR = 0xffffff;


export const createPlane = (width: number, height: number) => {
  const mat = new THREE.MeshLambertMaterial({
    color: PLANE_COLOR,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  // TODO codepenのgetRendererSizeでz-axisからsegmentsを計算してそう。解読する。
  // TODO width = width, height = heightにする
  const geo = new THREE.PlaneGeometry(240, 40, 400, 400);
  const plane = new THREE.Mesh( geo, mat );

  plane.rotation.x = -1.5;
  plane.position.y = -12;

  // addGUI(plane);

  return plane;
}

const addGUI = (obj: THREE.Mesh) => {
  const gui = getGui();
  const folder = gui.addFolder("plane");
  folder.add(obj.position, "y", -20, 20, 0.01).name("position y");
  folder.add(obj.scale, "x", 0.5, 4, 0.01).name("scale x");
  folder.add(obj.scale, "y", 0.5, 4, 0.01).name("scale y");
  folder.addColor(obj.material, "color")
}