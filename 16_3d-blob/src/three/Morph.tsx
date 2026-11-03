// import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { type Mesh, SphereGeometry } from "three";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { metalnessAtom, roughnessAtom } from "../state/morphAtoms";

export const Morph = () => {
  const meshRef = useRef<Mesh>(null);
  const metalness = useAtomValue(metalnessAtom);
  const roughness = useAtomValue(roughnessAtom);

  const { material } = useMemo(() => {
    const material = new MeshStandardNodeMaterial({
      metalness: 1,
      roughness: 0,
      color: "#808080",
    });
    return { material };
  }, []);

  useEffect(() => {
    material.metalness = metalness;
    material.roughness = roughness;
  }, [material, metalness, roughness]);

  // useFrame(({ clock }) => {
  //   const elapsed = clock.elapsedTime;
  //   meshRef.current?.rotation.set(0, elapsed, elapsed * 0.5);
  // });

  return (
    <mesh ref={meshRef} args={[new SphereGeometry(1, 64, 64), material]} />
  );
};
