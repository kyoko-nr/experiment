vec3 rotateX(vec3 position, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat3 rotateMat = mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
  return rotateMat * position;
}

vec3 rotateY(vec3 position, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat3 rotateMat = mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
  return rotateMat * position;
}

vec3 rotateZ(vec3 position, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat3 rotateMat = mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );
  return rotateMat * position;
}

vec3 rotateXYZ(vec3 position, vec3 angles) {
  vec3 rotated = rotateX(position, angles.x);
  rotated = rotateY(rotated, angles.y);
  return rotateZ(rotated, angles.z);
}
