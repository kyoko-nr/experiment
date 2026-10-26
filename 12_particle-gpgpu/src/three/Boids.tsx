import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef } from "react";
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
import {
  alignRadiusAtom,
  alignWeightAtom,
  areaAtom,
  centerRadiusAtom,
  centerWeightAtom,
  cohRadiusAtom,
  cohWeightAtom,
  countAtom,
  maxSpeedAtom,
  predatorRadiusAtom,
  predatorWeightAtom,
  sepRadiusAtom,
  sepWeightAtom,
  targetRadiusAtom,
  targetSpeedAtom,
} from "../state/boidsAtoms";

export const Boids = () => {
  const targetRef = useRef<Mesh>(null);

  // バッファを作り直す必要があるもの
  const count = useAtomValue(countAtom);
  const area = useAtomValue(areaAtom);
  // JS 側(useFrame)で使うもの
  const targetSpeed = useAtomValue(targetSpeedAtom);
  const targetRadius = useAtomValue(targetRadiusAtom);
  // uniform で GPU に渡すもの
  const sepRadius = useAtomValue(sepRadiusAtom);
  const sepWeight = useAtomValue(sepWeightAtom);
  const alignRadius = useAtomValue(alignRadiusAtom);
  const alignWeight = useAtomValue(alignWeightAtom);
  const cohRadius = useAtomValue(cohRadiusAtom);
  const cohWeight = useAtomValue(cohWeightAtom);
  const centerRadius = useAtomValue(centerRadiusAtom);
  const centerWeight = useAtomValue(centerWeightAtom);
  const predatorRadius = useAtomValue(predatorRadiusAtom);
  const predatorWeight = useAtomValue(predatorWeightAtom);
  const maxSpeed = useAtomValue(maxSpeedAtom);

  // uniform は一度だけ作り、値だけを書き換える
  const uniforms = useMemo(
    () => ({
      // 経過時間
      uDelta: uniform(0),
      uTarget: uniform(new Vector3()),
      uSepRadius: uniform(0),
      uSepWeight: uniform(0),
      uAlignRadius: uniform(0),
      uAlignWeight: uniform(0),
      uCohRadius: uniform(0),
      uCohWeight: uniform(0),
      uCenterRadius: uniform(0),
      uCenterWeight: uniform(0),
      uPredatorRadius: uniform(0),
      uPredatorWeight: uniform(0),
      uMaxSpeed: uniform(0),
    }),
    [],
  );

  useEffect(() => {
    uniforms.uSepRadius.value = sepRadius;
    uniforms.uSepWeight.value = sepWeight;
    uniforms.uAlignRadius.value = alignRadius;
    uniforms.uAlignWeight.value = alignWeight;
    uniforms.uCohRadius.value = cohRadius;
    uniforms.uCohWeight.value = cohWeight;
    uniforms.uCenterRadius.value = centerRadius;
    uniforms.uCenterWeight.value = centerWeight;
    uniforms.uPredatorRadius.value = predatorRadius;
    uniforms.uPredatorWeight.value = predatorWeight;
    uniforms.uMaxSpeed.value = maxSpeed;
  }, [
    uniforms,
    sepRadius,
    sepWeight,
    alignRadius,
    alignWeight,
    cohRadius,
    cohWeight,
    centerRadius,
    centerWeight,
    predatorRadius,
    predatorWeight,
    maxSpeed,
  ]);

  // ------ ターゲット ------
  const { targetGeom, targetMat } = useMemo(
    () => ({
      targetGeom: new SphereGeometry(0.2, 24, 24),
      targetMat: new MeshNormalNodeMaterial(),
    }),
    [],
  );

  // ------ Boids ------
  // count / area が変わったらバッファから作り直す
  const { boidGeom, boidMat, computePos } = useMemo(() => {
    const {
      uDelta,
      uTarget,
      uSepRadius,
      uSepWeight,
      uAlignRadius,
      uAlignWeight,
      uCohRadius,
      uCohWeight,
      uCenterRadius,
      uCenterWeight,
      uPredatorRadius,
      uPredatorWeight,
      uMaxSpeed,
    } = uniforms;

    const positionArray = new Float32Array(count * 3);
    const velocityArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // 位置
      positionArray[i * 3 + 0] = rand(area);
      positionArray[i * 3 + 1] = rand(area);
      positionArray[i * 3 + 2] = rand(area);
      // 速度
      velocityArray[i * 3 + 0] = rand(2);
      velocityArray[i * 3 + 1] = rand(2);
      velocityArray[i * 3 + 2] = rand(2);
    }
    const positionBuffer = instancedArray(positionArray, "vec3");
    const velocityBuffer = instancedArray(velocityArray, "vec3");

    const boidGeom = new ConeGeometry(0.1, 0.2, 3);

    const boidMat = new MeshNormalNodeMaterial();
    boidMat.positionNode = positionLocal.add(
      positionBuffer.element(instanceIndex),
    );

    const computePos = Fn(() => {
      // ------ Boids ------
      const selfPos = positionBuffer.element(instanceIndex);
      const selfVel = velocityBuffer.element(instanceIndex);
      const sepSum = vec3(0).toVar();
      const velSum = vec3(0).toVar();
      const velCount = float(0).toVar();
      const cohSum = vec3(0).toVar();
      const cohCount = float(0).toVar();

      Loop({ start: uint(0), end: uint(count), type: "uint" }, ({ i }) => {
        If(i.equal(instanceIndex), () => {
          // 自分の場合はスキップ
          Continue();
        });
        // SEPARATION
        // vel += normalize(self - others) * (1 / d)
        const otherPos = positionBuffer.element(i);
        const vector = selfPos.sub(otherPos);
        const dist = vector.length();
        If(dist.lessThan(uSepRadius).and(dist.greaterThan(0.0001)), () => {
          // 近くの仲間から離れる
          sepSum.addAssign(vector.normalize().div(dist));
        });

        // ALIGNMENT
        // vel += (avg(others.vel) - self.vel) * weight
        If(dist.lessThan(uAlignRadius), () => {
          // 近くの仲間と向きを合わせる
          velSum.addAssign(velocityBuffer.element(i));
          velCount.addAssign(1);
        });

        // COHESION
        // vel += (avg(others.pos) - self.pos) * weight
        If(dist.lessThan(uCohRadius), () => {
          // 仲間の中心に集まる
          cohSum.addAssign(otherPos);
          cohCount.addAssign(1);
        });
      });

      // separation
      selfVel.addAssign(sepSum.mul(uSepWeight));
      // alignment
      If(velCount.greaterThan(0), () => {
        // 向きを合わせる仲間がいるなら計算する
        const avg = velSum.div(velCount);
        const ali = avg.sub(selfVel);
        selfVel.addAssign(ali.mul(uAlignWeight));
      });
      // cohesion
      If(cohCount.greaterThan(0), () => {
        const center = cohSum.div(cohCount);
        const coh = center.sub(selfPos);
        selfVel.addAssign(coh.mul(uCohWeight));
      });
      // 外側に行き過ぎたら真ん中に戻る
      const toCenter = vec3(0).sub(selfPos);
      If(toCenter.length().greaterThan(uCenterRadius), () => {
        selfVel.addAssign(toCenter.mul(uCenterWeight));
      });
      // PREDATOR
      const predVec = selfPos.sub(uTarget);
      const predDist = predVec.length();
      If(
        predDist.lessThan(uPredatorRadius).and(predDist.greaterThan(0.0001)),
        () => {
          selfVel.addAssign(
            predVec.normalize().div(predDist).mul(uPredatorWeight),
          );
        },
      );
      // 速度に経過時間を追加して自分の位置に足す
      const speed = selfVel.length();
      If(speed.greaterThan(uMaxSpeed), () => {
        selfVel.assign(selfVel.normalize().mul(uMaxSpeed));
      });
      selfPos.addAssign(selfVel.mul(uDelta));
    })().compute(count);

    return { boidGeom, boidMat, computePos };
  }, [uniforms, count, area]);

  // 作り直したときに古いものを破棄する
  useEffect(() => {
    return () => {
      boidGeom.dispose();
      boidMat.dispose();
      computePos.dispose();
    };
  }, [boidGeom, boidMat, computePos]);

  useEffect(() => {
    return () => {
      targetGeom.dispose();
      targetMat.dispose();
    };
  }, [targetGeom, targetMat]);

  useFrame(({ gl, clock }, delta) => {
    uniforms.uDelta.value = delta * 1;
    // ターゲットを動かす
    const t = clock.elapsedTime * targetSpeed;
    const x = Math.cos(t * 0.5) * targetRadius;
    const y = Math.sin(t) * targetRadius;
    const z = (Math.cos(t * 0.2) + Math.sin(t)) * targetRadius * 0.3;
    targetRef.current?.position.set(x, y, z);
    uniforms.uTarget.value.set(x, y, z);
    (gl as unknown as WebGPURenderer).compute(computePos);
  });

  return (
    <>
      <instancedMesh args={[boidGeom, boidMat, count]} frustumCulled={false} />
      <mesh ref={targetRef} args={[targetGeom, targetMat]} />
    </>
  );
};
