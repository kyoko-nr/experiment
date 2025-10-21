import {
  Bloom,
  EffectComposer,
  SMAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { DoubleSide, Mesh, Vector3 } from "three";
import { Suspense, useState } from "react";

type Rotation = [x: number, y: number, z: number];
export const GodRaysComponent = () => {
  const [sun, setSun] = useState<Mesh | null>(null);

  const boxes: { pos: Vector3; rotation: Rotation }[] = [];

  // x方向に6個、y方向に6個ずつ並べる
  const x = 4;
  const y = 4;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const pos = new Vector3(i * 2 - 3, j * 2 - 3, 0);
      const rotation: Rotation = [0, Math.PI * 0.2, Math.PI * 0.4];
      boxes.push({ pos, rotation });
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />

      <Suspense fallback={null}>
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
            key={box.pos.toString()}
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

        {/* <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial wireframe={true} />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.2, Math.PI * 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color={[0.5, 1.0, 1.0]} />
      </mesh>
      <mesh position={[1.4, 0, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={[1.0, 0.2, 0.2]} />
      </mesh>
      <mesh
        position={[-1.6, 0, -0.3]}
        rotation={[Math.PI * 0.25, 0, Math.PI * 0.15]}
      >
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial color={[0.4, 1.0, 0.5]} />
      </mesh> */}

        {sun && (
          <EffectComposer multisampling={0}>
            <SMAA />

            {/* Bloom: 選択的（>1 だけ拾う） */}
            <Bloom intensity={1.0} luminanceThreshold={1.0} mipmapBlur />

            {/* GodRays: 白飛びしない安全域 */}
            {/* <GodRays
            sun={sun}
            exposure={0.9}
            decay={0.95}
            density={0.9}
            weight={0.1}
            samples={54}
            clampMax={0.88}
          /> */}

            <ToneMapping
              adaptive={true} // 自動露出を有効（シーンの明暗に応じて変化）
              resolution={256} // 露出計算のサンプリング解像度
              middleGrey={0.6} // 明暗の中心。小さいと明るく、大きいと暗くなる
              maxLuminance={16.0} // 最大輝度
              averageLuminance={1.0} // 基準輝度
              adaptationRate={1.0} // 明るさの変化スピード
            />
          </EffectComposer>
        )}
      </Suspense>
    </>
  );
};
