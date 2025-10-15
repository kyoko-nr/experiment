import * as THREE from "three";

export const createCapsule = (): THREE.Mesh => {
  const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 1.4, 16, 32);
  const capsuleMaterial = new THREE.MeshStandardMaterial({
    color: 0x2e7dab,
    roughness: 0.4,
    metalness: 0.15,
  });

  const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsule.castShadow = true;
  capsule.receiveShadow = true;
  capsule.position.y = 1;

  return capsule;
};
