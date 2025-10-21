import { EffectComposer, Grid } from "@react-three/postprocessing";
import { Suspense } from "react";
import { BlendFunction } from "postprocessing";
export const GridComponent = () => {
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
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 1, -2]} color="white" intensity={1.0} />
      <EffectComposer>
        {/* <Grid scale={0.2} lineWidth={0.4} blendFunction={BlendFunction.COLOR_BURN} /> */}
        {/* <Grid scale={0.9} lineWidth={1} blendFunction={BlendFunction.DIFFERENCE} /> */}
        {/* <Grid scale={1} lineWidth={0.2} blendFunction={BlendFunction.DIVIDE} /> */}
        <Grid
          scale={1}
          lineWidth={0.9}
          blendFunction={BlendFunction.EXCLUSION}
        />
      </EffectComposer>
    </Suspense>
  );
};
