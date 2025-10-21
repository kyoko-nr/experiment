import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Mesh } from "three";
import { useRef } from "react";

export const DepthOfFieldComponent = () => {
  const focusRef = useRef<Mesh | undefined>(undefined);

  return (
    <>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial wireframe={true} />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.2, Math.PI * 0.4]} ref={focusRef}>
        <boxGeometry />
        <meshStandardMaterial color={[0.5, 1.0, 1.0]} />
      </mesh>
      <mesh position={[1.4, 0, 0.2]} rotation={[0, Math.PI * 0.3, 0]}>
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
      <ambientLight intensity={1.0} />
      <directionalLight position={[0, 1, -2]} color="white" intensity={1.0} />
      <EffectComposer>
        <DepthOfField focusDistance={1} focusRange={0.0001} bokehScale={5.0} />
      </EffectComposer>
    </>
  );
};
