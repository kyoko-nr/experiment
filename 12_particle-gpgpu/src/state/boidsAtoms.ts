import { atom } from "jotai";

/** boids パラメータの初期値 */
export const BOIDS_DEFAULTS = {
  count: 3000,
  area: 50,
  targetSpeed: 2,
  targetRadius: 7,
  sepRadius: 1.5,
  sepWeight: 0.005,
  alignRadius: 1,
  alignWeight: 0.05,
  cohRadius: 5,
  cohWeight: 0.01,
  centerRadius: 10,
  centerWeight: 0.001,
  predatorRadius: 7,
  predatorWeight: 5,
  maxSpeed: 6.0,
};

/** boid の数(変えると初期配置からやり直し) */
export const countAtom = atom(BOIDS_DEFAULTS.count);
/** 初期配置の範囲(変えると初期配置からやり直し) */
export const areaAtom = atom(BOIDS_DEFAULTS.area);

// target
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
