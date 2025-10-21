import { EffectComposer, LensFlare } from "@react-three/postprocessing";
import { Suspense } from "react";
import { useControls, folder } from "leva";

function DirtLensFlare() {
  // const texture = useTexture('/lensDirtTexture.png')

  const lensFlareProps = useControls({
    LensFlare: folder(
      {
        enabled: { value: true, label: "enabled?" },
        opacity: { value: 1.0, min: 0.0, max: 1.0, label: "opacity" },
        position: {
          value: { x: -25, y: 6, z: -60 },
          step: 1,
          label: "position",
        },
        glareSize: { value: 0.35, min: 0.01, max: 1.0, label: "glareSize" },
        starPoints: {
          value: 6.0,
          step: 1.0,
          min: 0,
          max: 32.0,
          label: "starPoints",
        },
        animated: { value: true, label: "animated?" },
        followMouse: { value: false, label: "followMouse?" },
        anamorphic: { value: false, label: "anamorphic?" },
        // colorGain: { value: new Color(56, 22, 11), label: 'colorGain' },

        Flare: folder({
          flareSpeed: {
            value: 0.4,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareSpeed",
          },
          flareShape: {
            value: 0.1,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareShape",
          },
          flareSize: {
            value: 0.005,
            step: 0.001,
            min: 0.0,
            max: 0.01,
            label: "flareSize",
          },
        }),

        SecondaryGhosts: folder({
          secondaryGhosts: { value: true, label: "secondaryGhosts?" },
          ghostScale: { value: 0.1, min: 0.01, max: 1.0, label: "ghostScale" },
          aditionalStreaks: { value: true, label: "aditionalStreaks?" },
        }),

        StartBurst: folder({
          starBurst: { value: true, label: "starBurst?" },
          haloScale: { value: 0.5, step: 0.01, min: 0.3, max: 1.0 },
        }),
      },
      { collapsed: true },
    ),
  });

  return <LensFlare {...lensFlareProps} />;
}

export const LensflareComponent = () => {
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
        <DirtLensFlare />
      </EffectComposer>
    </Suspense>
  );
};
