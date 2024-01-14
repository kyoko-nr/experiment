import * as THREE from "three";

const PLANE_COLOR = 0x00ff00;

export const createPlane = (width: number, height: number) => {
  // const mat = new THREE.MeshLambertMaterial({
  //   color: PLANE_COLOR,
  //   side: THREE.DoubleSide
  // });

  // TODO codepenのgetRendererSizeでz-axisからsegmentsを計算してそう。解読する。
  // TODO width = width, height = heightにする
  const geo = new THREE.PlaneGeometry(5, 5, 100, 100);
  const mat = new THREE.MeshBasicMaterial( { color: PLANE_COLOR } );
  const plane = new THREE.Mesh( geo, mat );

  plane.rotation.x = -Math.PI * 0.5 - 0.2;
  plane.position.y = -3

  return plane;
}