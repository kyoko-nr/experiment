import { useSetAtom } from "jotai";
import { Leva, useControls } from "leva";
import { useEffect } from "react";
import {
  PALETTE_DEFAULTS as D,
  paletteAAtom,
  paletteBAtom,
  paletteCAtom,
  paletteDAtom,
} from "../state/paletteAtoms";

export const LevaControls = () => {
  const setA = useSetAtom(paletteAAtom);
  const setB = useSetAtom(paletteBAtom);
  const setC = useSetAtom(paletteCAtom);
  const setD = useSetAtom(paletteDAtom);

  const controls = useControls("Palette", {
    a: { value: D.a, step: 0.01 },
    b: { value: D.b, step: 0.01 },
    c: { value: D.c, step: 0.01 },
    d: { value: D.d, step: 0.01 },
  });

  useEffect(() => {
    setA(controls.a);
    setB(controls.b);
    setC(controls.c);
    setD(controls.d);
  }, [controls, setA, setB, setC, setD]);

  return <Leva collapsed={false} />;
};
