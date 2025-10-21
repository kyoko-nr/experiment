import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import { Suspense } from "react";
import { useControls } from "leva";
export const PixelationComponent = () => {
  const pixelSize = useControls("Pixelation", {
    granularity: {
      value: 15,
      label: "pixelSize",
      min: 1,
      max: 100,
      step: 1,
    },
  });

  return (
    <Suspense fallback={null}>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial wireframe={false} />
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
      </mesh>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 1, -2]} color="white" intensity={1.0} />
      <EffectComposer>
        <Pixelation granularity={pixelSize.granularity} />
      </EffectComposer>
    </Suspense>
  );
};
