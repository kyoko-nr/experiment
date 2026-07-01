import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  LinearSRGBColorSpace,
  NoToneMapping,
  WebGPURenderer,
} from "three/webgpu";
import { ModelBox } from "./ModelBox";

type WebGPURendererParameters = ConstructorParameters<typeof WebGPURenderer>[0];

export const BoxingScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={async (props) => {
        const renderer = new WebGPURenderer(props as WebGPURendererParameters);
        await renderer.init();
        renderer.toneMapping = NoToneMapping;
        renderer.outputColorSpace = LinearSRGBColorSpace;
        return renderer;
      }}
    >
      <color attach="background" args={["#08090d"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 4]} intensity={1.8} />
      <Suspense fallback={null}>
        <ModelBox />
      </Suspense>
    </Canvas>
  );
};
