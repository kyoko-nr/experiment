import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { BoxGeometry, MeshBasicNodeMaterial, type Node } from "three/webgpu";
import {
  boxRotationSpeedAtom,
  boxScaleAtom,
  shaderMixAtom,
  wireframeAtom,
} from "../state/sceneAtoms";
import { createBoxColorNode } from "../shaders/createBoxColorNode";

export const ModelBox = () => {
  const meshRef = useRef<Mesh>(null);
  const rotationSpeed = useAtomValue(boxRotationSpeedAtom);
  const scale = useAtomValue(boxScaleAtom);
  const shaderMix = useAtomValue(shaderMixAtom);
  const wireframe = useAtomValue(wireframeAtom);

  const geometry = useMemo(
    () => new BoxGeometry(1.6, 1.6, 1.6, 12, 12, 12),
    [],
  );
  const material = useMemo(() => {
    const nextMaterial = new MeshBasicNodeMaterial();
    nextMaterial.colorNode = createBoxColorNode(shaderMix) as Node<"vec3">;
    nextMaterial.wireframe = wireframe;
    return nextMaterial;
  }, [shaderMix, wireframe]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.6;
    meshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      scale={[scale, scale, scale]}
    />
  );
};
