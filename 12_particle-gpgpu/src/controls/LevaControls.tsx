import { useSetAtom } from "jotai";
import { folder, Leva, useControls } from "leva";
import { useEffect } from "react";
import {
  alignRadiusAtom,
  alignWeightAtom,
  areaAtom,
  centerRadiusAtom,
  centerWeightAtom,
  cohRadiusAtom,
  cohWeightAtom,
  countAtom,
  BOIDS_DEFAULTS as D,
  maxSpeedAtom,
  mouseRadiusAtom,
  mouseWeightAtom,
  predatorRadiusAtom,
  predatorWeightAtom,
  sepRadiusAtom,
  sepWeightAtom,
  targetRadiusAtom,
  targetSpeedAtom,
  targetVisibleAtom,
} from "../state/boidsAtoms";

export const LevaControls = () => {
  const setCount = useSetAtom(countAtom);
  const setArea = useSetAtom(areaAtom);
  const setTargetVisible = useSetAtom(targetVisibleAtom);
  const setTargetSpeed = useSetAtom(targetSpeedAtom);
  const setTargetRadius = useSetAtom(targetRadiusAtom);
  const setSepRadius = useSetAtom(sepRadiusAtom);
  const setSepWeight = useSetAtom(sepWeightAtom);
  const setAlignRadius = useSetAtom(alignRadiusAtom);
  const setAlignWeight = useSetAtom(alignWeightAtom);
  const setCohRadius = useSetAtom(cohRadiusAtom);
  const setCohWeight = useSetAtom(cohWeightAtom);
  const setCenterRadius = useSetAtom(centerRadiusAtom);
  const setCenterWeight = useSetAtom(centerWeightAtom);
  const setPredatorRadius = useSetAtom(predatorRadiusAtom);
  const setPredatorWeight = useSetAtom(predatorWeightAtom);
  const setMouseRadius = useSetAtom(mouseRadiusAtom);
  const setMouseWeight = useSetAtom(mouseWeightAtom);
  const setMaxSpeed = useSetAtom(maxSpeedAtom);

  const controls = useControls("Boids", {
    count: { value: D.count, min: 10, max: 5000, step: 10 },
    area: { value: D.area, min: 1, max: 100, step: 1 },
    maxSpeed: { value: D.maxSpeed, min: 0, max: 10, step: 0.01 },
    Target: folder({
      targetVisible: { label: "visible", value: D.targetVisible },
      targetSpeed: {
        label: "speed",
        value: D.targetSpeed,
        min: 0,
        max: 10,
        step: 0.1,
      },
      targetRadius: {
        label: "radius",
        value: D.targetRadius,
        min: 0,
        max: 20,
        step: 0.1,
      },
    }),
    Separation: folder({
      sepRadius: {
        label: "radius",
        value: D.sepRadius,
        min: 0,
        max: 10,
        step: 0.1,
      },
      sepWeight: {
        label: "weight",
        value: D.sepWeight,
        min: 0,
        max: 0.5,
        step: 0.001,
      },
    }),
    Alignment: folder({
      alignRadius: {
        label: "radius",
        value: D.alignRadius,
        min: 0,
        max: 10,
        step: 0.1,
      },
      alignWeight: {
        label: "weight",
        value: D.alignWeight,
        min: 0,
        max: 1,
        step: 0.001,
      },
    }),
    Cohesion: folder({
      cohRadius: {
        label: "radius",
        value: D.cohRadius,
        min: 0,
        max: 20,
        step: 0.1,
      },
      cohWeight: {
        label: "weight",
        value: D.cohWeight,
        min: 0,
        max: 0.1,
        step: 0.001,
      },
    }),
    Center: folder({
      centerRadius: {
        label: "radius",
        value: D.centerRadius,
        min: 0,
        max: 50,
        step: 0.5,
      },
      centerWeight: {
        label: "weight",
        value: D.centerWeight,
        min: 0,
        max: 0.01,
        step: 0.0001,
      },
    }),
    Predator: folder({
      predatorRadius: {
        label: "radius",
        value: D.predatorRadius,
        min: 0,
        max: 20,
        step: 0.1,
      },
      predatorWeight: {
        label: "weight",
        value: D.predatorWeight,
        min: 0,
        max: 10,
        step: 0.1,
      },
    }),
    Mouse: folder({
      mouseRadius: {
        label: "radius",
        value: D.mouseRadius,
        min: 0,
        max: 20,
        step: 0.1,
      },
      mouseWeight: {
        label: "weight",
        value: D.mouseWeight,
        min: 0,
        max: 10,
        step: 0.1,
      },
    }),
  });

  useEffect(() => {
    setCount(controls.count);
    setArea(controls.area);
    setTargetVisible(controls.targetVisible);
    setTargetSpeed(controls.targetSpeed);
    setTargetRadius(controls.targetRadius);
    setSepRadius(controls.sepRadius);
    setSepWeight(controls.sepWeight);
    setAlignRadius(controls.alignRadius);
    setAlignWeight(controls.alignWeight);
    setCohRadius(controls.cohRadius);
    setCohWeight(controls.cohWeight);
    setCenterRadius(controls.centerRadius);
    setCenterWeight(controls.centerWeight);
    setPredatorRadius(controls.predatorRadius);
    setPredatorWeight(controls.predatorWeight);
    setMouseRadius(controls.mouseRadius);
    setMouseWeight(controls.mouseWeight);
    setMaxSpeed(controls.maxSpeed);
  }, [
    controls,
    setCount,
    setArea,
    setTargetVisible,
    setTargetSpeed,
    setTargetRadius,
    setSepRadius,
    setSepWeight,
    setAlignRadius,
    setAlignWeight,
    setCohRadius,
    setCohWeight,
    setCenterRadius,
    setCenterWeight,
    setPredatorRadius,
    setPredatorWeight,
    setMouseRadius,
    setMouseWeight,
    setMaxSpeed,
  ]);

  return <Leva collapsed={false} />;
};
