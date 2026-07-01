import { Leva, useControls } from "leva";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { boxDivision, shaderMixAtom, wireframeAtom } from "../state/sceneAtoms";

export const LevaControls = () => {
  const setShaderMix = useSetAtom(shaderMixAtom);
  const setWireframe = useSetAtom(wireframeAtom);
  const setDivision = useSetAtom(boxDivision);

  const controls = useControls("Boxing model", {
    shaderMix: { value: 0.45, min: 0, max: 1, step: 0.01 },
    wireframe: false,
    division: { value: 24, min: 2, max: 100, step: 1 },
  });

  useEffect(() => {
    setShaderMix(controls.shaderMix);
    setWireframe(controls.wireframe);
    setDivision(controls.division);
  }, [controls, setShaderMix, setWireframe, setDivision]);

  return <Leva collapsed={false} />;
};
