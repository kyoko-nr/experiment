import { useSetAtom } from "jotai";
import { Leva, useControls } from "leva";
import { useEffect } from "react";
import {
  MORPH_DEFAULTS as D,
  metalnessAtom,
  morphAtom,
  roughnessAtom,
} from "../state/morphAtoms";

export const LevaControls = () => {
  const setMetalness = useSetAtom(metalnessAtom);
  const setRoughness = useSetAtom(roughnessAtom);
  const setMorph = useSetAtom(morphAtom);

  const controls = useControls("Material", {
    metalness: { value: D.metalness, min: 0, max: 1, step: 0.01 },
    roughness: { value: D.roughness, min: 0, max: 1, step: 0.01 },
    morph: { value: D.morph, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    setMetalness(controls.metalness);
    setRoughness(controls.roughness);
    setMorph(controls.morph);
  }, [controls, setMetalness, setRoughness, setMorph]);

  return <Leva collapsed={false} />;
};
