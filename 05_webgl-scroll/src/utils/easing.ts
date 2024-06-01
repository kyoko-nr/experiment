/**
 * lerp
 * @param start start point
 * @param end end point
 * @param multiplier amount of ease
 */
export const lerp = (start: number, end: number, multiplier: number) => {
  return (1 - multiplier) * start + multiplier * end;
};
