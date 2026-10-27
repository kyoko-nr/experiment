import { Canvas } from "@react-three/fiber";
import { WebGPURenderer } from "three/webgpu";
import { Boids } from "./Boids";

type WebGPURendererParameters = ConstructorParameters<typeof WebGPURenderer>[0];

export const BoidsScene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 100 }}
        gl={async (props) => {
          const renderer = new WebGPURenderer(
            props as WebGPURendererParameters,
          );
          await renderer.init();
          return renderer;
        }}
      >
        <color attach="background" args={["#8891a0"]} />
        <Boids />
      </Canvas>
    </div>
  );
};
