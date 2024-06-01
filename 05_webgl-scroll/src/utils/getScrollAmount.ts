import { lerp } from "./easing";

/** the multiplier of lerp function */
const MULTIPLIER = 0.1;

let targetY = 0;
let currentY = 0;

/**
 * get current scroll amount which is lerped
 */
export const getScrollAmount = () => {
  targetY = document.documentElement.scrollTop;
  currentY = lerp(currentY, targetY, MULTIPLIER);
  return targetY - currentY;
};
