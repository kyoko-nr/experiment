import { Leva, useControls } from "leva";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  boxRotationSpeedAtom,
  boxScaleAtom,
  shaderMixAtom,
  wireframeAtom,
} from "../state/sceneAtoms";

export const LevaControls = () => {
  const setRotationSpeed = useSetAtom(boxRotationSpeedAtom);
  const setScale = useSetAtom(boxScaleAtom);
  const setShaderMix = useSetAtom(shaderMixAtom);
  const setWireframe = useSetAtom(wireframeAtom);

  const controls = useControls("Boxing model", {
    rotationSpeed: { value: 0.35, min: 0, max: 2, step: 0.01 },
    scale: { value: 1, min: 0.4, max: 1.8, step: 0.01 },
    shaderMix: { value: 0.45, min: 0, max: 1, step: 0.01 },
    wireframe: false,
  });

  useEffect(() => {
    setRotationSpeed(controls.rotationSpeed);
    setScale(controls.scale);
    setShaderMix(controls.shaderMix);
    setWireframe(controls.wireframe);
  }, [
    controls.rotationSpeed,
    controls.scale,
    controls.shaderMix,
    controls.wireframe,
    setRotationSpeed,
    setScale,
    setShaderMix,
    setWireframe,
  ]);

  return <Leva collapsed={false} />;
};
