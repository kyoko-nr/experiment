import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, type Mesh } from "three";
import { Fn, max, mix, normalize, positionLocal, uniform } from "three/tsl";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { metalnessAtom, morphAtom, roughnessAtom } from "../state/morphAtoms";

export const Morph = () => {
  const meshRef = useRef<Mesh>(null);
  const metalness = useAtomValue(metalnessAtom);
  const roughness = useAtomValue(roughnessAtom);
  const morph = useAtomValue(morphAtom);

  const uniforms = useMemo(
    () => ({
      morph: uniform(0),
    }),
    [],
  );

  useEffect(() => {
    uniforms.morph.value = morph;
  }, [uniforms, morph]);

  const { material, geometry } = useMemo(() => {
    const material = new MeshStandardNodeMaterial({
      metalness: 1,
      roughness: 0,
      color: new Color(0.78, 0.78, 0.78),
    });
    // material.wireframe = true
    const geometry = new BoxGeometry(2, 2, 2, 32, 32, 32);

    const morphPos = Fn(() => {
      // sphere = 原点から全て距離が同じ点の集まり
      const s = normalize(positionLocal);
      // box = x, y, zのうち一番大きい値を集まる面として寄せる
      // normalizeしたものを割り戻す
      const b = s.div(max(s.x.abs(), s.y.abs(), s.z.abs()));
      const pos = mix(s, b, uniforms.morph);
      return pos;
    });
    material.positionNode = morphPos();
    // material.wireframe = true;

    return { material, geometry, morphPos };
  }, [uniforms.morph]);

  useEffect(() => {
    material.metalness = metalness;
    material.roughness = roughness;
  }, [material, metalness, roughness]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    meshRef.current?.rotation.set(elapsed * 0.3, elapsed * 0.2, elapsed * 0.5);
  });

  return <mesh ref={meshRef} args={[geometry, material]} />;
};
