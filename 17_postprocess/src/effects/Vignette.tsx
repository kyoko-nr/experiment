import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Vector3 } from "three";
import { Suspense } from "react";
import { useControls } from "leva";

type Rotation = [x: number, y: number, z: number];
export const VignetteComponent = () => {
  const { offset, darkness, eskil } = useControls("Vignette", {
    offset: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    darkness: {
      value: 1.0,
      min: 0,
      max: 2,
      step: 0.01,
    },
    eskil: {
      value: false,
      label: "eskil?",
    },
  });

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
    <Suspense fallback={null}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[0, 1, -2]} color="white" intensity={1.0} />

      {boxes.map((box) => (
        <mesh
          key={box.key}
          position={box.pos}
          rotation={box.rotation}
          castShadow={true}
          receiveShadow={true}
        >
          <boxGeometry />
          <meshStandardMaterial color={[2.5, 0.2, 0.2]} toneMapped={false} />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial wireframe={false} />
      </mesh>

      <EffectComposer>
        <Vignette offset={offset} darkness={darkness} eskil={eskil} />
      </EffectComposer>
    </Suspense>
  );
};
