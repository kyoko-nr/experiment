const SIZE = {
  width: 0,
  height: 0,
  dpr: 0,
};

export const getSize = () => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;
  SIZE.dpr = Math.min(window.devicePixelRatio, 2);
  return SIZE;
};