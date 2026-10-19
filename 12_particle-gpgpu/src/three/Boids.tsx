import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { randFloatSpread as rand } from "three/src/math/MathUtils.js";
import {
  Fn,
  instancedArray,
  instanceIndex,
  positionLocal,
  rotate,
  uniform,
  vec3,
} from "three/tsl";
import {
  ConeGeometry,
  MeshNormalNodeMaterial,
  type WebGPURenderer,
} from "three/webgpu";

const COUNT = 50;
const AREA = 10;

const SPEED = 0.4;

export const Boids = () => {
  const { geometry, material, uDelta, computePos } = useMemo(() => {
    const positionArray = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positionArray[i * 3 + 0] = rand(AREA);
      positionArray[i * 3 + 1] = rand(AREA);
      positionArray[i * 3 + 2] = rand(AREA);
    }
    const positionBuffer = instancedArray(positionArray, "vec3");

    const geometry = new ConeGeometry(0.2, 0.3, 3);

    const material = new MeshNormalNodeMaterial();
    material.positionNode = positionLocal.add(
      positionBuffer.element(instanceIndex),
    );

    // 経過時間
    const uDelta = uniform(0);

    const computePos = Fn(() => {
      const position = positionBuffer.element(instanceIndex);
      position.assign(rotate(position, vec3(0, uDelta.mul(SPEED), 0)));
    })().compute(COUNT);

    return { geometry, material, uDelta, computePos };
  }, []);

  useFrame(({ gl }, delta) => {
    uDelta.value = delta * 1;
    (gl as unknown as WebGPURenderer).compute(computePos);
  });

  return (
    <instancedMesh args={[geometry, material, COUNT]} frustumCulled={false} />
  );
};
