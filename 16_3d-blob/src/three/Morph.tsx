import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxGeometry, type Mesh, MeshNormalMaterial } from "three";

export const Morph = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    meshRef.current?.rotation.set(0, elapsed, elapsed * 0.5);
  });

  return (
    <mesh
      ref={meshRef}
      args={[new BoxGeometry(1, 1, 1), new MeshNormalMaterial()]}
    />
  );
};
