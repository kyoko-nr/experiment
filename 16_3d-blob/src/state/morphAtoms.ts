import { atom } from "jotai";

/** マテリアルパラメータの初期値 */
export const MORPH_DEFAULTS = {
  metalness: 1,
  roughness: 0,
  morph: 0.5,
};

/** 金属度(0: 非金属、1: 金属) */
export const metalnessAtom = atom(MORPH_DEFAULTS.metalness);
/** 表面の粗さ(0: 鏡面、1: ぼやけた反射) */
export const roughnessAtom = atom(MORPH_DEFAULTS.roughness);
/** モーフィング */
export const morphAtom = atom(MORPH_DEFAULTS.morph);
