/**
 * Geometry to particle position array
 * @param {*} geometry
 * @param {Number} particleCount
 */
export const geomToParticle = (geometry, particleCount) => {
  geometry.setIndex(null);

  const positions = new Float32Array(particleCount * 3);
  const geomCount = geometry.attributes.position.count;

  for (let i = 0; i < particleCount; i++) {
    if (i < geomCount) {
      positions[i * 3] = geometry.attributes.position.array[i * 3];
      positions[i * 3 + 1] = geometry.attributes.position.array[i * 3 + 1];
      positions[i * 3 + 2] = geometry.attributes.position.array[i * 3 + 2];
    } else {
      const ri = Math.floor(Math.random() * geomCount);
      positions[i * 3] = geometry.attributes.position.array[ri * 3];
      positions[i * 3 + 1] = geometry.attributes.position.array[ri * 3 + 1];
      positions[i * 3 + 2] = geometry.attributes.position.array[ri * 3 + 2];
    }
  }
  return positions;
};
