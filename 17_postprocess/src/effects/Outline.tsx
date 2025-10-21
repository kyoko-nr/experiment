import { Suspense, useRef } from "react";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import type { Mesh } from "three";

export const OutlineComponent = () => {
  const sphereRef = useRef<Mesh>(null);

  return (
    <Suspense fallback={null}>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial wireframe={true} />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.2, Math.PI * 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color={[0.5, 1.0, 1.0]} />
      </mesh>
      <mesh position={[1.4, 0, 0.2]} ref={sphereRef}>
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
        <Outline
          // selection={selection}
          selectionLayer={10}
          blendFunction={BlendFunction.SCREEN}
          edgeStrength={2.5}
          pulseSpeed={0.0}
          visibleEdgeColor={0xffffff}
          hiddenEdgeColor={0x22090a}
          kernelSize={KernelSize.LARGE}
          blur={false}
          xRay={true}
        />
      </EffectComposer>
    </Suspense>
  );
};
