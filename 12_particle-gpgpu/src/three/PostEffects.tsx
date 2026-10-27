import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { pass } from "three/tsl";
import { RenderPipeline, type WebGPURenderer } from "three/webgpu";

export const PostEffects = () => {
  const { gl, scene, camera } = useThree();

  const pipeline = useMemo(() => {
    const p = new RenderPipeline(gl as unknown as WebGPURenderer);
    const scenePass = pass(scene, camera);
    const sceneColor = scenePass.getTextureNode();
    // bloom
    const bloomPass = bloom(sceneColor, 1, 0.5, 0.2);
    p.outputNode = sceneColor.add(bloomPass);
    return p;
  }, [gl, scene, camera]);

  useEffect(() => {
    return () => pipeline.dispose();
  }, [pipeline]);

  useFrame(() => {
    pipeline.render();
  }, 1);

  return null;
};
