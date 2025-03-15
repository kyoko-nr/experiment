const size = {
  width: 0,
  height: 0,
  dpr: 0,
}

/**
 * Get window size and device pixel ratio
 */
export const getSize = () => {
  return size;
}

/**
 * Update size on resize
 */
export const updateSizeOnResize = () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  size.dpr = Math.min(window.devicePixelRatio, 2);
}
