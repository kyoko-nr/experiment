import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, type Mesh } from "three";
import {
  cross,
  Fn,
  max,
  mix,
  normalize,
  normalLocal,
  positionLocal,
  select,
  uniform,
  vec3,
} from "three/tsl";
import { MeshStandardNodeMaterial, type Node } from "three/webgpu";
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

    const morph = Fn(() => {
      const calcMorphedPos = (p: Node<"vec3">) => {
        // sphere = 原点から全て距離が同じ点の集まり
        const s = normalize(p);
        // box = x, y, zのうち一番大きい値を集まる面として寄せる
        // normalizeしたものを割り戻す
        const b = s.div(max(s.x.abs(), s.y.abs(), s.z.abs()));
        return mix(s, b, uniforms.morph);
      };

      // 形の変形
      const morphedPos = calcMorphedPos(positionLocal);

      // 法線の計算
      const s = normalize(positionLocal);
      // sが上方向に近すぎる場合はx方向のベクトルとの外積をとる
      const compare = select(
        s.y.abs().lessThan(0.9),
        vec3(0, 1, 0),
        vec3(1, 0, 0),
      );
      // const compare = vec3(0, 1, 0);
      const s1 = normalize(cross(s, compare));
      const s2 = cross(s, s1);
      // 変形後の点を取得
      const e = 0.01;
      const sM = calcMorphedPos(s);
      const s1M = calcMorphedPos(s.add(s1.mul(e)));
      const s2M = calcMorphedPos(s.add(s2.mul(e)));
      // 計算したい点(sM)と2点のベクトルを計算し、その外積を求めて法線とする
      const uv = normalize(cross(s1M.sub(sM), s2M.sub(sM)));
      normalLocal.assign(uv);

      return morphedPos;
    });
    material.positionNode = morph();
    // material.wireframe = true;

    return { material, geometry };
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
