import { useSetAtom } from "jotai";
import { Leva, useControls } from "leva";
import { useEffect } from "react";
import {
  MORPH_DEFAULTS as D,
  metalnessAtom,
  roughnessAtom,
} from "../state/morphAtoms";

export const LevaControls = () => {
  const setMetalness = useSetAtom(metalnessAtom);
  const setRoughness = useSetAtom(roughnessAtom);

  const controls = useControls("Material", {
    metalness: { value: D.metalness, min: 0, max: 1, step: 0.01 },
    roughness: { value: D.roughness, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    setMetalness(controls.metalness);
    setRoughness(controls.roughness);
  }, [controls, setMetalness, setRoughness]);

  return <Leva collapsed={false} />;
};
