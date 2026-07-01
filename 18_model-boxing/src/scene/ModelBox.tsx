import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import {
  MeshBasicNodeMaterial,
  TorusKnotGeometry,
  type Node,
} from "three/webgpu";
import { boxDivision, shaderMixAtom, wireframeAtom } from "../state/sceneAtoms";
import { createBoxColorNode } from "../shaders/createBoxColorNode";

export const ModelBox = () => {
  const meshRef = useRef<Mesh>(null);
  const shaderMix = useAtomValue(shaderMixAtom);
  const wireframe = useAtomValue(wireframeAtom);
  const division = useAtomValue(boxDivision);

  const geometry = useMemo(() => {
    const geom = new TorusKnotGeometry(0.5, 0.2, 128);
    const posArry = geom.attributes.position.array;
    for (let i = 0; i < posArry.length; i++) {
      posArry[i] = Math.round(posArry[i] * division) / division;
    }
    geom.attributes.position.needsUpdate = true;
    return geom;
  }, [division]);

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
    meshRef.current.rotation.x += delta * 0.3 * 0.6;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};
