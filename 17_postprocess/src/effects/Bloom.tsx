import { EffectComposer } from "@react-three/postprocessing";
import { Bloom } from "@react-three/postprocessing";

export const BloomComponent = () => (
  <>
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[10, 10, 50, 50]} />
      <meshStandardMaterial wireframe={true} />
    </mesh>
    <mesh rotation={[0, Math.PI * 0.2, Math.PI * 0.4]}>
      <boxGeometry />
      <meshStandardMaterial color={[0.5, 1.8, 2.0]} toneMapped={false} />
    </mesh>
    <mesh position={[1.4, 0, 0.2]} rotation={[0, Math.PI * 0.3, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={[2.0, 1.2, 1.2]} toneMapped={false} />
    </mesh>
    <mesh
      position={[-1.6, 0, -0.3]}
      rotation={[Math.PI * 0.25, 0, Math.PI * 0.15]}
    >
      <torusGeometry args={[0.6, 0.2, 16, 32]} />
      <meshStandardMaterial color={[0.8, 2.0, 1.2]} toneMapped={false} />
    </mesh>
    <ambientLight />
    <directionalLight position={[0, 1, -2]} color="white" />
    <EffectComposer>
      <Bloom
        intensity={1.0}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.5}
        mipmapBlur={false}
      />
    </EffectComposer>
  </>
);
