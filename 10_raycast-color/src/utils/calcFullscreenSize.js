/**
 * Calculate the fulscreen size from a camera
 * @param {THREE.Camera} camera 
 * @returns 
 */
export const currentFullscreen = (camera) => {
  const rAngle = camera.fov * Math.PI / 180;
    const fovY = camera.position.z * Math.tan(rAngle * 0.5) * 2;
  return {width: fovY * camera.aspect, height: fovY};
}
