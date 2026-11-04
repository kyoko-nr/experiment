import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { RoomEnvironment } from "three/examples/jsm/Addons.js";
import { PMREMGenerator, WebGPURenderer } from "three/webgpu";
import { Morph } from "./Morph";

type WebGPURendererParameters = ConstructorParameters<typeof WebGPURenderer>[0];

export const BlobScene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        gl={async (props) => {
          const renderer = new WebGPURenderer(
            props as WebGPURendererParameters,
          );
          await renderer.init();
          return renderer;
        }}
      >
        <SceneInner />
      </Canvas>
    </div>
  );
};

const SceneInner = () => {
  const { scene, gl } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl as unknown as WebGPURenderer);
    const environment = generator.fromScene(
      new RoomEnvironment(),
      0,
      0.1,
      100,
      { size: 2048 },
    );
    scene.environment = environment.texture;
    scene.background = environment.texture;

    return () => {
      scene.environment = null;
      environment.dispose();
      generator.dispose();
    };
  }, [scene, gl]);

  return (
    <>
      <color attach="background" args={["#161f2f"]} />
      <Suspense fallback={null}>
        <Morph />
      </Suspense>
    </>
  );
};
