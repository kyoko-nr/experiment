import { useFrame, useLoader } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { type BufferGeometry, Color, type Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
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
  vec3,
} from "three/tsl";
import {
  MeshStandardNodeMaterial,
  type Node,
  type UniformNode,
} from "three/webgpu";
import rabbitSrc from "../assets/rabbit.glb?url";
import { metalnessAtom, morphAtom, roughnessAtom } from "../state/morphAtoms";

const calcMorphedPos = (
  p: Node<"vec3">,
  morph: UniformNode<"float", number>,
) => {
  // sphere = 原点から全て距離が同じ点の集まり
  const s = normalize(p);
  // box = x, y, zのうち一番大きい値を集まる面として寄せる
  // normalizeしたものを割り戻す
  const b = s.div(max(s.x.abs(), s.y.abs(), s.z.abs()));
  // 0-1: うさぎ → sphere
  // 1-2: sphere → box
  const rToS = mix(p, s, morph.clamp(0, 1));
  return mix(rToS, b, morph.sub(1).clamp(0, 1));
};

// モデルがboxGeometryを前提にした法線計算
const calcUvBoxBase = Fn(
  ({ morph }: { morph: UniformNode<"float", number> }) => {
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
    const sM = calcMorphedPos(s, morph);
    const s1M = calcMorphedPos(s.add(s1.mul(e)), morph);
    const s2M = calcMorphedPos(s.add(s2.mul(e)), morph);
    // 計算したい点(sM)と2点のベクトルを計算し、その外積を求めて法線とする
    // ただし、s1, s2の反転の組み合わせによってはuvは箱の内側になっている場合がある
    // 元々の点の法線方向と内積を取ることで、それがマイナス方向なら箱の内側に法線が向いてしまっている
    // 箱の内側に向いているなら反転することで箱の外側の法線として描画させる
    const n = normalize(cross(s1M.sub(sM), s2M.sub(sM)));
    const uv = select(dot(s, n).lessThan(0), n.negate(), n);
    normalLocal.assign(uv);
  },
);
void calcUvBoxBase;

const calcUvNear = Fn(({ morph }: { morph: UniformNode<"float", number> }) => {
  // 法線の計算
  const s = positionLocal;
  const g = normalGeometry;
  // 変形後の点を取得
  const e = 0.001;
  const compare = select(
    g.y.abs().greaterThan(0.9),
    vec3(1, 0, 0),
    vec3(0, 1, 0),
  );
  const s1 = normalize(cross(g, compare));
  const s2 = cross(g, s1);
  const sM = calcMorphedPos(s, morph);
  const s1M = calcMorphedPos(s.add(s1.mul(e)), morph);
  const s2M = calcMorphedPos(s.add(s2.mul(e)), morph);
  const uv = normalize(cross(s1M.sub(sM), s2M.sub(sM)));
  normalLocal.assign(uv);
});

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

  const rabbit = useLoader(GLTFLoader, rabbitSrc);

  const { material, geometry } = useMemo(() => {
    const material = new MeshStandardNodeMaterial({
      metalness: 1,
      roughness: 0,
      color: new Color(0.78, 0.78, 0.78),
    });
    // const geometry = new BoxGeometry(2, 2, 2, 32, 32, 32);

    const geom: BufferGeometry[] = [];
    rabbit.scene.updateMatrixWorld();
    rabbit.scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) {
        return;
      }
      geom.push(mesh.geometry.clone().applyMatrix4(mesh.matrixWorld));
    });
    const geometry = mergeGeometries(geom);
    geometry.center();
    geometry.scale(0.8, 0.8, 0.8);

    const morph = Fn(() => {
      // 形の変形
      const morphedPos = calcMorphedPos(positionLocal, uniforms.morph);
      // 法線の計算
      // calcUvBoxBase({morph: uniforms.morph})
      calcUvNear({ morph: uniforms.morph });

      return morphedPos;
    });
    material.positionNode = morph();

    return { material, geometry };
  }, [uniforms.morph, rabbit]);

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
