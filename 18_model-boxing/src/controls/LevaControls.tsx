import { Leva, useControls } from "leva";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { boxDivision, wireframeAtom } from "../state/sceneAtoms";

export const LevaControls = () => {
  const setWireframe = useSetAtom(wireframeAtom);
  const setDivision = useSetAtom(boxDivision);

  const controls = useControls("Boxing model", {
    wireframe: false,
    division: { value: 5, min: 2, max: 100, step: 1 },
  });

  useEffect(() => {
    setWireframe(controls.wireframe);
    setDivision(controls.division);
  }, [controls, setWireframe, setDivision]);

  return <Leva collapsed={false} />;
};
