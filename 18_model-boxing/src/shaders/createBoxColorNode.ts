import { color, mix, normalWorld } from "three/tsl";

export const createBoxColorNode = (blend: number) => {
  const cool = color("#24d3ee");
  const warm = color("#ffb84d");
  const normalTint = normalWorld.mul(0.5).add(0.5);

  return mix(mix(cool, warm, blend), normalTint, 0.35);
};
