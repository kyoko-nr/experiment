import * as THREE from "three";

const PLANE_COLOR = 0xffffff;


export const createPlane = (_width: number, _height: number) => {
  const mat = new THREE.MeshLambertMaterial({
    color: PLANE_COLOR,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const geo = new THREE.PlaneGeometry(240, 40, 400, 400);
  const plane = new THREE.Mesh( geo, mat );

  plane.rotation.x = -1.5;
  plane.position.y = -12;

  // addGUI(plane);

  return plane;
}
