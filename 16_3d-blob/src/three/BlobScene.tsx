import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { HDRLoader } from "three/examples/jsm/Addons.js";
import { EquirectangularReflectionMapping, WebGPURenderer } from "three/webgpu";
import hdrSrc from "../assets/env.hdr?url";
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
  const { scene } = useThree();
  const hdr = useLoader(HDRLoader, hdrSrc);
  hdr.mapping = EquirectangularReflectionMapping;
  useEffect(() => {
    scene.environment = hdr;
    scene.background = hdr;

    return () => {
      scene.environment = null;
      scene.background = null;
    };
  }, [scene, hdr]);

  return (
    <>
      <color attach="background" args={["#161f2f"]} />
      <Suspense fallback={null}>
        <Morph />
      </Suspense>
    </>
  );
};
