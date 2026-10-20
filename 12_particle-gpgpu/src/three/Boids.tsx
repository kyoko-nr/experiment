import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { randFloatSpread as rand } from "three/src/math/MathUtils.js";
import {
  Fn,
  instancedArray,
  instanceIndex,
  positionLocal,
  uniform,
  vec3,
} from "three/tsl";
import {
  ConeGeometry,
  type Mesh,
  MeshNormalNodeMaterial,
  SphereGeometry,
  Vector3,
  type WebGPURenderer,
} from "three/webgpu";

const COUNT = 50;
const AREA = 1;

const SPEED = 0.2;
const TARGET_SPEED = 3;
const TARGET_RADIUS = 1.5;

export const Boids = () => {
  const targetRef = useRef<Mesh>(null);

  const {
    boidGeom,
    boidMat,
    uDelta,
    computePos,
    targetGeom,
    targetMat,
    uTarget,
  } = useMemo(() => {
    // ------ Boids ------
    const positionArray = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // 位置
      positionArray[i * 3 + 0] = rand(AREA);
      positionArray[i * 3 + 1] = rand(AREA);
      positionArray[i * 3 + 2] = rand(AREA);
    }
    const positionBuffer = instancedArray(positionArray, "vec3");

    const boidGeom = new ConeGeometry(0.1, 0.2, 3);

    const boidMat = new MeshNormalNodeMaterial();
    boidMat.positionNode = positionLocal.add(
      positionBuffer.element(instanceIndex),
    );

    // 経過時間
    const uDelta = uniform(0);

    // ------ ターゲット ------
    const targetGeom = new SphereGeometry(0.2, 24, 24);
    const targetMat = new MeshNormalNodeMaterial();
    const uTarget = uniform(new Vector3());

    const computePos = Fn(() => {
      // ------ Boids ------
      // SEPARATION
      // normalize(self - target) * (1 / d)
      const selfPos = positionBuffer.element(instanceIndex);
      const d = selfPos.sub(vec3(uTarget.x, uTarget.y, uTarget.z));
      const dir = d.normalize();
      const dist = d.length();
      const sep = dir.div(dist);
      selfPos.addAssign(sep.mul(SPEED));
    })().compute(COUNT);

    return {
      boidGeom,
      boidMat,
      uDelta,
      computePos,
      targetGeom,
      targetMat,
      uTarget,
    };
  }, []);

  useFrame(({ gl, clock }, delta) => {
    uDelta.value = delta * 1;
    // ターゲットを動かす
    const t = clock.elapsedTime * TARGET_SPEED;
    const x = Math.cos(t) * TARGET_RADIUS;
    const y = Math.sin(t) * TARGET_RADIUS;
    targetRef.current?.position.set(x, y, 0);
    uTarget.value.set(x, y, 0);
    (gl as unknown as WebGPURenderer).compute(computePos);
  });

  return (
    <>
      <instancedMesh args={[boidGeom, boidMat, COUNT]} frustumCulled={false} />
      <mesh ref={targetRef} args={[targetGeom, targetMat]} />
    </>
  );
};
