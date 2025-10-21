import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BloomComponent } from "./effects/Bloom";
import { GridComponent } from "./effects/Grid";
import { NoiseComponent } from "./effects/Noise";
import { PixelationComponent } from "./effects/Pixelation";
import { ScanlineComponent } from "./effects/ScanLine";
import { NaturalLightComponent } from "./NaturalLight";
import { VignetteComponent } from "./effects/Vignette";
import { useControls } from "leva";
import { ChromaticAberrationComponent } from "./effects/ChromaticAberration";
import { ColorAverageComponent } from "./effects/ColorAverage";
import { DotScreenComponent } from "./effects/DotScreen";
import { GlitchComponent } from "./effects/Glitch";

type Effects =
  | "bloom"
  | "chromatic"
  | "colorAve"
  | "dot"
  | "glitch"
  | "grid"
  | "noise"
  | "pixelation"
  | "scanline"
  | "light"
  | "vignette";

const effectOptions: Readonly<Effects[]> = [
  "bloom",
  "chromatic",
  "colorAve",
  "dot",
  "glitch",
  "grid",
  "noise",
  "pixelation",
  "scanline",
  "light",
  "vignette",
] as const;

export const Scene = () => {
  const { effect } = useControls("Effect", {
    effect: {
      options: effectOptions,
      value: "vignette",
    },
  });

  return (
    <Canvas camera={{ position: [2.5, 2, -5], fov: 60 }}>
      <color attach="background" args={["#303035"]} />
      <OrbitControls enableDamping={true} />
      {effect === "bloom" && <BloomComponent />}
      {effect === "chromatic" && <ChromaticAberrationComponent />}
      {effect === "colorAve" && <ColorAverageComponent />}
      {effect === "dot" && <DotScreenComponent />}
      {effect === "glitch" && <GlitchComponent />}
      {effect === "grid" && <GridComponent />}
      {effect === "noise" && <NoiseComponent />}
      {effect === "pixelation" && <PixelationComponent />}
      {effect === "scanline" && <ScanlineComponent />}
      {effect === "light" && <NaturalLightComponent />}
      {effect === "vignette" && <VignetteComponent />}
    </Canvas>
  );
};
