import {
  EffectComposer,
  GodRays,
  Bloom,
  SMAA,
  DepthOfField,
} from "@react-three/postprocessing";
import { DoubleSide, Mesh, Vector3 } from "three";
import { Suspense, useState } from "react";

type Rotation = [x: number, y: number, z: number];

export const NaturalLightComponent = () => {
  const [sun, setSun] = useState<Mesh | null>(null);

  const boxes: { pos: Vector3; rotation: Rotation; key: string }[] = [];

  // x方向に6個、y方向に6個ずつ並べる
  const x = 4;
  const y = 4;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const pos = new Vector3(i * 2 - 3, j * 2 - 3, 0);
      const rotation: Rotation = [0, Math.PI * 0.2, Math.PI * 0.4];
      boxes.push({ pos, rotation, key: `${i}-${j}` });
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      {/* <OrbitControls enableDamping /> */}
      <Suspense fallback={null}>
        {/* 背景は少し暗め（筋が見えやすい） */}
        <color attach="background" args={["#1a1b1e"]} />

        {/* 太陽（必ず Basic & HDR 小さめ & toneMapped=false） */}
        <mesh ref={setSun} position={[0.6, 1.2, 1.5]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color={[1.4, 1.4, 1.4]} toneMapped={false} />
        </mesh>

        <mesh
          receiveShadow={true}
          rotation={[Math.PI * 0.5, 0, 0]}
          position={[0, -4, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={[1.0, 1.0, 1.0]} side={DoubleSide} />
        </mesh>

        {/* 少しだけ“選択的 Bloom”の実感用に emissive を上げた箱 */}
        {boxes.map((box) => (
          <mesh
            key={box.key}
            position={box.pos}
            rotation={box.rotation}
            castShadow={true}
            receiveShadow={true}
          >
            <boxGeometry />
            <meshStandardMaterial
              emissive={[2.5, 0.2, 0.2]}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* sun が用意できてからポストを起動（順序が重要） */}
        {sun && (
          <EffectComposer multisampling={0}>
            <SMAA />

            {/* Bloom: 選択的（>1 だけ拾う） */}
            <Bloom intensity={1.0} luminanceThreshold={1.0} mipmapBlur />

            {/* GodRays: 白飛びしない安全域 */}
            <GodRays
              sun={sun}
              exposure={0.9}
              decay={0.95}
              density={0.9}
              weight={0.1}
              samples={54}
              clampMax={0.88}
            />

            {/* Depth of Field: 主題を少しだけ浮かせる */}
            <DepthOfField
              focusDistance={0.02} // カメラ近めにピント
              focalLength={0.01}
              bokehScale={1}
            />
          </EffectComposer>
        )}
      </Suspense>
    </>
  );
};
