import { atom } from "jotai";

type Vec3 = [number, number, number];

/** cosine palette パラメータの初期値 */
export const PALETTE_DEFAULTS: { a: Vec3; b: Vec3; c: Vec3; d: Vec3 } = {
  a: [0.5, 0.5, 0.5],
  b: [0.5, 0.5, 0.5],
  c: [1, 1, 1],
  d: [0.0, 0.33, 0.67],
};

/** 明るさの中心 */
export const paletteAAtom = atom<Vec3>(PALETTE_DEFAULTS.a);
/** 振れ幅 */
export const paletteBAtom = atom<Vec3>(PALETTE_DEFAULTS.b);
/** t が 0→1 で何周するか */
export const paletteCAtom = atom<Vec3>(PALETTE_DEFAULTS.c);
/** チャンネルごとの波のずれ */
export const paletteDAtom = atom<Vec3>(PALETTE_DEFAULTS.d);
