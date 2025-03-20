/**
 * Geometry to particle position array
 * @param {*} geometry
 */
export const geomToParticle = (geometry) => {
  geometry.setIndex(null);

  const particleCount = geometry.attributes.position.array.length / 3;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = geometry.attributes.position.array[i * 3];
    positions[i * 3 + 1] = geometry.attributes.position.array[i * 3 + 1];
    positions[i * 3 + 2] = geometry.attributes.position.array[i * 3 + 2];
  }
  return positions;
};
