import { atom } from "jotai";

/** boids パラメータの初期値 */
export const BOIDS_DEFAULTS = {
  count: 1800,
  area: 50,
  targetVisible: true,
  targetSpeed: 0.5,
  targetRadius: 15,
  sepRadius: 1.5,
  sepWeight: 0.005,
  alignRadius: 1,
  alignWeight: 0.05,
  cohRadius: 7,
  cohWeight: 0.01,
  centerRadius: 1.5,
  centerWeight: 0.2,
  predatorRadius: 3,
  predatorWeight: 1,
  maxSpeed: 6.0,
};

/** boid の数(変えると初期配置からやり直し) */
export const countAtom = atom(BOIDS_DEFAULTS.count);
/** 初期配置の範囲(変えると初期配置からやり直し) */
export const areaAtom = atom(BOIDS_DEFAULTS.area);

// target
/** ターゲット(predator)の球を表示するか */
export const targetVisibleAtom = atom(BOIDS_DEFAULTS.targetVisible);
export const targetSpeedAtom = atom(BOIDS_DEFAULTS.targetSpeed);
export const targetRadiusAtom = atom(BOIDS_DEFAULTS.targetRadius);

// separation
export const sepRadiusAtom = atom(BOIDS_DEFAULTS.sepRadius);
export const sepWeightAtom = atom(BOIDS_DEFAULTS.sepWeight);
// alignment
export const alignRadiusAtom = atom(BOIDS_DEFAULTS.alignRadius);
export const alignWeightAtom = atom(BOIDS_DEFAULTS.alignWeight);
// cohesion
export const cohRadiusAtom = atom(BOIDS_DEFAULTS.cohRadius);
export const cohWeightAtom = atom(BOIDS_DEFAULTS.cohWeight);
// center
export const centerRadiusAtom = atom(BOIDS_DEFAULTS.centerRadius);
export const centerWeightAtom = atom(BOIDS_DEFAULTS.centerWeight);
// predator
export const predatorRadiusAtom = atom(BOIDS_DEFAULTS.predatorRadius);
export const predatorWeightAtom = atom(BOIDS_DEFAULTS.predatorWeight);

export const maxSpeedAtom = atom(BOIDS_DEFAULTS.maxSpeed);
