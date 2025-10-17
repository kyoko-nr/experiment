vec3 helix(
  vec3 pos,
  float uHelixFrequency,
  float uHelixAmplitude,
  float uHelixRadius,
  float uHelixPitch
) {
  float twist = max(uHelixFrequency, 0.0001) * 0.85;
  float radius = max(uHelixRadius, 0.0001);
  float pitchAbs = max(abs(uHelixPitch), 0.0001);
  float pitch = uHelixPitch >= 0.0 ? pitchAbs : -pitchAbs;

  float theta = pos.x * twist;
  float cosTheta = cos(theta);
  float sinTheta = sin(theta);

  vec3 center = vec3(radius * cosTheta, radius * sinTheta, pos.x * pitch);
  vec3 radialDir = normalize(vec3(cosTheta, sinTheta, 0.0));
  vec3 tangent = normalize(vec3(-radius * sinTheta * twist, radius * cosTheta * twist, pitch));
  vec3 binormal = normalize(cross(tangent, radialDir));

  float crossScale = 1.0 + uHelixAmplitude * 0.1;
  vec3 offset = radialDir * pos.y * crossScale + binormal * pos.z * crossScale;
  return center + offset;
}

mat3 jacobianHelix(
  vec3 pos,
  vec3 pb,
  float e,
  float uHelixFrequency,
  float uHelixAmplitude,
  float uHelixRadius,
  float uHelixPitch
) {
  vec3 dx =
    (helix(pos + vec3(e, 0, 0), uHelixFrequency, uHelixAmplitude, uHelixRadius, uHelixPitch) - pb) /
    e;
  vec3 dy =
    (helix(pos + vec3(0, e, 0), uHelixFrequency, uHelixAmplitude, uHelixRadius, uHelixPitch) - pb) /
    e;
  vec3 dz =
    (helix(pos + vec3(0, 0, e), uHelixFrequency, uHelixAmplitude, uHelixRadius, uHelixPitch) - pb) /
    e;
  return mat3(dx, dy, dz);
}
