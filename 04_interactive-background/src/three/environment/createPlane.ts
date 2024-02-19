import * as THREE from "three";
import { getGui } from "../gui/gui";

const PLANE_COLOR = 0x00ff00;

export const createPlane = (width: number, height: number) => {
  // const mat = new THREE.MeshLambertMaterial({
  //   color: PLANE_COLOR,
  //   side: THREE.DoubleSide
  // });

  // TODO codepenのgetRendererSizeでz-axisからsegmentsを計算してそう。解読する。
  // TODO width = width, height = heightにする
  const geo = new THREE.PlaneGeometry(200, 100, 20, 20);
  const mat = new THREE.MeshBasicMaterial( { color: PLANE_COLOR, wireframe: true } );
  const plane = new THREE.Mesh( geo, mat );

  plane.rotation.x = -1.5;
  plane.position.y = -25;

  addGUI(plane);
  // addGeomGUI(plane);

  return plane;
}

const addGUI = (obj: THREE.Mesh) => {
  const gui = getGui();
  const folder = gui.addFolder("plane");
  folder.add(obj.rotation, "x", -Math.PI, Math.PI, 0.01).name("rotation x");
  folder.add(obj.position, "y", -10, 10, 0.01).name("position y");
  folder.add(obj.scale, "x", 0.5, 4, 0.01).name("scale x");
  folder.add(obj.scale, "y", 0.5, 4, 0.01).name("scale y");
}