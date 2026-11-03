import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, type Mesh } from "three";
import {
  abs,
  cross,
  dot,
  Fn,
  max,
  mix,
  normalGeometry,
  normalize,
  normalLocal,
  positionLocal,
  select,
  uniform,
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
      // 元々持っているnormalの軸を並び替えることで2軸作る
      const ax1 = abs(normalGeometry).yzx;
      const ax2 = abs(normalGeometry).zxy;
      // 箱の内側むきの軸のベクトルを取得する
      // 点sに対して軸の内積(dot)を取る
      // y軸の場合、dot() = 0の場合は面の真ん中のy方向に並んだ点。
      // dot() > 0の場合、真ん中のy軸より上側にある。dot() < 0の場合はy軸より下側にある。
      // -------------------   ^
      //  . <-(dot() > 0の点)  |
      // -------------------- y軸
      //  . <-(dot() < 0の点)  |
      // --------------------
      // なので、0より大きい場合は反転して内側に向けてあげる
      const s1 = select(dot(s, ax1).greaterThan(0), ax1.negate(), ax1);
      const s2 = select(dot(s, ax2).greaterThan(0), ax2.negate(), ax2);

      // 変形後の点を取得
      const e = 0.01;
      const sM = calcMorphedPos(s);
      const s1M = calcMorphedPos(s.add(s1.mul(e)));
      const s2M = calcMorphedPos(s.add(s2.mul(e)));
      // 計算したい点(sM)と2点のベクトルを計算し、その外積を求めて法線とする
      // ただし、s1, s2の反転の組み合わせによってはuvは箱の内側になっている場合がある
      // 元々の点の法線方向と内積を取ることで、それがマイナス方向なら箱の内側に法線が向いてしまっている
      // 箱の内側に向いているなら反転することで箱の外側の法線として描画させる
      const n = normalize(cross(s1M.sub(sM), s2M.sub(sM)));
      const uv = select(dot(s, n).lessThan(0), n.negate(), n);
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
