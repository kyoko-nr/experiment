import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { randFloatSpread as rand } from "three/src/math/MathUtils.js";
import {
  Continue,
  Fn,
  float,
  If,
  instancedArray,
  instanceIndex,
  Loop,
  positionLocal,
  uint,
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

const COUNT = 300;
const AREA = 10;

const TARGET_SPEED = 2;
const TARGET_RADIUS = 5;

// separation
const SEP_RADIUS = 2;
const SEP_WEIGHT = 0.4;
// align
const ALIGN_RADIUS = 6;
const ALIGN_WEIGHT = 0.5;
// predetor
const PREDETOR_RADIUS = 6;
const PREDETOR_WEIGHT = 0.1;

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
    const velocityArray = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // 位置
      positionArray[i * 3 + 0] = rand(AREA);
      positionArray[i * 3 + 1] = rand(AREA);
      positionArray[i * 3 + 2] = rand(AREA);
      // 速度
      velocityArray[i * 3 + 0] = rand(5);
      velocityArray[i * 3 + 1] = rand(5);
      velocityArray[i * 3 + 2] = rand(5);
    }
    const positionBuffer = instancedArray(positionArray, "vec3");
    const velocityBuffer = instancedArray(velocityArray, "vec3");

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
      const selfPos = positionBuffer.element(instanceIndex);
      const selfVel = velocityBuffer.element(instanceIndex);
      const sepSum = vec3(0).toVar();
      const velSum = vec3(0).toVar();
      const velCount = float(0).toVar();

      Loop({ start: uint(0), end: uint(COUNT), type: "uint" }, ({ i }) => {
        If(i.equal(instanceIndex), () => {
          // 自分の場合はスキップ
          Continue();
        });
        // SEPARATION
        // vel += normalize(self - others) * (1 / d)
        const otherPos = positionBuffer.element(i);
        const vector = selfPos.sub(otherPos);
        const dist = vector.length();
        If(dist.lessThan(SEP_RADIUS).and(dist.greaterThan(0.0001)), () => {
          // 近くの仲間から離れる
          sepSum.addAssign(vector.normalize().div(dist));
        });

        // ALIGNMENT
        // vel += (avg(others.vel) - self.vel) * dt
        If(dist.lessThan(ALIGN_RADIUS), () => {
          // 近くの仲間と向きを合わせる
          velSum.addAssign(velocityBuffer.element(i));
          velCount.addAssign(1);
        });
      });

      // separation
      selfVel.addAssign(sepSum.mul(SEP_WEIGHT));
      // alignment
      If(velCount.greaterThan(0), () => {
        // 向きを合わせる仲間がいるなら計算する
        const avg = velSum.div(velCount);
        const ali = avg.sub(selfVel);
        selfVel.addAssign(ali.mul(ALIGN_WEIGHT));
      });
      // PREDETOR
      const predVec = selfPos.sub(uTarget);
      const predDist = predVec.length();
      If(
        predDist.lessThan(PREDETOR_RADIUS).and(predDist.greaterThan(0.0001)),
        () => {
          selfVel.addAssign(
            predVec.normalize().div(predDist).mul(PREDETOR_WEIGHT),
          );
        },
      );
      // 速度に経過時間を追加して自分の位置に足す
      selfPos.addAssign(selfVel.mul(uDelta));
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
    const z = (Math.cos(t) + Math.sin(t)) * TARGET_RADIUS;
    targetRef.current?.position.set(x, y, z);
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
